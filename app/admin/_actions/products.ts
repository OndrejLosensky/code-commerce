"use server"

import db from "@/db/db"
import { z } from "zod"
import fs from "fs/promises"
import { redirect } from "next/navigation"

// Define schema for file validation
const fileSchema = z.instanceof(File, { message: "Povinné" }).refine(
    file => file.size > 0,
    { message: "File is required" }
)

const imageSchema = z.instanceof(File, { message: "Povinné" }).refine(
    file => file.size > 0 && file.type.startsWith("image/"),
    { message: "Image file is required and must be an image" }
)

// Define schema for the form data
const addSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    priceInCents: z.number().int().min(1, "Price must be a positive integer"),
    file: fileSchema,
    image: imageSchema
})

// Define type for the form data
type FormDataEntries = {
    name: string;
    description: string;
    priceInCents: number;
    file: File;
    image: File;
}

export async function AddProduct(formData: FormData): Promise<{ errors?: Record<string, string[]> }> {
    try {
        // Initialize an object with the correct types
        const data: Partial<FormDataEntries> = {};

        // Populate the data object with explicit keys and types
        formData.forEach((value, key) => {
            switch (key) {
                case 'name':
                    data.name = value as string;
                    break;
                case 'description':
                    data.description = value as string;
                    break;
                case 'priceInCents':
                    // Ensure priceInCents is parsed as a number
                    const price = Number(value);
                    if (!isNaN(price)) {
                        data.priceInCents = price;
                    }
                    break;
                case 'file':
                    data.file = value as File;
                    break;
                case 'image':
                    data.image = value as File;
                    break;
                default:
                    break;
            }
        });

        // Log the parsed data to inspect
        console.log("Parsed FormData:", data);

        // Check if priceInCents was correctly converted
        if (data.priceInCents === undefined || isNaN(data.priceInCents)) {
            console.error("priceInCents is invalid:", data.priceInCents);
            return { errors: { priceInCents: ["Required"] } };
        }

        // Parse and validate form data
        const result = addSchema.safeParse(data);

        if (!result.success) {
            // Return validation errors
            const errors = result.error.formErrors.fieldErrors;
            console.error("Validation errors:", errors);
            return { errors };
        }

        const validatedData = result.data;
        console.log("Validated data:", validatedData);

        // Ensure directories exist
        await fs.mkdir("produkty", { recursive: true });
        const filePath = `produkty/${crypto.randomUUID()}-${validatedData.file.name}`;
        await fs.writeFile(filePath, Buffer.from(await validatedData.file.arrayBuffer()));
        console.log("File saved to:", filePath);

        await fs.mkdir("public/produkty", { recursive: true });
        const imagePath = `/produkty/${crypto.randomUUID()}-${validatedData.image.name}`;
        await fs.writeFile(`public${imagePath}`, Buffer.from(await validatedData.image.arrayBuffer()));
        console.log("Image saved to:", imagePath);

        // Save product to the database
        await db.produkt.create({
            data: {
                name: validatedData.name,
                description: validatedData.description,
                priceInCents: validatedData.priceInCents,
                filePath,
                imagePath,
            },
        });

        console.log("Product added to the database");

        redirect("/admin/produkty");

        return {};

    } catch (error) {
        console.error("Error adding product:", error);
        return { errors: { general: ["An error occurred while adding the product."] } };
    }
}
