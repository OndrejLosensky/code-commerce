import { Suspense } from "react";
import { CardSkeleton, ProductCard } from "../_components/product-card";
import db from "@/db/db";
import { cache } from "@/lib/cache";

const getAllProducts = cache(() => {
    return db.produkt.findMany({
         where: {isAvailable: true},
         orderBy: {name: "asc"},
    })
}, ["/produkty", "getAllProducts"])

export default function ProductsPage() {
    return (
        <>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Suspense fallback={
                    <>
                        <CardSkeleton/>
                        <CardSkeleton/>
                        <CardSkeleton/>
                        <CardSkeleton/>
                        <CardSkeleton/>
                        <CardSkeleton/>                        
                    </>
                }>
                    <ProductsSuspense/>
                </Suspense>                 
            </div>
        </>
    )
}

async function ProductsSuspense() {
    const products = await getAllProducts()
    return products.map(product => (
        <ProductCard  key={product.id} {...product}/>
    ))
}