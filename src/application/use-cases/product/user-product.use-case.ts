import { IProductRepository } from "@domain/repositories/product.repository";
import { GetUserUseCase } from "../user";
import { CoreResponse } from "@shared/core/response";
import { UserWithProductsOutput } from "@application/interfaces/product";
import { User } from "@domain/entities/user.entity";
import { Product } from "@domain/entities/product.entity";
import { Result } from "@domain/core/result";
import { plainToInstance } from "class-transformer";
import { ProductItem } from "@application/interfaces/product/UserWithProductsOutput.dto";

export class UserPorductUseCase {
    constructor(
        //private readonly iUserReporsitory: IUserRepository, // optional
        private readonly getUserCase: GetUserUseCase,
        private readonly iProductRepository: IProductRepository
    ){}

    async executeUserWithProduct(id: number):Promise<CoreResponse<UserWithProductsOutput[]>> {
        const userResponse: CoreResponse<User[]> = await this.getUserCase.execute(id)

        if (userResponse.data) {
            const users = userResponse.data

            // Transform users to output model
            const responseData: UserWithProductsOutput[] = plainToInstance(UserWithProductsOutput, users)

            const productResult: Result<Product[]> = await this.iProductRepository.getProducts()

            if (productResult.isSuccess) {
                const products = productResult.getValue()

                for (const userOutput of responseData) {
                    const userProducts = products
                        //.filter(product => product.id === userOutput.userId) 
                        .map(product => plainToInstance(ProductItem, product))

                    userOutput.products = userProducts
                }

                return CoreResponse.success(responseData)
            } else {
                return CoreResponse.success(responseData) // return user info even if no product
            }
        } else if (userResponse.errors.length > 0) {
            return CoreResponse.fail(userResponse.errors)
        } else {
            return CoreResponse.empty(204)
        }
    }
}