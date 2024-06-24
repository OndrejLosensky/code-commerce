import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminPage () {
    return (
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-4">
            <Card>
                <CardHeader> 
                    <CardTitle>  Prodeje 1</CardTitle> 
                    <CardDescription> krátký popisek </CardDescription>
                </CardHeader>
                
                <CardContent>
                    <p> Random text </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader> 
                    <CardTitle>  Prodeje 2</CardTitle> 
                    <CardDescription> krátký popisek </CardDescription>
                </CardHeader>
                
                <CardContent>
                    <p> Random text </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader> 
                    <CardTitle>  Prodeje 3</CardTitle> 
                    <CardDescription> krátký popisek </CardDescription>
                </CardHeader>
                
                <CardContent>
                    <p> Random text </p>
                </CardContent>
            </Card>
        </main>
    )
}