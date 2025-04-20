import { Result } from "@domain/core/result"
import { Product } from "@domain/entities/product.entity"

export interface IProductRepository {
    getProducts() : Promise<Result<Product[]>>
    findProductById(id: number): Promise<Result<Product | null>>
    createProduct(data: Partial<Product>): Promise<Result<Product>>
    updateProduct(id:number, data: Partial<Product>): Promise<Result<Product | null>>
    deleteProduct(id:number): Promise<Result<boolean>>
}