"use client";


import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";


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
        "relative p-4 flex font-medium flex-col lg:flex-row gap-y-2 m-2 rounded-md lg:gap-x-2 items-center hover:bg-sky-200 duration-300 hover:text-sky-900 focus-visible:bg-secondary focus-visible:text-secondary-foreground", 
        pathname === props.href && "bg-sky-200/50 text-sky-800"
      )}
    >
      {props.children}
    </Link>
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
