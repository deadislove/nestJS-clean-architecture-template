export class UserWithProductsResponseModel {
    userId: number
    name: string
    email: string
    products: ProductItem[]
}

export class ProductItem {
    id: number
    name: string
    price: number
}