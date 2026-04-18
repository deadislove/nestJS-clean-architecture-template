import { CreateProductUseCaseInput, GetProductUseCaseOutput } from "@application/interfaces/product";
import { Result } from "@domain/core/result";
import { Product } from "@domain/entities/product.entity";
import { IProductRepository } from "@domain/repositories/product.repository";
import { plainToInstance } from "class-transformer";

export class CreateProductUseCase {
    constructor(private readonly iProductRepository: IProductRepository) {}

    async execute(input: CreateProductUseCaseInput):Promise<Result<GetProductUseCaseOutput>> {
        try {
            let product: Product = new Product()
            Object.assign(product, input)
            const result: Result<Product> = await this.iProductRepository.createProduct(product)
            const responseData: GetProductUseCaseOutput = plainToInstance(GetProductUseCaseOutput, result.getValue())
            return Result.ok(responseData)
        }
        catch(error: unknown) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            return Result.fail([errorMessage])
        }
    }
}