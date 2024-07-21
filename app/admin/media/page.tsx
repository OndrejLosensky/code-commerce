import db from "@/db/db";
import { PageHeader } from "../_components/admin-page-nav";
import { Dice1 } from "lucide-react";
import Image from "next/image";

export default function MediaPage() {
    return (
        <div className="container mx-auto p-4">
            <PageHeader> Média </PageHeader>
            <p className="font-light italic pb-4"> Zde se nachází přehledný seznam všech obrázků a souborů od produktů </p>
            <MediaGallery />
        </div>
    );
}

async function MediaGallery() {
    const files = await db.produkt.findMany({
        select: {
            id: true,
            imagePath: true,
            filePath: true,
            name: true
        },
        orderBy: { id: "desc" }
    });

    if (files.length === 0) return <p className="pt-2 w-full border-t mt-2"> Nenašel jsem žádné soubory ani obrázky, pravděpodobně nemáš vytvořený žádný produkt </p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {files.map((file) => (
                <div className="space-y-2" key={file.id}>
                    {file.imagePath ? (
                        <Image src={file.imagePath} width={300} height={200} className="object-cover w-full h-48 rounded-lg" alt={file.name} />
                    ) : (
                        <div className="flex items-center justify-center w-full h-48 bg-gray-200 rounded-lg">
                            <Dice1 className="w-16 h-16 text-gray-400" />
                        </div>
                    )}
                    <p className="text-center text-sm font-medium">{file.name}</p>
                </div>
            ))}
        </div>
    );
}
