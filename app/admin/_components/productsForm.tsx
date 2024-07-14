"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { formatCurrency } from "@/lib/formatters"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import { AddProduct } from "../_actions/products"

export function ProductsForm() {
    const [priceInCents, setPriceInCents] = useState<number>(0)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        // Convert priceInCents to string and add to FormData
        formData.set('priceInCents', priceInCents.toString());

        const response = await AddProduct(formData);
        if ('errors' in response) {
            console.error("Form submission error:", response.errors);
        } else {
            console.log("Product added successfully!");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
                <Label htmlFor="name">Název</Label>
                <Input type="text" id="name" name="name" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="price">Cena</Label>
                <Input
                    type="number"
                    id="price"
                    name="priceInCents" // Ensure name attribute matches server-side key

                    value={priceInCents}
                    onChange={e => setPriceInCents(Number(e.target.value))}
                />
            </div>
            <div className="text-muted-foreground">
                {formatCurrency((priceInCents || 0) / 100)}
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Popisek</Label>
                <Textarea id="description" name="description" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="file">Soubor</Label>
                <Input type="file" id="file" name="file" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="image">Náhledový obrázek</Label>
                <Input type="file" id="image" name="image" required />
            </div>
            <Button type="submit">Uložit</Button>
        </form>
    )
}
