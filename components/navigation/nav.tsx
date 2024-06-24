"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Navigation ({ children }: {children: ReactNode}) {
    return (
        <nav className="bg-primary text-primary-foregroud flex justify-center px-6">
            {children} 
        </nav>
    )
}

export function NavigationLink ( props: Omit<ComponentProps<typeof Link>, "className">) {
    const pathname = usePathname()
    return <Link {...props} className={cn("p-4 hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground", pathname === props.href && "bg-background text-foreground" )} /> 
}