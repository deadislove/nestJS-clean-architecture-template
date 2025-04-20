import { GetProductUseCaseOutput, UpdatedProductUseCaseInput } from "@application/interfaces/product";
import { Result } from "@domain/core/result";
import { Product } from "@domain/entities/product.entity";
import { IProductRepository } from "@domain/repositories/product.repository";
import { CoreResponse } from "@shared/core/response";
import { plainToInstance } from "class-transformer";

export class UpdateProductUseCase {
    constructor(
        private readonly iProductRepository: IProductRepository
    ){}

    async execute(input: UpdatedProductUseCaseInput) : Promise<CoreResponse<GetProductUseCaseOutput>> {
        try {
            let updatedProduct: Product = new Product()
            Object.assign(updatedProduct, input)
            const result: Result<Product | null> = await this.iProductRepository.updateProduct(updatedProduct.id, updatedProduct)
            

            if(result.isSuccess) {
                const checkResult: Result<Product | null> = await this.iProductRepository.findProductById(updatedProduct.id)
                const product: Product | null = checkResult.getValue()
                const responseData: GetProductUseCaseOutput = plainToInstance(GetProductUseCaseOutput, product)
                return CoreResponse.success(responseData)
            }
            else {
                return CoreResponse.fail([result.error ?? 'Unknown error'])
            }
        }
         catch(error) {
            return CoreResponse.fail([error.message])
         }
    }
}