import { Module } from "@nestjs/common";
import { UserController } from "../controllers/user.controller";
import { UserRepository } from "@infra/persistence/typeorm/repositories/user.repository.iml";
import { DatabaseModule } from "@infra/database/database.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserTypeOrmEntity } from "@infra/persistence/typeorm/entities/user.typeorm.entity";
import { CreateUserUseCase, DeleteUserUseCase, GetUserUseCase, UpdateUserUseCase } from "@application/use-cases/user";

@Module({
    imports: [
        DatabaseModule,
        TypeOrmModule.forFeature([UserTypeOrmEntity])
    ],
    controllers: [UserController],
    providers: [
        {
            provide: 'UserRepository',
            useClass: UserRepository
        }, 
        {
            provide: CreateUserUseCase,
            useFactory: (userRepo: UserRepository) => new CreateUserUseCase(userRepo),
            inject: ['UserRepository']
        },
        {
            provide: GetUserUseCase,
            useFactory: (userRepo: UserRepository) => new GetUserUseCase(userRepo),
            inject: ['UserRepository']
        },
        {
            provide: UpdateUserUseCase,
            useFactory: (userRepo: UserRepository) => new UpdateUserUseCase(userRepo),
            inject: ['UserRepository']
        },
        {
            provide: DeleteUserUseCase,
            useFactory: (userRepo: UserRepository) => new DeleteUserUseCase(userRepo),
            inject: ['UserRepository']
        },
    ],
    exports: [
        'UserRepository',
        GetUserUseCase
    ]
})
export class UserModule{}