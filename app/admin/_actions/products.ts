"use server"

import db from "@/db/db"
import { z } from "zod"
import fs from "fs/promises"
import { notFound, redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

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
            isAvailable: false,
            description: data.description,
            price: data.priceInCents,
            filePath,
            imagePath,
        },
    })

    revalidatePath("/")
    revalidatePath("/produkty")

    redirect("/admin/produkty")
}

export async function toggleProductAvailability(id:string, isAvailable: boolean) {
    await db.produkt.update({ where: { id }, data: { isAvailable}})
    revalidatePath("/")
    revalidatePath("/produkty")
}

export async function deleteProduct(id: string) {
    const product = await db.produkt.delete({where: {id}})

    if (product == null) {
        return notFound()
    }

    await fs.unlink(product.filePath)
    await fs.unlink(`public${product.imagePath}`)

    revalidatePath("/")
    revalidatePath("/produkty")
}


const editSchema = addSchena.extend({
    file: fileSchema.optional(),
    image: imageSchema.optional()
})

export async function updateProduct (id: string ,prevState: unknown, formData: FormData) {
    const result = editSchema.safeParse(Object.fromEntries(formData.entries()))

    if (result.success === false) {
        return result.error.formErrors.fieldErrors
    }

    console.log("Product added!")

    const data = result.data
    const product = await db.produkt.findUnique({ where: { id }})

    if ( product == null) {
        return notFound()
    }

    let filePath = product.filePath
    if (data.file != null && data.file.size > 0) {
        await fs.unlink(product.filePath)
        filePath = `produkty/${crypto.randomUUID()}-${data.file.name}`
        await fs.writeFile(filePath,Buffer.from(await data.file.arrayBuffer()))
    }
   

    let imagePath = product.imagePath
    if (data.image != null && data.image.size > 0) {
        await fs.unlink(`public${product.imagePath}`)
        imagePath = `/produkty/${crypto.randomUUID()}-${data.image.name}`
        await fs.writeFile(`public${imagePath}`,Buffer.from(await data.image.arrayBuffer()))    
    }

    await db.produkt.update({
        where: { id}, 
        data: {
            name: data.name,
            isAvailable: false,
            description: data.description,
            price: data.priceInCents,
            filePath,
            imagePath,
        },
    })

    revalidatePath("/")
    revalidatePath("/produkty")

    redirect("/admin/produkty")
}