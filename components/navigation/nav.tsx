"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Navigation ({ children }: {children: ReactNode}) {
    return (
        <nav className="bg-green-500 text-white flex justify-start px-4">
            {children} 
        </nav>
    )
}

export function NavigationLink ( props: Omit<ComponentProps<typeof Link>, "className">) {
    const pathname = usePathname()
    return <Link {...props} className={cn("p-4 flex flex-row gap-x-2 items-center hover:bg-secondary duration-300 hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground", pathname === props.href && "bg-background text-foreground" )} /> 
}