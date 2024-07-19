import Link from "next/link";
import { NavigationCustomerView, NavigationLink, NavigationLinkCustomer } from "../../components/navigation/nav";

import { FaShoppingCart, FaHome } from "react-icons/fa";
import { FaBoxArchive } from "react-icons/fa6";
import { RiAdminLine } from "react-icons/ri";



export const dynamic = "force-dynamic"

export default function Layout ( { children } : Readonly<{children: React.ReactNode;}>){
    return (
            <main className="flex flex-col w-screen min-h-screen relative">
                <Link href="/admin" className="fixed bottom-4 bg-gradient-to-b from-violet-400 to-purple-400 rounded-full w-10 h-10 flex items-center justify-center z-10 left-4 border "> <RiAdminLine className="fill-white w-6 h-6"/> </Link>

                <NavigationCustomerView>
                    <NavigationLinkCustomer href="/"> <FaHome className="w-4 h-4"/>  <span>Domovská stránka </span></NavigationLinkCustomer>
                    <NavigationLinkCustomer href="/produkty"> <FaBoxArchive className="w-4 h-4"/>  <span>Produkty</span> </NavigationLinkCustomer>
                    <NavigationLinkCustomer href="/objednavky"> <FaShoppingCart className="w-4 h-4"/> <span> Objednávky</span> </NavigationLinkCustomer>
                </NavigationCustomerView>
                <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-violet-400 to-teal-400 mb-12">
                    <h1 className="font-bold text-white text-4xl"> Vítejte v aplikaci <strong>CodeCommerce</strong> </h1>
                </div>
                <div className="m-8">
                    {children}
                </div>
        </main>
    )
}