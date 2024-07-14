import { Navigation, NavigationLink } from "@/components/navigation/nav";

import { FaRegUser, FaShoppingCart, FaHome } from "react-icons/fa";
import { FaBoxArchive } from "react-icons/fa6";

export const dynamic = "force-dynamic"

export default function AdminDashboardLayout ( { children } : Readonly<{children: React.ReactNode;}>) {
    return (
        <main className="flex flex-row w-screen">
            <Navigation>
                <NavigationLink href="/admin"> <FaHome className="w-4 h-4"/>  <span className="hidden lg:flex">Domovská stránka </span></NavigationLink>
                <NavigationLink href="/admin/produkty"> <FaBoxArchive className="w-4 h-4"/>  <span className="hidden lg:flex">Produkty</span> </NavigationLink>
                <NavigationLink href="/admin/uzivatele"> <FaRegUser className="w-4 h-4"/>  <span className="hidden lg:flex">Uživatelé </span></NavigationLink>
                <NavigationLink href="/admin/objednavky"> <FaShoppingCart className="w-4 h-4"/> <span className="hidden lg:flex"> Objednávky</span> </NavigationLink>
            </Navigation>
            <div className="m-8 w-[85%]">
                {children}
            </div>
        </main>
    )
}