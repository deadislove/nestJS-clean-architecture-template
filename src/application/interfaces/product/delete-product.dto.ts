import { Expose } from "class-transformer"

export class DeleteProductUseCaseInput {
    @Expose()
    public id: number
}