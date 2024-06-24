import { Navigation, NavigationLink } from "@/components/navigation/nav";

export default function AdminDashboardLayout ( { children } : Readonly<{children: React.ReactNode;}>) {
    return (
        <>
            <Navigation>
                <NavigationLink href="/admin"> Homepage </NavigationLink>
                <NavigationLink href="/produkty"> Products </NavigationLink>
                <NavigationLink href="/uzivatele"> Users </NavigationLink>
                <NavigationLink href="/objednavky"> Orders </NavigationLink>
            </Navigation>
            <div className="my-8">{children}</div>
        </>
    )
}