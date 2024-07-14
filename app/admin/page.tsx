import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { formatCurrency, formatNumber } from "@/lib/formatters";

import db from "@/db/db";

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

export default async function AdminPage () {
    const [orders, users, products] = await Promise.all ([
        getOrdersData(),
        getUsersData(),
        getProductsData()
    ]) 

    return (
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-4">
            <DashboardCard title="Prodeje" description={`${formatNumber(orders.numberOfOrders)}`} body={`${formatCurrency(orders.amount)}`} />
            <DashboardCard title="Uživatelé" description={`${formatCurrency(users.averageValuePerPerson)} Průměrná hodnota`} body={`${formatNumber(users.userCount)}`} />
            <DashboardCard title="Aktivní produkty" description={`${formatNumber(products.inactive)} Neaktivních produktů`} body={`${formatNumber(products.active)}`} />
        </main>
    )
}

type DAshboardCardProps = {
    title: string;
    description: string;
    body: string;
}

function DashboardCard ( { title, description, body} : DAshboardCardProps) {
    return (  
    <Card>
        <CardHeader> 
            <CardTitle> {title}</CardTitle> 
            <CardDescription> {description} </CardDescription>
        </CardHeader>
        
        <CardContent>
            <p> {body} </p>
        </CardContent>
    </Card>
    )
}