import { Navigation, NavigationLink } from "@/components/navigation/nav";

import { FaRegUser, FaShoppingCart, FaHome } from "react-icons/fa";
import { FaBoxArchive } from "react-icons/fa6";

export const dynamic = "force-dynamic"

export default function AdminDashboardLayout ( { children } : Readonly<{children: React.ReactNode;}>) {
    return (
        <main className="flex flex-row w-screen">
            <Navigation>
                <NavigationLink href="/admin"> <FaHome className="w-4 h-4"/>  Domovská stránka </NavigationLink>
                <NavigationLink href="/admin/produkty"> <FaBoxArchive className="w-4 h-4"/>  Produkty </NavigationLink>
                <NavigationLink href="/admin/uzivatele"> <FaRegUser className="w-4 h-4"/>  Uživatelé </NavigationLink>
                <NavigationLink href="/admin/objednavky"> <FaShoppingCart className="w-4 h-4"/>  Objednávky </NavigationLink>
            </Navigation>
            <div className="m-8 w-[85%]">
                {children}
            </div>
        </main>
    )
}