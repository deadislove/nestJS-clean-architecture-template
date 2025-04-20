import { CreateProductUseCaseInput, GetProductUseCaseOutput } from "@application/interfaces/product";
import { Result } from "@domain/core/result";
import { Product } from "@domain/entities/product.entity";
import { IProductRepository } from "@domain/repositories/product.repository";
import { CoreResponse } from "@shared/core/response";
import { plainToInstance } from "class-transformer";

export class CreateProductUseCase {
    constructor(private readonly iProductRepository: IProductRepository) {}

    async execute(input: CreateProductUseCaseInput):Promise<CoreResponse<GetProductUseCaseOutput>> {
        try {
            let product: Product = new Product()
            Object.assign(product, input)
            const result: Result<Product> = await this.iProductRepository.createProduct(product)
            const responseData: GetProductUseCaseOutput = plainToInstance(GetProductUseCaseOutput, result.getValue())
            return CoreResponse.success(responseData)
        }
        catch(error) {
            return CoreResponse.fail([error.message])
        }
    }
}