"use client"

import { userOrderExists } from "@/app/actions/orders"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/formatters"
import { Elements, LinkAuthenticationElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import Image from "next/image"
import { FormEvent, useState } from "react"

type CheckoutFormProps = {
    product: {
        id: string
        imagePath: string
        name: string 
        price: number
        description: string
    }
    clientSecret: string
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string)

export function CheckoutForm ({product, clientSecret} : CheckoutFormProps) {
    return (
        <>
            <div className="w-full mx-auto max-w-5xl space-y-8">
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
                <Elements options={{clientSecret}} stripe={stripePromise} >
                        <Form price={product.price} productId={product.id}/>
                </Elements>                            
            </div>
        </>
    )
}

function Form({price, productId}:{price: number, productId: string}) {
    const stripe = useStripe()
    const elements = useElements()
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string>()
    const [email, setEmail] = useState<string>()

    async function handlePaymentSubmit( e: FormEvent ) {
        e.preventDefault()

        if (stripe == null || elements == null || email == null) return
        setIsLoading(true)

        // checking for existing order
        const orderExits =  await userOrderExists(email, productId)
        if (orderExits) {
            setErrorMessage("Už jsi si koupil tento produkt, stáhni ho ze sekce Moje objednávky ")
            setIsLoading(false)
            return
        }

        stripe.confirmPayment({elements, confirmParams:{
            return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/purchase-success`
        }}).then(({ error }) => {
            if (error.type === "card_error" || error.type === "validation_error"){
                setErrorMessage(error.message)
                
            } else {
                setErrorMessage("Vyskytla se neznámá chyba")
                
            }
        }).finally(() => setIsLoading(false))
    }

    return (
        <form onSubmit={handlePaymentSubmit}>
            <Card>
                <CardHeader>
                    <CardTitle> Platba </CardTitle>
                    {errorMessage &&  <CardDescription className="text-destructive"> {errorMessage} </CardDescription>}
                </CardHeader>
                <CardContent>
                    <PaymentElement />
                    <div className="mt-6">
                        <LinkAuthenticationElement onChange={e => setEmail(e.value.email)}/>
                    </div>                    
                </CardContent>
                <CardFooter>
                    <Button className="w-full" size="lg" disabled={stripe == null || elements == null  || isLoading}> {isLoading ? "Objednávám" : `Koupit - ${formatCurrency(price)}`} </Button>
                </CardFooter>
            </Card>
        </form>
    )
    
    
}