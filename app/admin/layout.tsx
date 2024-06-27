import { Navigation, NavigationLink } from "@/components/navigation/nav";
import Image from "next/image";
import Link from "next/link";
import { FaRegUser, FaShoppingCart, FaHome } from "react-icons/fa";
import { FaBoxArchive } from "react-icons/fa6";


export default function AdminDashboardLayout ( { children } : Readonly<{children: React.ReactNode;}>) {
    return (
        <>
            <Navigation>
                {/*}
                <div className="flex items-center justify-center">
                    <Link href="/"><Image src="/icon.svg" width={2} height={2} alt="App icon" className="w-10 h-10 fill-white items-center mr-4 cursor-pointer"/></Link>
                </div>
                */}
                <NavigationLink href="/admin"> <FaHome className="w-4 h-4"/>  Domovská stránka </NavigationLink>
                <NavigationLink href="/admin/produkty"> <FaBoxArchive className="w-4 h-4"/>  Produkty </NavigationLink>
                <NavigationLink href="/admin/uzivatele"> <FaRegUser className="w-4 h-4"/>  Uživatelé </NavigationLink>
                <NavigationLink href="/admin/objednavky"> <FaShoppingCart className="w-4 h-4"/>  Objednávky </NavigationLink>
            </Navigation>
            <div className="my-8">{children}</div>
        </>
    )
}