import { GetProductUseCaseOutput } from "@application/interfaces/product";
import { Result } from "@domain/core/result";
import { Product } from "@domain/entities/product.entity";
import { IProductRepository } from "@domain/repositories/product.repository";
import { CoreResponse } from "@shared/core/response";
import { plainToInstance } from "class-transformer";

export class GetProductUseCase {
    constructor(
        private readonly iProductRepository: IProductRepository
    ){}

    async execute(id:number = 0): Promise<CoreResponse<GetProductUseCaseOutput[]>> {
        try {
            if(id === 0) {
                const getProducts: Result<Product[]> = await this.iProductRepository.getProducts()

                if(getProducts.isSuccess) {
                    const products: Product[] = getProducts.getValue()
                    const responseData: GetProductUseCaseOutput[] = plainToInstance(GetProductUseCaseOutput, products)

                    return products.length > 0 ? CoreResponse.success(responseData) : CoreResponse.empty(204)
                } else {
                    return CoreResponse.fail([getProducts.error ?? 'Unknown error'])
                }
            }
            else {
                const getProduct: Result<Product | null> = await this.iProductRepository.findProductById(id)
                
                if(getProduct.isSuccess) {
                    const productValue: Product | null = getProduct.getValue()
                    if(productValue) {
                        const responseData: GetProductUseCaseOutput = plainToInstance(GetProductUseCaseOutput, productValue)
                        return CoreResponse.success([responseData])
                    } else {
                        return CoreResponse.empty(204)
                    }
                } else {
                    return CoreResponse.empty(204)
                }
            }
        }
        catch(error){
            const message = error instanceof Error ? error.message : 'Unknow error'
            return CoreResponse.fail([message])
        }
    }
}