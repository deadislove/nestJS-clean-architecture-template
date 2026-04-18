import { DeleteProductUseCaseInput } from "@application/interfaces/product";
import { Result } from "@domain/core/result";
import { IProductRepository } from "@domain/repositories/product.repository";

export class DeleteProductUseCase {
    constructor(
        private readonly iProductRepository: IProductRepository
    ){}

    async execute(input: DeleteProductUseCaseInput) : Promise<Result<boolean>> { // Change return type
        try {
            const id: number = input.id
            const result: Result<boolean> = await this.iProductRepository.deleteProduct(id)

            if(result.isSuccess) {
                return Result.ok(result.getValue());
            } else {
                return Result.fail(result.error || [`Unknown error deleting product with ID ${id}`]);
            }
        }
        catch(error) {
            const message = error instanceof Error ? error.message : 'Unknown error'
            return Result.fail([message || 'An unexpected error occurred during product deletion']);
        }
    }
}