"use server"

import db from "@/db/db" // Ensure this path is correct
import { z } from "zod"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

const pageSchema = z.object({
    styles: z.string().min(1, "Styles are required")
})

export async function AddPage(formData: FormData) {
    const result = pageSchema.safeParse(Object.fromEntries(formData.entries()))

    if (result.success === false) {
        return result.error.formErrors.fieldErrors
    }

    const data = result.data

    // Check if a record already exists
    const existingRecord = await db.homepage.findFirst()

    if (existingRecord) {
        // If a record exists, update it
        await db.homepage.update({
            where: { id: existingRecord.id },
            data: {
                styles: data.styles
            }
        })
    } else {
        // If no record exists, create a new one
        await db.homepage.create({
            data: {
                styles: data.styles
            }
        })
    }

    revalidatePath("/")
    redirect("/admin/")
}
    