import db from "@/db/db";
import { NextResponse, NextRequest } from "next/server";
import fs from "fs/promises"

export async function GET(req: NextRequest, {params: { downloadVerificationId }}:{ params: {downloadVerificationId: string}}) {
    const data = await db.downloadControl.findUnique({
        where: { id: downloadVerificationId, expiresAt: { gt: new Date()}},
        select: { produkt: { select: { filePath: true, name: true}}}
    })
    
    if (data == null) {
        return NextResponse.redirect(new URL("/produkty/download/expired", req.url))
    }
    
    const { size } = await fs.stat(data.produkt.filePath)
    const file = await fs.readFile(data.produkt.filePath)
    const extension = data.produkt.filePath.split(".").pop()

    return new NextResponse(file, { headers: {
        "Content-Disposition": `attachment; filename="${data.produkt.name}.${extension}"`,
        "Content-Length": size.toString(),
    }})
}