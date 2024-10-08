import { ActionNavigation, Navigation, NavigationLink } from "@/components/navigation/nav";

import { FaRegUser, FaShoppingCart } from "react-icons/fa";
import { FaBoxArchive } from "react-icons/fa6";
import { RiDashboard3Line } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { CiGlobe } from "react-icons/ci";
import { RiAiGenerate } from "react-icons/ri";
import { MdOutlinePermMedia } from "react-icons/md";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { ExitDialog } from "./_components/exit-dialog";


export const dynamic = "force-dynamic"

export default function AdminDashboardLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <main className="flex flex-row w-screen">
            <Navigation>
                <section className="flex flex-col justify-between">
                    <div>
                        <NavigationLink href="/admin">
                            <RiDashboard3Line className="w-5 h-5" />
                            <span className="hidden lg:flex">Přehled</span>
                        </NavigationLink>

                        <h2 className="pl-4 pt-4 font-medium hidden lg:flex text-lg text-muted-foreground"> Obchod </h2>
                        <NavigationLink href="/admin/produkty">
                            <FaBoxArchive className="w-4 h-4" />
                            <span className="hidden lg:flex">Produkty</span>
                        </NavigationLink>
                        <NavigationLink href="/admin/uzivatele">
                            <FaRegUser className="w-4 h-4" />
                            <span className="hidden lg:flex">Uživatelé</span>
                        </NavigationLink>
                        <NavigationLink href="/admin/objednavky">
                            <FaShoppingCart className="w-4 h-4" />
                            <span className="hidden lg:flex">Objednávky</span>
                        </NavigationLink>

                        <h2 className="pl-4 pt-4 font-medium hidden lg:flex text-lg text-muted-foreground"> Vzhled </h2>
                        <NavigationLink href="/admin/uvodni-stranka">
                            <RiAiGenerate className="w-4 h-4" />
                            <span className="hidden lg:flex">Stránky</span>
                            <span className="hidden lg:flex absolute right-2 bg-green-200 border border-green-500/60 text-green-600 px-2 py-1 text-sm rounded-md">Beta</span>
                        </NavigationLink>
                        <NavigationLink href="/admin/media">
                            <MdOutlinePermMedia className="w-4 h-4" />
                            <span className="hidden lg:flex">Média</span>
                            <span className="hidden lg:flex absolute right-2 bg-green-200 border border-green-500/60 text-green-600 px-2 py-1 text-sm rounded-md">Beta</span>
                        </NavigationLink>

                        <h2 className="pl-4 pt-4 font-medium hidden lg:flex text-lg text-muted-foreground"> Nastavení </h2>
                        <NavigationLink href="/admin/nastaveni">
                            <IoSettingsOutline className="w-6 h-5" />
                            <span className="hidden lg:flex">Nastavení</span>
                            <span className="hidden lg:flex absolute right-2 bg-blue-200 border border-blue-500/60 text-blue-600 px-2 py-1 text-sm rounded-md">Soon</span>
                        </NavigationLink>
                        <NavigationLink href="/admin/pluginy">
                            <IoExtensionPuzzleOutline className="w-6 h-5" />
                            <span className="hidden lg:flex">Pluginy</span>
                            <span className="hidden lg:flex absolute right-2 bg-blue-200 border border-blue-500/60 text-blue-600 px-2 py-1 text-sm rounded-md">Soon</span>
                        </NavigationLink>
                        <br />

                        <ExitDialog>
                            <NavigationLink href="#">
                                <CiGlobe className="w-6 h-5" />
                                <span className="hidden lg:flex">Odejít</span>
                            </NavigationLink>
                        </ExitDialog>
                    </div>
                </section>
            </Navigation>
            <div className="m-8 w-[85%]">
                {children}
            </div>
        </main>
    )
}
