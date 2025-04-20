export class UpdateProductRequestModel {
    id: number
    name: string
    description: string | null
    price: number
    stock: number
    category: string | null
    isActive: boolean
    createdAt?: Date
    updatedAt?: Date
}