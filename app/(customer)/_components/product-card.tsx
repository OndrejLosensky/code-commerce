import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
    id: string
    name: string
    price: number
    description: string
    imagePath: string
}

export function ProductCard({id, name, price, description, imagePath}: ProductCardProps){
    return (
        <Card className="flex overflow-hidden flex-col">
            <div className="relative w-full h-auto aspect-video">
                <Image src={imagePath} fill alt={name} />
            </div>
            <CardHeader>
                <CardTitle> {name} </CardTitle>
                <CardDescription> {formatCurrency(price)} </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="line-clamp-4">{description}</p>
            </CardContent>
            <CardFooter>
                <Button asChild size="lg" className="w-full">
                    <Link href={`/produkty/${id}/koupit`}>Koupit</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}

export function CardSkeleton() {
    return (
        <Card className="flex overflow-hidden flex-col"> {/* animate-pulse */}
            <div className="bg-gray-300 w-full aspect-video"></div>
            <CardHeader>
                <CardTitle> <div className="w-3/4 h-6 rounded-full bg-gray-300"></div> </CardTitle>
                <CardDescription> <div className="w-3/4 h-4 rounded-full bg-gray-300"></div> </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-2">
               <div className="w-full h-4 rounded-full bg-gray-300"></div>
               <div className="w-full h-4 rounded-full bg-gray-300"></div>
               <div className="w-3/4 h-4 rounded-full bg-gray-300"></div>
            </CardContent>
            <CardFooter>
                <Button disabled size="lg" className="w-full"> </Button>
            </CardFooter>
        </Card>
    )
}