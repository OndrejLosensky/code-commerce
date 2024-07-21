"use client";


import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

export function Navigation({ children }: { children: ReactNode}) {
  return (
    <nav className="m-4 bg-gray-100 max-h-screen text-black rounded-xl shadow-md border border-black/20 flex flex-col w-16 lg:w-[15%] justify-between">
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
        "relative p-4 flex font-medium flex-col lg:flex-row gap-y-2 m-2 rounded-md lg:gap-x-2 items-center hover:bg-blue-500/20 duration-300 hover:text-blue-700/90 focus-visible:bg-secondary focus-visible:text-secondary-foreground", 
        pathname === props.href && "bg-blue-500/10 text-blue-600"
      )}
    >
      {props.children}
    </Link>
  );
}

export function NavigationExitLink(props: Omit<ComponentProps<typeof Button>, "className">) {
  return (
    <Button 
      {...props} 
    >
      {props.children}
    </Button>
  );
}



export function NavigationLinkCustomer(props: Omit<ComponentProps<typeof Link>, "className">) {
  const pathname = usePathname();
  return (
    <Link 
      {...props} 
      className={cn(
        "p-4 flex flex-row gap-x-4 lg:flex-row gap-y-2 m-2 rounded-md lg:gap-x-2 items-center hover:bg-secondary duration-300 hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground", 
        pathname === props.href && "bg-background text-foreground"
      )}
    >
      {props.children}
    </Link>
  );
}


export function NavigationCustomerView ({ children }: { children: ReactNode }) {
  return (
    <nav className="bg-sky-500 sticky top-0 w-full z-10 border-b border-black/20 shadow-sm text-white flex flex-row justify-center items-center ">
        {children}
    </nav>
  )
}
