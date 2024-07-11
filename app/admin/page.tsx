import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import db from "@/db/db";

function getOrdersData () {
    db?.objednavka
}


export default function AdminPage () {
    return (
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-4">
            <DashboardCard title="Prodeje" description="random popisek" body="Tělo dané karty" />
            <DashboardCard title="Uživatelé" description="random popisek" body="Tělo dané karty" />
            <DashboardCard title="Produkty" description="random popisek" body="Tělo dané karty" />
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