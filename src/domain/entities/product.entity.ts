import { Expose } from "class-transformer"

export class Product {
    @Expose()
    public readonly id: number
    @Expose()
    name: string
    @Expose()
    description: string | null
    @Expose()
    price: number
    @Expose()
    stock: number
    @Expose()
    category: string | null
    @Expose()
    isActive: boolean
    @Expose()
    createdAt?: Date
    @Expose()
    updatedAt?: Date
}