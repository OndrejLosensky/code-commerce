"use server"

import db from "@/db/db"
import { z } from "zod"
import fs from "fs/promises"
import { notFound, redirect } from "next/navigation"

const fileSchema = z.instanceof(File, {message: "Povinné"})
const imageSchema = fileSchema.refine(file => file.size === 0 || file.type.startsWith("image/"))

const addSchena = z.object({
    name:z.string().min(1),
    description: z.string().min(1),
    priceInCents: z.coerce.number().int().min(1),
    file: fileSchema.refine(file => file.size > 0, "Required"),
    image: imageSchema.refine(file => file.size > 0, "Required")
})

export async function AddProduct (prevState: unknown, formData: FormData) {
    const result = addSchena.safeParse(Object.fromEntries(formData.entries()))

    if (result.success === false) {
        return result.error.formErrors.fieldErrors
    }

    console.log("Product added!")

    const data = result.data

    await fs.mkdir("produkty", {recursive:true})
    const filePath = `produkty/${crypto.randomUUID()}-${data.file.name}`
    await fs.writeFile(filePath,Buffer.from(await data.file.arrayBuffer()))

    await fs.mkdir("public/produkty", {recursive:true})
    const imagePath = `/produkty/${crypto.randomUUID()}-${data.image.name}`
    await fs.writeFile(`public${imagePath}`,Buffer.from(await data.image.arrayBuffer()))

    await db.produkt.create({ 
        data: {
            name: data.name,
            isAvailable: true,
            description: data.description,
            price: data.priceInCents,
            filePath,
            imagePath,
        },
    })

    redirect("/admin/produkty")
}

export async function toggleProductAvailability(id:string, isAvailable: boolean) {
    await db.produkt.update({ where: { id }, data: { isAvailable}})
}

export async function deleteProduct(id: string) {
    const product = await db.produkt.delete({where: {id}})

    if (product == null) {
        return notFound()
    }
}