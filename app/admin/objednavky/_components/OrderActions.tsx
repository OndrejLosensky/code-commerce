"use client"

import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { deleteOrder } from "../../_actions/orders"

export function DeleteDropdownItem({id} : {id: string}) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    return (
        <DropdownMenuItem
            disabled={isPending}
            onClick={()=> {
            startTransition(async () => {
                await deleteOrder(id)
                router.refresh()
            })
        }}> 
        Smazat       
        </DropdownMenuItem> 
    )
}