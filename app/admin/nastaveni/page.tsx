import { PageHeader } from "../_components/admin-page-nav";

export default function SettingsAdminPage () {
    return (
        <div> 
            <PageHeader> Nastavení aplikace </PageHeader>
            <p className="font-light italic pb-4"> Zde bude možné nastavit maximální počet produktů, ceny, sklad apod. (V pozdější verzi) </p>
        </div>
    )
}