import { Button } from "@/components/ui/button"
import db from "@/db/db"
import { Produkt } from "@prisma/client"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { CardSkeleton, ProductCard } from "./_components/product-card"
import { Suspense } from "react"
import { cache } from "@/lib/cache"



const getProducts = cache(() => {
    return db.produkt.findMany({
        where: { isAvailable: true}, 
        orderBy: { orders: {_count: "desc"}},
        take: 6
    })
}, ["/", "getProducts"])

const getPopularProducts = cache(() => {
    return db.produkt.findMany({
        where: { isAvailable: true}, 
        orderBy: { createdAt: "desc"},
        take: 3
    })
}, ["/", "getPopularProducts"], {revalidate: 60 * 60 * 24}) /* Revalidates once in a 24 hours */


export default function HomePage() {
    return (
        <main className="space-y-8">
            <div className="py-16 px-2 flex items-center justify-center bg-gradient-to-br from-violet-400 to-teal-400 ">
                <h1 className="font-bold text-white text-4xl"> Vítejte v aplikaci <strong>CodeCommerce</strong> </h1>
            </div>
            <GridSection title="Nejvíce populární" productsFetch={getPopularProducts}/>
            <GridSection title="Nejnovější produkty" productsFetch={getProducts}/>
        </main>
    )
}

type GridSectionProps = {
    title: string
    productsFetch: () => Promise<Produkt[]>
}

function GridSection ({title, productsFetch}: GridSectionProps) {
    return (
        <div className="space-y-4">
            {/* Header for product section */}

            <div className="flex gap-4">
                <h2 className="text-3xl font-bold"> {title} </h2>
                <Button variant="ghost" size="sm" asChild>
                    <Link href="/produkty" className="space-x-2">
                        <span>Všechny produkty</span>
                        <ArrowRight className="size-4"/>
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Suspense fallback={
                    <>
                        <CardSkeleton/>
                        <CardSkeleton/>
                        <CardSkeleton/>
                    </>
                }>
                    <ProductSuspense productsFetch={productsFetch} />
                </Suspense>                 
            </div>
        </div>
    )
}

async function ProductSuspense({
    productsFetch, 
}: {  productsFetch: () => Promise<Produkt[]>

 }) {
    return (await productsFetch()).map(product => (
        <ProductCard key={product.id} {...product}/>
    ))
}