import { GetUserUseCaseOutput, UpdatedUserUseCaseInput } from "@application/interfaces/user";
import { Result } from "@domain/core/result";
import { User } from "@domain/entities/user.entity";
import { IUserRepository } from "@domain/repositories/user.repository";
import { plainToInstance } from "class-transformer";

export class UpdateUserUseCase {
    constructor(
        private readonly iUserRepository: IUserRepository
    ){}

    async execute(input: UpdatedUserUseCaseInput) : Promise<Result<GetUserUseCaseOutput>> { // Change return type
        try {
            let updatedUser: User = new User()
            Object.assign(updatedUser, input)
            const result: Result<User | null> = await this.iUserRepository.updateUser(updatedUser.id, updatedUser)

            if(result.isSuccess) {
                const user: User | null = result.getValue();
                if (user) {
                    const responseData: GetUserUseCaseOutput = plainToInstance(GetUserUseCaseOutput, user);
                    return Result.ok(responseData);
                } else {
                    return Result.fail([`User with ID ${input.id} not found for update`]);
                }
            } else {
                return Result.fail(result.error || ['Unknown error during user update']);
            }
        }
        catch(error) {
            const message = error instanceof Error ? error.message : 'Unknown error'
            return Result.fail([message || 'An unexpected error occurred during user update']);
        }
    }
}