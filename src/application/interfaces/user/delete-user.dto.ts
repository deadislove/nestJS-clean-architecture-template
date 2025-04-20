import { Expose } from "class-transformer"

export class DeleteUserUseCaseInput {
    @Expose()
    public id: number
}