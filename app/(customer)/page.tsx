import { Button } from "@/components/ui/button";
import db from "@/db/db";
import { Produkt } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CardSkeleton, ProductCard } from "./_components/product-card";
import { Suspense } from "react";
import { cache } from "@/lib/cache";

const getProducts = cache(() => {
    return db.produkt.findMany({
        where: { isAvailable: true },
        orderBy: { orders: { _count: "desc" } },
        take: 10,
    });
}, ["/", "getProducts"]);

const getPopularProducts = cache(() => {
    return db.produkt.findMany({
        where: { isAvailable: true },
        orderBy: { createdAt: "desc" },
        take: 5,
    });
}, ["/", "getPopularProducts"], { revalidate: 60 * 60 * 24 });

const getHomepageStyles = async () => {
    const homepageRecord = await db.homepage.findFirst();
    return homepageRecord ? homepageRecord.styles.trim() : '';
}

const layoutOptions = {
    1: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    2: 'grid-cols-1 md:grid-cols-4 lg:grid-cols-5',
    3: 'grid-cols-2',
};

export default async function HomePage() {
    const homepageStyles = await getHomepageStyles();
    const selectedLayout = 1;

    return (
        <main className={`space-y-12 ${homepageStyles}`}>
            <GridSection title="Nejvíce populární" productsFetch={getPopularProducts} layout={layoutOptions[selectedLayout]} />
            <GridSection title="Nejnovější produkty" productsFetch={getProducts} layout={layoutOptions[selectedLayout]} />
        </main>
    );
}

type GridSectionProps = {
    title: string;
    productsFetch: () => Promise<Produkt[]>;
    layout: string;
}

async function GridSection({ title, productsFetch, layout }: GridSectionProps) {
    return (
        <div className="space-y-4">
            <div className="flex gap-4">
                <h2 className="text-3xl font-bold">{title}</h2>
                <Button variant="ghost" size="sm" asChild>
                    <Link href="/produkty" className="space-x-2">
                        <span>Všechny produkty</span>
                        <ArrowRight className="size-4" />
                    </Link>
                </Button>
            </div>
            <div className={`grid gap-4 ${layout}`}>
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
    );
}

async function ProductSuspense({
    productsFetch,
}: { productsFetch: () => Promise<Produkt[]> }) {
    const products = await productsFetch();
    return (
        <>
            {products.map(product => (
                <ProductCard key={product.id} {...product} />
            ))}
        </>
    );
}
