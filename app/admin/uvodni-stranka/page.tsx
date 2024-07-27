
import db from "@/db/db";
import { PageHeader } from "../_components/admin-page-nav";
import { PageForm } from "../_components/pageForm";

const getStyles = async () => {
    return db.homepage.findMany(); 
}

export default async function LandingPage() {    
    const currentStyles = await getStyles(); // Fetch all homepage records

    return (
        <>
            <PageHeader>Úvodní stránka</PageHeader>
            <p className="font-light italic pb-4">Rychlé a přehledné úpravy úvodní stránky</p>
            <PageForm/>
            <br />
            {currentStyles.map(style => (
                        <div key={style.id} className="p-4 border border-gray-200 rounded">
                            <h3 className="text-xl font-semibold">{style.styles}</h3>
                        </div>
                    ))}
        </>
    );
}
