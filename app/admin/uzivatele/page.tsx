import { PageHeader } from "../_components/admin-page-nav";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import db from "@/db/db";
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DeleteDropdownITem } from "./_actions/UserActions";

export default function UsersAdminPage () {
    return (
        <>
            <div className="flex justify-between items-center gap-4">
                <PageHeader> Uživatelé </PageHeader>
                {/* 
                <Button asChild>
                    <Link href="/admin/produkty/pridat"> Přidat nového uživatele </Link>    
                </Button>                          
                */}
            </div>
            <UsersTable/>
        </>
    )
}

async function UsersTable () {
    const users = await db.uzivatel.findMany({
        select: {
            id:true,
            email: true,            
            orders: { select: { pricePaid: true}}

        },
        orderBy: { createdAt: "desc"} 
    })

    if (users.length === 0) return <p className="pt-2 w-full border-t mt-2"> Nenešel jsem žádného uživatele </p>

    return <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Objednávky</TableHead>
                <TableHead>Cena</TableHead>
                <TableHead className="w-0">
                    <span className="sr-only"> Akce</span>
                </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {users.map(user => (
                <TableRow key={user.id}>                  
                    <TableCell> {user.email} </TableCell>
                    <TableCell> {formatNumber(user.orders.length)} </TableCell>
                    <TableCell> {formatCurrency(user.orders.reduce((sum, o) => o.pricePaid + sum, 0 ))} </TableCell> 
                    <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <MoreVertical/>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                               <DeleteDropdownITem id={user.id} />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
}