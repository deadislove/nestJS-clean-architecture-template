import { DeleteUserUseCaseInput } from "@application/interfaces/user";
import { Result } from "@domain/core/result";
import { IUserRepository } from "@domain/repositories/user.repository";

export class DeleteUserUseCase {
    constructor(
        private readonly iUserRepository: IUserRepository
    ){}

    async execute(input: DeleteUserUseCaseInput) : Promise<Result<boolean>> { // Change return type

        try {
            const id:number = input.id
            const result:Result<boolean> = await this.iUserRepository.deleteUser(id)

            if(result.isSuccess) {
                return Result.ok(result.getValue());
            } else {
                return Result.fail(result.error || [`Unknown error deleting user with ID ${id}`]);
            }
        }
        catch(error) {
            const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred during user deletion';
            return Result.fail([errorMessage]);
        }
    }
}