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
        where: { isAvailable: true }, 
        orderBy: { orders: { _count: "desc" } },
        take: 6
    })
}, ["/", "getProducts"])

const getPopularProducts = cache(() => {
    return db.produkt.findMany({
        where: { isAvailable: true }, 
        orderBy: { createdAt: "desc" },
        take: 3
    })
}, ["/", "getPopularProducts"], { revalidate: 60 * 60 * 24 })

const getHomepageStyles = async () => {
    const homepageRecord = await db.homepage.findFirst()
    return homepageRecord ? homepageRecord.styles.trim() : '' 
}

export default async function HomePage() {
    return (
        <main className="space-y-12">
            <GridSection title="Nejvíce populární" productsFetch={getPopularProducts} />
            <GridSection title="Nejnovější produkty" productsFetch={getProducts} />
        </main>
    )
}

type GridSectionProps = {
    title: string
    productsFetch: () => Promise<Produkt[]>
}

async function GridSection({ title, productsFetch }: GridSectionProps) {
    const homepageStyles = await getHomepageStyles()
    const sanitizedStyles = homepageStyles
        .split(/\s+/)         // Split by whitespace
        .map(cls => cls.trim()) // Trim each class
        .filter(cls => cls)    // Remove empty classes
        .join(' ')             // Join back with single space
    console.log('Fetched Styles:', sanitizedStyles);

    return (
        <div className="space-y-4">
            <div className="flex gap-4">
                <h2 className="text-3xl font-bold"> {title} </h2>
                <Button variant="ghost" size="sm" asChild>
                    <Link href="/produkty" className="space-x-2">
                        <span>Všechny produkty</span>
                        <ArrowRight className="size-4" />
                    </Link>
                </Button>
            </div>
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${sanitizedStyles} `}>
                <Suspense fallback={
                    <>
                        <CardSkeleton />
                        <CardSkeleton />
                        <CardSkeleton />
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
}: { productsFetch: () => Promise<Produkt[]> }) {
    const products = await productsFetch()
    return (
        <>
            {products.map(product => (
                <ProductCard key={product.id} {...product} />
            ))}
        </>
    )
}
