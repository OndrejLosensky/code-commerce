import { Navigation, NavigationLink } from "@/components/navigation/nav";
import { FaRegUser, FaShoppingCart, FaHome } from "react-icons/fa";
import { FaBoxArchive } from "react-icons/fa6";


export default function AdminDashboardLayout ( { children } : Readonly<{children: React.ReactNode;}>) {
    return (
        <>
            <Navigation>
                <NavigationLink href="/admin"> <FaHome className="w-4 h-4"/>  Domovská stránka </NavigationLink>
                <NavigationLink href="/admin/produkty"> <FaBoxArchive className="w-4 h-4"/>  Produkty </NavigationLink>
                <NavigationLink href="/admin/uzivatele"> <FaRegUser className="w-4 h-4"/>  Uživatelé </NavigationLink>
                <NavigationLink href="/admin/objednavky"> <FaShoppingCart className="w-4 h-4"/>  Objednávky </NavigationLink>
            </Navigation>
            <div className="my-8">{children}</div>
        </>
    )
}