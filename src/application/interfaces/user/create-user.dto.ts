import { Expose } from "class-transformer"

export class CreateUserUseCaseInput {
    @Expose()
    public name: string
    @Expose()
    public email: string
}