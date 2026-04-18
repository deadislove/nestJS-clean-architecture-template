import { CreateUserUseCaseInput, GetUserUseCaseOutput } from "@application/interfaces/user";
import { Result } from "@domain/core/result";
import { ResultAsync } from "@domain/core/resultAsync";
import { User } from "@domain/entities/user.entity";
import { IUserRepository } from "@domain/repositories/user.repository";
import { plainToClass, plainToInstance } from "class-transformer";

export class CreateUserUseCase {
    constructor(private readonly iUserRepository: IUserRepository) { }

    async execute(input: CreateUserUseCaseInput): Promise<Result<GetUserUseCaseOutput>> {
        try {
            let user:User = new User()
            Object.assign(user, input)

            const result: Result<User> = await ResultAsync(this.iUserRepository.createUser(user).then(value => value.getValue()))
            const responseData:GetUserUseCaseOutput = plainToInstance(GetUserUseCaseOutput, result.getValue())
            return Result.ok(responseData)
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error'
            return Result.fail([message])
        }
    }
}