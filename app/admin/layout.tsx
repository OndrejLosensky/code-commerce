import { Navigation, NavigationLink, NavigationLinkBottom } from "@/components/navigation/nav";

import { FaRegUser, FaShoppingCart, FaHome } from "react-icons/fa";
import { FaBoxArchive } from "react-icons/fa6";

export const dynamic = "force-dynamic"

import { IoSettingsOutline } from "react-icons/io5";
import { CiGlobe } from "react-icons/ci";

export default function AdminDashboardLayout ( { children } : Readonly<{children: React.ReactNode;}>) {
    return (
        <main className="flex flex-row w-screen">
            <Navigation>
                <section className="flex flex-col h-screen justify-between">
                    <div>
                        <NavigationLink href="/admin"> <FaHome className="w-4 h-4"/>  <span className="hidden lg:flex">Domovská stránka </span></NavigationLink>
                        <NavigationLink href="/admin/produkty"> <FaBoxArchive className="w-4 h-4"/>  <span className="hidden lg:flex">Produkty</span> </NavigationLink>
                        <NavigationLink href="/admin/uzivatele"> <FaRegUser className="w-4 h-4"/>  <span className="hidden lg:flex">Uživatelé </span></NavigationLink>
                        <NavigationLink href="/admin/objednavky"> <FaShoppingCart className="w-4 h-4"/> <span className="hidden lg:flex"> Objednávky</span> </NavigationLink>                
                    </div>
                    <div>
                        <NavigationLinkBottom href="/"> 
                            <CiGlobe className="mr-2 w-6 h-6"/> 
                            <span className="hidden lg:inline">Zpět na web</span>
                        </NavigationLinkBottom>
                        <NavigationLinkBottom href="/admin/settings"> 
                            <IoSettingsOutline className="mr-2 w-6 h-6"/> 
                            <span className="hidden lg:inline">Nastavení</span>
                        </NavigationLinkBottom>              
                    </div>
                </section>
            </Navigation>
            <div className="m-8 w-[85%]">
                {children}
            </div>
        </main>
    )
}