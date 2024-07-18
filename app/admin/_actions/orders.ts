"use server"

import db from "@/db/db"
import { notFound } from "next/navigation"


export async function deleteOrder(id: string) {
    const user = await db.objednavka.delete({where: {id}})

    if (user == null) {
        return notFound()
    }

    return user
}