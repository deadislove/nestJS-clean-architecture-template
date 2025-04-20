import { Expose } from "class-transformer"

export class UpdatedUserUseCaseInput {
    @Expose()
    public id: number
    @Expose()
    public name: string
    @Expose()
    public email: string
}