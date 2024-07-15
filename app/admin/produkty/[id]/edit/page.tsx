import { PageHeader } from "@/app/admin/_components/admin-page-nav";
import { ProductsForm } from "@/app/admin/_components/productsForm";
import db from "@/db/db";

export default async function EditProduct ({params: { id}}: { params: {id:string}}) {
    const product = await db.produkt.findUnique({where: { id }})

    return (
        <>
            <PageHeader>  Editovat produkt </PageHeader>
            <ProductsForm product={product}/>
        </>
    )
}