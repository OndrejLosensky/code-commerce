import { PageHeader } from "../../_components/admin-page-nav";
import { ProductsForm } from "../../_components/productsForm";

export default function NewProduct () {
    return (
        <>
            <PageHeader> Přidat nový produkt </PageHeader>
            <ProductsForm/>
        </>
    )
}