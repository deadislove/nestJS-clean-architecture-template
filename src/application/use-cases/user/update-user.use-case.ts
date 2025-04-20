import { GetUserUseCaseOutput, UpdatedUserUseCaseInput } from "@application/interfaces/user";
import { Result } from "@domain/core/result";
import { User } from "@domain/entities/user.entity";
import { IUserRepository } from "@domain/repositories/user.repository";
import { CoreResponse } from "@shared/core/response";
import { plainToInstance } from "class-transformer";

export class UpdateUserUseCase {
    constructor(
        private readonly iUserRepository: IUserRepository
    ){}

    async execute(input: UpdatedUserUseCaseInput) : Promise<CoreResponse<GetUserUseCaseOutput>> {
        try {
            let updatedUser: User = new User()
            Object.assign(updatedUser, input)
            const result: Result<User | null> = await this.iUserRepository.updateUser(updatedUser.id, updatedUser)

            if(result.isSuccess) {
                const user : User | null  = result.getValue()
                const responseData: GetUserUseCaseOutput = plainToInstance(GetUserUseCaseOutput, user)
                return CoreResponse.success(responseData)
            } else {
                return CoreResponse.fail([result.error ?? 'Unknown error'])
            }
        }
        catch(error) {
            return CoreResponse.fail([error.message])
        }
    }
}