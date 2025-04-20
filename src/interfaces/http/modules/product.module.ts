import { CreateProductUseCase, DeleteProductUseCase, GetProductUseCase, UpdateProductUseCase, UserPorductUseCase } from "@application/use-cases/product";
import { DatabaseModule } from "@infra/database/database.module";
import { ProductTypeOrmEntity } from "@infra/persistence/typeorm/entities";
import { ProductRepository } from "@infra/persistence/typeorm/repositories/product.repository.iml";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductController } from "../controllers/product.controller";
import { UserModule } from "./user.module";
import { GetUserUseCase } from "@application/use-cases/user";

@Module({
    imports: [
        DatabaseModule,
        TypeOrmModule.forFeature([
            ProductTypeOrmEntity
        ]),
        UserModule
    ],
    controllers: [ProductController],
    providers: [
        {
            provide: 'ProductRepository',
            useClass: ProductRepository
        },
        {
            provide: CreateProductUseCase,
            useFactory: (productRepo: ProductRepository) => new CreateProductUseCase(productRepo),
            inject: ['ProductRepository']
        },
        {
            provide: GetProductUseCase,
            useFactory: (productrepo: ProductRepository) => new GetProductUseCase(productrepo),
            inject: ['ProductRepository']
        },
        {
            provide: UpdateProductUseCase,
            useFactory: (productrepo: ProductRepository) => new UpdateProductUseCase(productrepo),
            inject: ['ProductRepository']
        },
        {
            provide: DeleteProductUseCase,
            useFactory: (productrepo: ProductRepository) => new DeleteProductUseCase(productrepo),
            inject: ['ProductRepository']
        },
        {
            provide: UserPorductUseCase,
            useFactory: (getUserCase: GetUserUseCase, productrepo: ProductRepository) => new UserPorductUseCase(getUserCase, productrepo),
            inject: [
                GetUserUseCase,
                'ProductRepository'
            ]
        },
    ]
})
export class ProductModule{}