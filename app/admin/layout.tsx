import { Navigation, NavigationLink } from "@/components/navigation/nav";

import { FaRegUser, FaShoppingCart } from "react-icons/fa";
import { FaBoxArchive } from "react-icons/fa6";
import { RiDashboard3Line } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { CiGlobe } from "react-icons/ci";
import Link from "next/link";

export const dynamic = "force-dynamic"



export default function AdminDashboardLayout ( { children } : Readonly<{children: React.ReactNode;}>) {
    return (
        <main className="flex flex-row w-screen">
            <Navigation>
                <section className="flex flex-col justify-between">
                    <div>
                        <NavigationLink href="/admin"> <RiDashboard3Line className="w-5 h-5"/>  <span className="hidden lg:flex">Dashboard </span></NavigationLink>
                        <NavigationLink href="/admin/produkty"> <FaBoxArchive className="w-4 h-4"/>  <span className="hidden lg:flex">Produkty</span> </NavigationLink>
                        <NavigationLink href="/admin/uzivatele"> <FaRegUser className="w-4 h-4"/>  <span className="hidden lg:flex">Uživatelé </span></NavigationLink>
                        <NavigationLink href="/admin/objednavky"> <FaShoppingCart className="w-4 h-4"/> <span className="hidden lg:flex"> Objednávky</span> </NavigationLink>
                        <NavigationLink href="/">  <CiGlobe className="w-6 h-5"/> <span className="hidden lg:flex">Zpět na web</span> </NavigationLink>
                        <NavigationLink href="/admin/nastaveni"><IoSettingsOutline className="w-6 h-5"/> <span className="hidden lg:flex">Nastavení</span></NavigationLink>                                     
                    </div>
                </section>
            </Navigation>
            <div className="m-8 w-[85%]">
                {children}
            </div>
        </main>
    )
}