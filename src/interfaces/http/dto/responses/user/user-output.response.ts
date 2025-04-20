import { Expose } from "class-transformer"

export class GetUserOutputResponseModel {
    @Expose()
    public readonly id: number
    @Expose()
    public name:string
    @Expose()
    public email: string
}