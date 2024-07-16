"use client";


import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode } from "react";

import { Button } from "../ui/button";

import { cn } from "@/lib/utils";


export function Navigation({ children }: { children: ReactNode }) {
  return (
    <nav className="bg-sky-500 text-white flex flex-col h-screen w-16 lg:w-[15%] justify-between">
      <div>
        {children}
      </div>
    </nav>
  );
}

export function NavigationLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  const pathname = usePathname();
  return (
    <Link 
      {...props} 
      className={cn(
        "p-4 flex flex-col lg:flex-row gap-y-2 lg:gap-x-2 items-center hover:bg-secondary duration-300 hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground", 
        pathname === props.href && "bg-background text-foreground"
      )}
    >
      {props.children}
    </Link>
  );
}

export function NavigationLinkBottom(props: Omit<ComponentProps<typeof Link>, "className">) {
  const pathname = usePathname();
  return (
    <Link 
      {...props} 
      className={cn(
        "p-4 flex flex-col lg:flex-row gap-y-2 lg:gap-x-2 items-center hover:bg-secondary duration-300 hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground", 
        pathname === props.href && "bg-background text-foreground"
      )}
    >
      {props.children}
    </Link>
  );
}


export function NavigationCustomerView ({ children }: { children: ReactNode }) {
  return (
    <nav className="bg-sky-500 text-white flex flex-row justify-center items-center ">
        {children}
        <Link className="absolute right-2 top-2" href="/admin"> <Button>Admin</Button> </Link>
    </nav>
  );
}