import { Expose } from "class-transformer"

export class CreateUserResponseModel {
    @Expose()
    public readonly id: number
    @Expose()
    public name:string
    @Expose()
    public email: string
}