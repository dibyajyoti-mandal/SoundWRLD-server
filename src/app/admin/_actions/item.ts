"use server"

import db from "@/db/db"
import { z } from "zod"
import fs from "fs/promises"
import { notFound, redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

const fileSchema = z.object({
  name: z.string(),
  type: z.string(),
  size: z.number(),
  lastModified: z.number(),
})

const imageSchema = fileSchema.refine(
  file => file.size === 0 || file.type.startsWith("image/"),
  "Must be an image file"
)

const addSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  priceInCents: z.coerce.number().int().min(1),
  file: fileSchema.refine(file => file.size > 0, "Required"),
  image: imageSchema.refine(file => file.size > 0, "Required"),
})

export async function addItem(prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    priceInCents: formData.get('priceInCents'),
    file: formData.get('file'),
    image: formData.get('image'),
  })

  if (result.success === false) {
    return result.error.formErrors.fieldErrors
  }

  const data = result.data

  await fs.mkdir("products", { recursive: true })
  const filePath = `products/${crypto.randomUUID()}-${data.file.name}`
  await fs.writeFile(filePath, Buffer.from(await (data.file as any).arrayBuffer()))

  await fs.mkdir("public/products", { recursive: true })
  const img = `/products/${crypto.randomUUID()}-${data.image.name}`
  await fs.writeFile(
    `public${img}`,
    Buffer.from(await (data.image as any).arrayBuffer())
  )

  await db.product.create({
    data: {
      title: data.name,
      desc: data.description,
      filePath,
      img,
      price: data.priceInCents,
    },
  })

  revalidatePath("/")
  revalidatePath("/products")

  redirect("/admin/products")
}