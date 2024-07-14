import { Button } from "@/components/ui/button";
import { PageHeader } from "../_components/admin-page-nav";
import Link from "next/link";

export default function ProductsAdminPage () {
    return (
        <>
            <div className="flex justify-between items-center gap-4">
                <PageHeader> Produkty </PageHeader>
                <Button asChild>
                    <Link href="/admin/produkty/pridat"> Přidat nový produkt </Link>    
                </Button>                          
            </div>
        </>
    )
}