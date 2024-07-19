import { PageHeader } from "../_components/admin-page-nav";

export default function LandingPage(){
    return (
        <>
            <PageHeader> Úvodní stránka </PageHeader>
            <p> Zde (ne)lze editovat vzhled úvodní stránky </p>
            <p className="font-light italic"> brzy bude možnost generování jednotlivých sekcí </p>
        </>
    )
}