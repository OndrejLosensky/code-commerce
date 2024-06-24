import { Navigation, NavigationLink } from "@/components/navigation/nav";

export default function AdminDashboardLayout ( { children } : Readonly<{children: React.ReactNode;}>) {
    return (
        <>
            <Navigation>
                <NavigationLink href="/admin"> Homepage </NavigationLink>
                <NavigationLink href="/admin/produkty"> Products </NavigationLink>
                <NavigationLink href="/admin/uzivatele"> Users </NavigationLink>
                <NavigationLink href="/admin/objednavky"> Orders </NavigationLink>
            </Navigation>
            <div className="my-8">{children}</div>
        </>
    )
}