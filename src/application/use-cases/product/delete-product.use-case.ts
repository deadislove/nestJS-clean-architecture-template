import { DeleteProductUseCaseInput } from "@application/interfaces/product";
import { Result } from "@domain/core/result";
import { IProductRepository } from "@domain/repositories/product.repository";
import { CoreResponse } from "@shared/core/response";

export class DeleteProductUseCase {
    constructor(
        private readonly iProductRepository: IProductRepository
    ){}

    async execute(input: DeleteProductUseCaseInput) : Promise<CoreResponse<boolean>> {
        try {
            const id: number = input.id
            const result: Result<boolean> = await this.iProductRepository.deleteProduct(id)

            if(result.isSuccess) {
                return CoreResponse.success(result.getValue())
            } else {
                return CoreResponse.fail([ result.error ?? 'Unknown error'])
            }
        }
        catch(error) {
            return CoreResponse.fail([error.message])
        }
    }
}