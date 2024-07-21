import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { ReactNode } from "react"

import { NavigationExitLink } from "@/components/navigation/nav"
import { CiGlobe } from "react-icons/ci"
import Link from "next/link"
export function ExitDialog({ children } : {children:ReactNode}) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Jsi si jistý, že chceš odejít?</AlertDialogTitle>
                    <AlertDialogDescription>
                       Veškerý neuložený obsah bude smazaný.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Zrušit</AlertDialogCancel>
                    <Link href="/">
                        <NavigationExitLink>                            
                            <span className="hidden lg:flex">Odejít</span>
                        </NavigationExitLink>
                    </Link>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
