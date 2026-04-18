import { IProductRepository } from "@domain/repositories/product.repository";
import { GetUserUseCase } from "../user";
import { GetUserUseCaseOutput } from "@application/interfaces/user"; // Import for GetUserUseCase return type
import { UserWithProductsOutput } from "@application/interfaces/product";
import { User } from "@domain/entities/user.entity";
import { Product } from "@domain/entities/product.entity";
import { Result } from "@domain/core/result";
import { plainToInstance } from "class-transformer";
import { ProductItem } from "@application/interfaces/product/UserWithProductsOutput.dto";

export class UserProductUseCase {
    constructor(
        //private readonly iUserReporsitory: IUserRepository, // optional
        private readonly getUserCase: GetUserUseCase,
        private readonly iProductRepository: IProductRepository
    ){}

    async executeUserWithProduct(id: number):Promise<Result<UserWithProductsOutput[]>> { // Change return type
        // GetUserUseCase.execute() returns Result<GetUserUseCaseOutput[]>
        const userResult: Result<GetUserUseCaseOutput[]> = await this.getUserCase.execute(id);

        if (userResult.isFailure) {
            return Result.fail(userResult.error || ['Failed to retrieve user(s)']);
        }

        const usersOutput = userResult.getValue();
        if (!usersOutput || usersOutput.length === 0) {
            return Result.ok([]); 
        }

        // Transform users to output model
        // Map GetUserUseCaseOutput to UserWithProductsOutput (which extends GetUserUseCaseOutput)
        const responseData: UserWithProductsOutput[] = usersOutput.map(user => plainToInstance(UserWithProductsOutput, user));

        const productResult: Result<Product[]> = await this.iProductRepository.getProducts();

            if (productResult.isSuccess) {
                const products = productResult.getValue()
        if (productResult.isSuccess) {
            const products = productResult.getValue();

            for (const userOutput of responseData) {
                const userProducts = products
                    .map(product => plainToInstance(ProductItem, product));
                    userOutput.products = userProducts
                }
            }
        }
        return Result.ok(responseData);
    }
}