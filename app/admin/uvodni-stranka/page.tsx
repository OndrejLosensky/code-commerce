import db from "@/db/db";
import { PageHeader } from "../_components/admin-page-nav";
import { PageForm } from "../_components/pageForm";


const getStyles = async () => {
    return db.homepage.findMany(); 
}


export default async function LandingPage() {    
    const currentStyles = await getStyles(); 

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
                
            <div className="grid grid-cols-1 gap-4 mt-8">
                <button className="p-4 border border-gray-300 rounded">Layout 1</button>
                <button className="p-4 border border-gray-300 rounded">Layout 2</button>
                <button className="p-4 border border-gray-300 rounded">Layout 3</button>
            </div>
        </>
    );
}
