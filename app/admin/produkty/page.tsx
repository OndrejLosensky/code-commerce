import { Button } from "@/components/ui/button";
import { PageHeader } from "../_components/admin-page-nav";
import Link from "next/link";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function ProductsAdminPage () {
    return (
        <>
            <div className="flex justify-between items-center gap-4">
                <PageHeader> Produkty </PageHeader>
                <Button asChild>
                    <Link href="/admin/produkty/pridat"> Přidat nový produkt </Link>    
                </Button>                          
            </div>
            <ProductsTable/>
        </>
    )
}

function ProductsTable () {
    return <Table>
        <TableHeader>
            <TableRow>
                <TableHead className="w-0"><span className="sr-only">Aktivní</span></TableHead>
                <TableHead>Název</TableHead>
                <TableHead>Cena</TableHead>
                <TableHead>Objednávky</TableHead>
                <TableHead className="w-0"><span className="sr-only">Akce</span></TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            
        </TableBody>
    </Table>
}