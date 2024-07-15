"use client"

import Link from "next/link";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { useTransition } from "react";
import { deleteProduct, toggleProductAvailability } from "../../_actions/products";
import { useRouter } from "next/navigation";

export function ActveToggleDropdownItem({id,isAvailable} : {id: string, isAvailable: boolean}) { 
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    return (
        <DropdownMenuItem
            disabled={isPending}
            onClick={()=> {
            startTransition(async () => {
                await toggleProductAvailability(id, !isAvailable)
                router.refresh()
            })
        }}> 
        {isAvailable ? "Deaktivovat" : "Aktivovat"}
        </DropdownMenuItem> 
    )
}

export function DeleteDropdownITem({id, disabled} : {id: string, disabled: boolean}) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    return (
        <DropdownMenuItem
            variant="destructive"
            disabled={disabled || isPending}
            onClick={()=> {
            startTransition(async () => {
                await deleteProduct(id)
                router.refresh()
            })
        }}> 
        Smazat       
        </DropdownMenuItem> 
    )
}

export function EditDropdownItem({id}: {id:string}){
    return (
        <DropdownMenuItem>
            <a href={`/admin/produkty/${id}/edit`}> Upravit </a>
        </DropdownMenuItem>
    )
}

export function DownloadDropdownItem({id}:{id:string}){
    return (
        <DropdownMenuItem>
            <Link download href={`/admin/produkty/${id}/download`}> Stáhnout </Link>
        </DropdownMenuItem>
    )
}

