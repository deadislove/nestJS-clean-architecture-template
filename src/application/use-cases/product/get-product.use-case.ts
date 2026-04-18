import { GetProductUseCaseOutput } from "@application/interfaces/product";
import { Result } from "@domain/core/result";
import { Product } from "@domain/entities/product.entity";
import { IProductRepository } from "@domain/repositories/product.repository";
import { plainToInstance } from "class-transformer";

export class GetProductUseCase {
    constructor(
        private readonly iProductRepository: IProductRepository
    ){}

    async execute(id:number = 0): Promise<Result<GetProductUseCaseOutput[]>> { // Change return type
        try {
            if(id === 0) {
                const getProducts: Result<Product[]> = await this.iProductRepository.getProducts()

                if(getProducts.isSuccess) {
                    const products: Product[] = getProducts.getValue()
                    const responseData: GetProductUseCaseOutput[] = plainToInstance(GetProductUseCaseOutput, products)
                    return Result.ok(responseData); // Always return ok with data, let controller handle empty array for 204
                } else {
                    return Result.fail(getProducts.error || ['Unknown error fetching all products']);
                }
            }
            else {
                const getProduct: Result<Product | null> = await this.iProductRepository.findProductById(id)
                
                if(getProduct.isSuccess) {
                    const productValue: Product | null = getProduct.getValue()
                    if(productValue) {
                        const responseData: GetProductUseCaseOutput = plainToInstance(GetProductUseCaseOutput, productValue)
                        return Result.ok([responseData]);
                    } else {
                        // Product not found is a business outcome, not an error in the use case itself
                        return Result.fail([`Product with ID ${id} not found`]);
                    }
                } else {
                    return Result.fail(getProduct.error || [`Unknown error fetching product with ID ${id}`]);
                }
            }
        }
        catch(error){
            const message = error instanceof Error ? error.message : 'Unknow error'
            return Result.fail([message]);
        }
    }
}