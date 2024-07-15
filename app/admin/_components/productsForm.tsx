"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { formatCurrency } from "@/lib/formatters"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import { AddProduct, updateProduct } from "../_actions/products"
import { useFormState,useFormStatus } from "react-dom"

import { Produkt } from "@prisma/client"

import Image from "next/image"

export function ProductsForm({product}: { product?: Produkt | null}) {
    const [error, action ] = useFormState(product == null ? AddProduct : updateProduct.bind(null, product.id), {})
    const [priceInCents, setPriceInCents] = useState<number | undefined>(product?.price)

    return (
        <form action={action} className="space-y-8">
            <div className="space-y-2">
                <Label htmlFor="name">Název</Label>
                <Input type="text" id="name" name="name" required defaultValue={product?.name || ""} />
                {error.name && <div className="text-destructive">{error.name} </div>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="price">Cena</Label>
                <Input
                    type="number"
                    id="priceInCents"
                    name="priceInCents" // Ensure name attribute matches server-side key

                    value={priceInCents}
                    onChange={e => setPriceInCents(Number(e.target.value))}
                />
                {error.priceInCents && <div className="text-destructive">{error.priceInCents} </div>}
            </div>
            <div className="text-muted-foreground">
                {formatCurrency((priceInCents || 0))}
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Popisek</Label>
                <Textarea id="description" name="description" defaultValue={product?.description || ""} />
                {error.description && <div className="text-destructive">{error.description} </div>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="file">Soubor</Label>
                <Input type="file" id="file" name="file" required={product == null} />
                {product != null && (
                    <div className="text-muted-foreground">{product.filePath}</div>
                )}
                {error.file && <div className="text-destructive">{error.file} </div>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="image">Náhledový obrázek</Label>
                <Input type="file" id="image" name="image" required={product == null} />
                {product != null && (
                    <Image src={product.imagePath} height={512} width={512} alt="Product image"/>
                )}
                {error.image && <div className="text-destructive">{error.image} </div>}
            </div>
            <SaveButton/>
        </form>
    )
}

function SaveButton () {
    const { pending } = useFormStatus()

    return <Button type="submit" disabled={pending}> {pending ? "Ukládám..." : "Uložit"} </Button>
}