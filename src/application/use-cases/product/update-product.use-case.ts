import { GetProductUseCaseOutput, UpdatedProductUseCaseInput } from "@application/interfaces/product";
import { Result } from "@domain/core/result";
import { Product } from "@domain/entities/product.entity";
import { IProductRepository } from "@domain/repositories/product.repository";
import { plainToInstance } from "class-transformer";

export class UpdateProductUseCase {
    constructor(
        private readonly iProductRepository: IProductRepository
    ){}

    async execute(input: UpdatedProductUseCaseInput) : Promise<Result<GetProductUseCaseOutput>> { // Change return type
        try {
            let updatedProduct: Product = new Product()
            Object.assign(updatedProduct, input)
            const result: Result<Product | null> = await this.iProductRepository.updateProduct(updatedProduct.id, updatedProduct)
            
            if(result.isSuccess) {
                const checkResult: Result<Product | null> = await this.iProductRepository.findProductById(updatedProduct.id)
                const product: Product | null = checkResult.getValue();
                if (product) {
                    const responseData: GetProductUseCaseOutput = plainToInstance(GetProductUseCaseOutput, product);
                    return Result.ok(responseData);
                } else {
                    return Result.fail([`Product with name ${input.name} not found after update`]);
                }
            }
            else {
                return Result.fail(result.error || ['Unknown error during product update']);
            }
        }
         catch(error) {
            const message = error instanceof Error ? error.message : 'Unknown error'
            return Result.fail([message || 'An unexpected error occurred during product update']);
         }
    }
}