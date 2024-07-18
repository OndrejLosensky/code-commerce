"use server"

import db from "@/db/db"

export async function userOrderExists(email:string, produktId: string) {
   return ( 
        (await db.objednavka.findFirst({
            where: { user: {email}, produktId }, 
            select: { id: true }
        })) != null
    )
}