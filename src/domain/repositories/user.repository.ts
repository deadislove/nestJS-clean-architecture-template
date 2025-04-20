import { Result } from "@domain/core/result";
import { User } from "@domain/entities/user.entity";

export interface IUserRepository {
    getUsers(): Promise<Result<User[]>>
    findUserbyId(id:number): Promise<Result<User | null>>
    createUser(data: Partial<User>): Promise<Result<User>>
    updateUser(id:number, data: Partial<User>) : Promise<Result<User | null>>
    deleteUser(id:number): Promise<Result<boolean>>
}