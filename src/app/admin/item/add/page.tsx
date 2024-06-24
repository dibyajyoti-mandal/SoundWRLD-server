"use client"

import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { addItem } from "../../_actions/item"

export default function AddItemPage() {
    return (
        <>
            <div className="w-full md:w-[800px]">
                <div className="flex justify-between items-center gap-4">
                    <span className="md:text-lg">Add new item:</span>

                </div>
                <div className="mt-4"><ProductForm /></div>

            </div>
        </>
    )
}


function ProductForm() {
    const [price, setPrice] = useState<number>();


    return (
        <>
            <form className="space-y-8" action={addItem}>
                <div className="space-y-1">
                    <Label htmlFor="name"  >Enter item name: </Label>
                    <Input type="text" id="name" name="name" required placeholder="Name" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="price"  >Enter item price: </Label>
                    <Input type="number" id="price" name="price" required placeholder="Price" 
                    value={price}
                    onChange={e=>setPrice(Number(e.target.value)||undefined)}
                    />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="description"  >Enter item description: </Label>
                    <Input type="text" id="description" name="description" required placeholder="Description" />
                </div>
                    
                <div className="space-y-1">
                    <Label htmlFor="file"  >Choose file: </Label>
                    <Input type="file" id="file" name="file" required placeholder="Description" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="image"  >Choose cover image: </Label>
                    <Input type="file" id="image" name="image" required placeholder="Description" />
                </div>
                <button className="buttons" type="submit">Add</button>
            </form>
        </>
    )
}