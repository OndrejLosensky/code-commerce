import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const resend = new Resend(process.env.RESEND_API_KEY as string)

export async function POST(req: NextRequest) {
        const body = await req.text();
        const signature = req.headers.get("stripe-signature");

        if (!signature) {
            return new NextResponse("Missing Stripe signature", { status: 400 });
        }

        const event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET as string
        );

        if (event.type === "charge.succeeded") {
            const charge = event.data.object as Stripe.Charge;
            const productId = charge.metadata.productId;
            const email = charge.billing_details.email;
            const price = charge.amount;

            if (!productId || !email) {
                return new NextResponse("Bad Request: Missing product ID or email", { status: 400 });
            }

            const product = await db.produkt.findUnique({ where: { id: productId } });

            if (!product) {
                return new NextResponse("Product not found", { status: 404 });
            }

            const user = await db.uzivatel.upsert({
                where: { email },
                create: {
                    email,
                    orders: {
                        create: {
                            pricePaid: price,
                            produktId: productId,
                        },
                    },
                },
                update: {
                    orders: {
                        create: {
                            pricePaid: price,
                            produktId: productId,
                        },
                    },
                },
                select: {
                    orders: {
                        orderBy: { createdAt: "desc" },
                        take: 1,
                    },
                },
            });
            
            /*
            const downloadVerification = await db.downloadControl.create({
                data: {
                    produktId,
                    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
                },
            })
            */
            

            await resend.emails.send({
                from: `Support ${process.env.SENDER_EMAIL}`,
                to: email,
                subject: "Potrzení o objednávce",
                react: <h1> Does this work? </h1>
            })

            return new NextResponse(JSON.stringify(user.orders[0]), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new NextResponse();
}
