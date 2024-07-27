"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useFormState, useFormStatus } from "react-dom"

import { AddPage } from "../_actions/pages"

export function PageForm() {
    const action = AddPage
    const [styles, setStyles] = useState<string>("")

    return (
        <form action={action} className="space-y-8">
            <div className="space-y-2">
                <Label htmlFor="styles">TailwindCSS styly</Label>
                <Input
                    type="text"
                    id="styles"
                    name="styles"
                    value={styles}
                    onChange={(e) => setStyles(e.target.value)}
                    required
                />
            </div>
            <SaveButton />
        </form>
    )
}

function SaveButton() {
    const { pending } = useFormStatus()

    return <Button type="submit" disabled={pending}> {pending ? "Ukládám..." : "Uložit"} </Button>
}
