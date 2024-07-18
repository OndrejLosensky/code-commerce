import { Button } from "@/components/ui/button"
import db from "@/db/db"
import { formatCurrency } from "@/lib/formatters"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export default async function SuccessfullPurchasePage({ searchParams } : {searchParams: {payment_intent: string}}) {
    const paymentIntent = await stripe.paymentIntents.retrieve(searchParams.payment_intent)
    
    if (paymentIntent.metadata.productId == null) {
        return notFound()
    }

    const product = await db.produkt.findUnique({ where: { id: paymentIntent.metadata.productId}})

    if (product== null) {
        return notFound()
    }

    const isSuccessfull = paymentIntent.status === "succeeded"

    return (
        <div className="w-full mx-auto max-w-5xl space-y-8">
                <h1 className="text-3xl font-bold">
                    {isSuccessfull ? "Platba proběhla úspěšně": "Vyskytla se chyba!"}
                </h1>
                <div className="flex gap-4 items-center">
                    <div className="aspect-video flex shrink-0 w-1/3 relative">
                        <Image src={product.imagePath} fill alt={product.name} className="object-cover"/>
                    </div>
                    <div>
                        <div className="text-lg">
                            {formatCurrency(product.price)}
                        </div>
                        <h1 className="text-2xl font-semibold">{product.name}</h1>
                        <div className="line-clamp-3 text-gray-900/60"> {product.description} </div>
                    </div>
                    
                </div>
                <Button asChild className="mt-4" size="lg"> 
                        {isSuccessfull ? (
                            <Link href="/objednavky">Otevřít</Link>
                        ) : (
                            <Link href={`/produkty/${product.id}/koupit`}> Zkusit znovu </Link>
                        )}
                </Button>                                      
            </div>
    )
}

/*
async function createDownloadVer ( produktId: string){
    return ( 
        await db.downloadControl.create({
            data: { 
                produktId, 
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
            },
         })
    ).id
}
*/