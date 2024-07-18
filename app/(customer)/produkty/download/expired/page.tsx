import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Expired(){
    return (
        <div className="max-h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold pb-4 text-center"> Váš odkaz na stažení vypršel </h1>
            <Button asChild size="lg">
                <Link href="/objednavky"> Získat nový odkaz </Link>
            </Button>
        </div>
    )
}