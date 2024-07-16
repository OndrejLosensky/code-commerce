import { NavigationCustomerView, NavigationLink } from "../../components/navigation/nav";

import { FaRegUser, FaShoppingCart, FaHome } from "react-icons/fa";
import { FaBoxArchive } from "react-icons/fa6";

export const dynamic = "force-dynamic"

export default function Layout ( { children } : Readonly<{children: React.ReactNode;}>){
    return (
            <main className="flex flex-col w-screen min-h-screen">
                <NavigationCustomerView>
                    <NavigationLink href="/"> <FaHome className="w-4 h-4"/>  <span>Domovská stránka </span></NavigationLink>
                    <NavigationLink href="/produkty"> <FaBoxArchive className="w-4 h-4"/>  <span>Produkty</span> </NavigationLink>
                    <NavigationLink href="/objednavky"> <FaShoppingCart className="w-4 h-4"/> <span> Objednávky</span> </NavigationLink>
                </NavigationCustomerView>
                <div className="m-8">
                    {children}
                </div>
        </main>
    )
}