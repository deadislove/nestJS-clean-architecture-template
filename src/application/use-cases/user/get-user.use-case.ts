import { GetUserUseCaseOutput } from "@application/interfaces/user";
import { Result } from "@domain/core/result";
import { User } from "@domain/entities/user.entity";
import { IUserRepository } from "@domain/repositories/user.repository";
import { CoreResponse } from "@shared/core/response";
import { plainToInstance } from "class-transformer";

export class GetUserUseCase {
    constructor(
        private readonly iUserRepository: IUserRepository,
    ) { }

    async execute(id: number = 0): Promise<CoreResponse<GetUserUseCaseOutput[]>> {
        try {
            if (id === 0) {
                const getUsers: Result<User[]> = await this.iUserRepository.getUsers()

                if (getUsers.isSuccess) {
                    const users: User[] = getUsers.getValue()
                    const responseData: GetUserUseCaseOutput[] = plainToInstance(GetUserUseCaseOutput, users)

                    return users.length > 0 ? CoreResponse.success(responseData) : CoreResponse.empty(204)
                } else {
                    return CoreResponse.fail([getUsers.error ?? 'Unknown error']);
                }
            }
            else {
                const getUserById: Result<User | null> = await this.iUserRepository.findUserbyId(id)

                if (getUserById.isSuccess) {
                    const userValue: User | null = getUserById.getValue()
                    if (userValue) {
                        const responseData: GetUserUseCaseOutput = plainToInstance(GetUserUseCaseOutput, userValue)
                        return CoreResponse.success([responseData])
                    } else {
                        return CoreResponse.empty(204)
                    }
                } else {
                    return CoreResponse.empty(204)
                }
            }
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error'
            return CoreResponse.fail([message])

        }
    }
}