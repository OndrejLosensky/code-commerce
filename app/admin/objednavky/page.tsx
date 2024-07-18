import { PageHeader } from "../_components/admin-page-nav";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import db from "@/db/db";
import {  MoreVertical } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DeleteDropdownItem } from "./_components/OrderActions";

export default function OrdersAdminPage () {
    return (
        <>
            <div className="flex justify-between items-center gap-4">
                <PageHeader> Objednávky </PageHeader>
                {/* 
                <Button asChild>
                    <Link href="/admin/produkty/pridat"> Přidat nového uživatele </Link>    
                </Button>                          
                */}
            </div>
            <OrdersTable/>
        </>
    )
}

async function OrdersTable () {
    const orders = await db.objednavka.findMany({
        select: {
            id:true,
            pricePaid: true,            
            produkt: { select: { name: true}},
            user: { select: { email : true}},

        },
        orderBy: { createdAt: "desc"} 
    })

    if (orders.length === 0) return <p className="pt-2 w-full border-t mt-2"> Nenešel jsem žádnou objednávku </p>

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Produkt</TableHead>
                    <TableHead>Uživatel</TableHead>
                    <TableHead>Zaplaceno</TableHead>
                    <TableHead className="w-0">
                        <span className="sr-only"> Akce</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.map(order => (
                    <TableRow key={order.id}>                  
                        <TableCell> {order.produkt.name} </TableCell>
                        <TableCell>{order.user.email} </TableCell>
                        <TableCell> {formatCurrency(order.pricePaid)} </TableCell> 
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <MoreVertical/>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DeleteDropdownItem id={order.id}/>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        )
}