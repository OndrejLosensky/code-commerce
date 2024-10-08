import { Button } from "@/components/ui/button";
import { PageHeader } from "../_components/admin-page-nav";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import db from "@/db/db";
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { ActveToggleDropdownItem, DeleteDropdownITem, DownloadDropdownItem, EditDropdownItem } from "./_actions/product-actions";

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

async function ProductsTable () {
    const products = await db.produkt.findMany({
        select: {
            id:true,
            name: true,
            price: true,
            isAvailable: true,
            _count: {select: {orders: true}}
        },
        orderBy: { name: "asc"} 
    })

    if (products.length === 0) return <p className="pt-2 w-full border-t mt-2"> Nenešel jsem žádné produkty, přidej prosím první... </p>

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
            {products.map(produkt => (
                <TableRow key={produkt.id}>
                    <TableCell>
                        {produkt.isAvailable ? (
                            <>
                                <span className="sr-only">Dostupný</span>
                                <CheckCircle2 className="stroke-green-500"/>
                            </>
                        ) : (
                            <>
                                <span className="sr-only">Nedostupný</span>
                                <XCircle className="stroke-destructive" />
                            </>
                        )}
                    </TableCell>
                    <TableCell> {produkt.name} </TableCell>
                    <TableCell> {formatCurrency(produkt.price)} </TableCell>
                    <TableCell> {formatNumber(produkt._count.orders)} </TableCell> 
                    <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <MoreVertical/>
                                <span className="sr-only">Akce</span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <EditDropdownItem id={produkt.id}/>
                                <DownloadDropdownItem id={produkt.id}/>
                                <DropdownMenuSeparator/>
                                <ActveToggleDropdownItem id={produkt.id} isAvailable={produkt.isAvailable}/>
                                <DeleteDropdownITem id={produkt.id} disabled={produkt._count.orders > 0}/>
                            </DropdownMenuContent>
                        </DropdownMenu>
                       
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
}