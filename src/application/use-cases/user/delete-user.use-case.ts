import { DeleteUserUseCaseInput } from "@application/interfaces/user";
import { Result } from "@domain/core/result";
import { IUserRepository } from "@domain/repositories/user.repository";
import { CoreResponse } from "@shared/core/response";

export class DeleteUserUseCase {
    constructor(
        private readonly iUserRepository: IUserRepository
    ){}

    async execute(input: DeleteUserUseCaseInput) : Promise<CoreResponse<boolean>> {

        try {
            const id:number = input.id
            const result:Result<boolean> = await this.iUserRepository.deleteUser(id)

            if(result.isSuccess) {
                return CoreResponse.success(result.getValue())
            } else {
                return CoreResponse.fail([result.error ?? 'Unknown error'])
            }
        }
        catch(error) {
            return CoreResponse.fail([error.message])
        }
    }
}