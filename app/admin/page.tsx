import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { formatCurrency, formatNumber } from "@/lib/formatters";

import { TbDeviceAnalytics } from "react-icons/tb";
import { FaRegUser, FaRegFile } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { FaLink } from "react-icons/fa6";
import { IoIosPin } from "react-icons/io";
import { IoLogoCss3 } from "react-icons/io";

import db from "@/db/db";
import { ReactNode } from "react";

async function getOrdersData () {
    const data = await db.objednavka.aggregate({
        _sum: {pricePaid: true},
        _count: true
    })

    return {
        amount:( data._sum.pricePaid || 0 ),
        numberOfOrders: data._count
    }
}

async function getUsersData () {
    const [userCount, orderData] = await Promise.all([
        db.uzivatel.count(),
        db.objednavka.aggregate({
            _sum: { pricePaid: true}
        })
    ])

    return {
        userCount,
        averageValuePerPerson: userCount === 0 ? 0 : (orderData._sum.pricePaid || 0) / userCount 
    }
}

async function getProductsData () {
    const [active, inactive] = await Promise.all ([
        db.produkt.count({where: {isAvailable: true}}),
        db.produkt.count({where: {isAvailable: false}})
    ])

    return {active, inactive}
}

async function getExpirationLinksData () {
    const data = await db.downloadControl.count()

    return data
}

export default async function AdminPage () {
    const [orders, users, products, links] = await Promise.all ([
        getOrdersData(),
        getUsersData(),
        getProductsData(),
        getExpirationLinksData()
    ]) 

    return (
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-4">
            <DashboardCard icon={<TbDeviceAnalytics/>} title="Prodeje" description={`${formatNumber(orders.numberOfOrders)} objednávek`} body={`${formatCurrency(orders.amount)}`} />
            <DashboardCard icon={<FaRegUser/>} title="Uživatelé" description={`${formatCurrency(users.averageValuePerPerson)} Průměrná hodnota`} body={`${formatNumber(users.userCount)}`} />
            <DashboardCard icon={<AiFillProduct/>} title="Aktivní produkty" description={`${formatNumber(products.inactive)} Neaktivních produktů`} body={`${formatNumber(products.active)}`} />
            <DashboardCard icon={<IoIosPin/>} title="Počet navštívení" description="počet navštívení" body="0" />
            <DashboardCard icon={<FaLink/>} title="Aktivní odkazy" description="Aktuální počet právě aktivních odkazů" body={`${formatNumber(links)}`} />
            <DashboardCard icon={<FaRegFile/>} title="Soubory" description="Nahraných souborů na e-shopu" body={`${formatNumber(links)}`} />
            <DashboardCard icon={<IoLogoCss3/>} title="Aktivní styly" description="Jednotlivé CSS třídy" body={`${formatNumber(links)}`} />
        </main>
    )
}

type DAshboardCardProps = {
    title: string;
    description: string;
    body: string;
    icon: ReactNode
}

function DashboardCard ( { title, description, body, icon} : DAshboardCardProps) {
    return (  
    <Card>
        <CardHeader> 
            <CardTitle className="flex flex-row gap-x-2"> {icon} {title}</CardTitle> 
            <CardDescription> {description} </CardDescription>
        </CardHeader>
        
        <CardContent>
            <p> {body} </p>
        </CardContent>
    </Card>
    )
}