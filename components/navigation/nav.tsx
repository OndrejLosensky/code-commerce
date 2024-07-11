"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

import { IoSettingsOutline } from "react-icons/io5";
import { CiGlobe } from "react-icons/ci";


export function Navigation ({ children }: {children: ReactNode}) {
    return (
        <nav className="bg-sky-500 text-white flex flex-col h-screen w-[15%] justify-between">
            <div>
                {children} 
            </div>
            <div>
                <NavigationLinkBottom href="/"> <CiGlobe className="mr-2 w-6 h-6"/> Zpět na web </NavigationLinkBottom>
                <NavigationLinkBottom href="/admin/settings"> <IoSettingsOutline className="mr-2 w-6 h-6"/> Nastavení </NavigationLinkBottom>
            </div>
        </nav>
    )
}

export function NavigationLink ( props: Omit<ComponentProps<typeof Link>, "className">) {
    const pathname = usePathname()
    return <Link {...props} className={cn("p-4 flex flex-row gap-x-2 items-center hover:bg-secondary duration-300 hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground", pathname === props.href && "bg-background text-foreground" )} /> 
}

export function NavigationLinkBottom ( props: Omit<ComponentProps<typeof Link>, "className">) {
    const pathname = usePathname()
    return <Link {...props} className={cn("p-4 flex flex-row gap-x-2 items-center hover:bg-secondary duration-300 hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground", pathname === props.href && "bg-background text-foreground" )} /> 
}