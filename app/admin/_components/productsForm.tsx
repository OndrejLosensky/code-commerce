"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { formatCurrency } from "@/lib/formatters"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import { AddProduct } from "../_actions/products"
import { useFormState,useFormStatus } from "react-dom"

export function ProductsForm() {
    const [error, action ] = useFormState(AddProduct, {})
    const [priceInCents, setPriceInCents] = useState<number>(0)

    return (
        <form action={action} className="space-y-8">
            <div className="space-y-2">
                <Label htmlFor="name">Název</Label>
                <Input type="text" id="name" name="name" required />
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
                <Textarea id="description" name="description" />
                {error.description && <div className="text-destructive">{error.description} </div>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="file">Soubor</Label>
                <Input type="file" id="file" name="file" required />
                {error.file && <div className="text-destructive">{error.file} </div>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="image">Náhledový obrázek</Label>
                <Input type="file" id="image" name="image" required />
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