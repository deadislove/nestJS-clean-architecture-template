import { CreateUserUseCaseInput, GetUserUseCaseOutput } from "@application/interfaces/user";
import { Result } from "@domain/core/result";
import { ResultAsync } from "@domain/core/resultAsync";
import { User } from "@domain/entities/user.entity";
import { IUserRepository } from "@domain/repositories/user.repository";
import { CoreResponse } from "@shared/core/response";
import { plainToClass, plainToInstance } from "class-transformer";

export class CreateUserUseCase {
    constructor(private readonly iUserRepository: IUserRepository) { }

    async execute(input: CreateUserUseCaseInput): Promise<CoreResponse<GetUserUseCaseOutput>> {
        try {
            let user:User = new User()
            Object.assign(user, input)
            //return (await this.iUserRepository.createUser(user)).getValue() // optional
            const result: Result<User> = await ResultAsync(this.iUserRepository.createUser(user).then(value => value.getValue()))
            const responseData:GetUserUseCaseOutput = plainToInstance(GetUserUseCaseOutput, result.getValue())
            return CoreResponse.success(responseData)
        } catch (error) {
            return CoreResponse.fail([error.message])
        }
    }
}