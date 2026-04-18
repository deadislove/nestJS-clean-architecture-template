import { GetUserUseCaseOutput } from "@application/interfaces/user";
import { Result } from "@domain/core/result";
import { User } from "@domain/entities/user.entity";
import { IUserRepository } from "@domain/repositories/user.repository";
import { plainToInstance } from "class-transformer";
import { Logger } from "@nestjs/common";

export class GetUserUseCase {

    private readonly logger = new Logger(GetUserUseCase.name)

    constructor(
        private readonly iUserRepository: IUserRepository,
    ) { }

    async execute(id: number = 0): Promise<Result<GetUserUseCaseOutput[]>> { // Change return type
        try {
            if (id === 0) {
                const getUsers: Result<User[]> = await this.iUserRepository.getUsers()

                if (getUsers.isSuccess) {
                    const users: User[] = getUsers.getValue()
                    const responseData: GetUserUseCaseOutput[] = plainToInstance(GetUserUseCaseOutput, users)
                    this.logger.log('Fetching users....')
                    return Result.ok(responseData); // Always return ok with data, let controller handle empty array for 204
                } else {
                    return Result.fail(getUsers.error || ['Unknown error fetching all users']);
                }
            }
            else {
                const getUserById: Result<User | null> = await this.iUserRepository.findUserbyId(id)

                if (getUserById.isSuccess) {
                    const userValue: User | null = getUserById.getValue()
                    if (userValue) {
                        const responseData: GetUserUseCaseOutput = plainToInstance(GetUserUseCaseOutput, userValue)
                        this.logger.log('Fetch user...')
                        return Result.ok([responseData]);
                    } else {
                        // User not found is a business outcome, not an error in the use case itself
                        return Result.fail([`User with ID ${id} not found`]); 
                    }
                } else {
                    return Result.fail(getUserById.error || [`Unknown error fetching user with ID ${id}`]);
                }
            }
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error'
            return Result.fail([message]);
        }
    }
}