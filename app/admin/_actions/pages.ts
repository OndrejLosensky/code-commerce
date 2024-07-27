"use server"

import db from "@/db/db"
import { z } from "zod"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

const pageSchema = z.object({
    styles: z.string().min(1, "Styles are required")
})

export async function AddPage(formData: FormData) {
    const result = pageSchema.safeParse(Object.fromEntries(formData.entries()))

    if (!result.success) {
        return result.error.formErrors.fieldErrors
    }

    const data = result.data

    try {
        const existingRecord = await db.homepage.findFirst()

        if (existingRecord) {
            await db.homepage.update({
                where: { id: existingRecord.id },
                data: {
                    styles: data.styles 
                }
            })
        } else {
           console.log("You need to create an record for styles first")
        }

        revalidatePath("/")
        redirect("/admin/")
    } catch (error) {
        console.error("Error updating or creating record:", error)
    }
}
