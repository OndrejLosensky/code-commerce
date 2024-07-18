"use client"

import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { deleteUser } from "../../_actions/users"

export function DeleteDropdownITem({id} : {id: string}) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    return (
        <DropdownMenuItem
            disabled={isPending}
            onClick={()=> {
            startTransition(async () => {
                await deleteUser(id)
                router.refresh()
            })
        }}> 
        Smazat       
        </DropdownMenuItem> 
    )
}