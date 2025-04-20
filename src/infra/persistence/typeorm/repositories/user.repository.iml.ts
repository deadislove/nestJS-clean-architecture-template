import { User } from "@domain/entities/user.entity";
import { IUserRepository } from "@domain/repositories/user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { UserTypeOrmEntity } from "../entities/user.typeorm.entity";
import { DeleteResult, Repository } from "typeorm";
import { plainToClass, plainToInstance } from "class-transformer";
import { Result } from "@domain/core/result";

export class UserRepository implements IUserRepository {

    constructor(
        @InjectRepository(UserTypeOrmEntity)
        private readonly repo: Repository<UserTypeOrmEntity>,
    ) { }

    async getUsers(): Promise<Result<User[]>> {

        try {
            const users: UserTypeOrmEntity[] = await this.repo.find()
            const resultData: User[] = plainToInstance(User, users, {
                excludeExtraneousValues: true
            })

            if (resultData.length > 0) {
                return Result.ok(resultData)
            } else {
                const emptyObj: User[] = []
                return Result.ok(emptyObj)
            }
        } catch (error) {
            return Result.fail<User[]>(error.message || 'Failed to fetch users')
        }
    }

    async findUserbyId(id: number): Promise<Result<User | null>> {

        if (id === 0) return Result.ok(null);

        try {
            const found: UserTypeOrmEntity | null = await this.repo.findOne({ where: { id } })

            if (!found) return Result.ok(null)

            return Result.ok(plainToInstance(User, found, { excludeExtraneousValues: true }))
        } catch (error) {
            return Result.fail<User | null>(error.message || 'Failed to fetch user by id')
        }
    }

    async createUser(data: Partial<User>): Promise<Result<User>> {
        try {
            const userEntity: UserTypeOrmEntity = plainToInstance(UserTypeOrmEntity, data)
            const saved: UserTypeOrmEntity = await this.repo.save(userEntity)
            return Result.ok(plainToInstance(User, saved, { excludeExtraneousValues: true }))
        } catch (error) {
            return Result.fail<User>(error.message || 'Failed to create user')
        }
    }

    async updateUser(id: number, data: Partial<User>): Promise<Result<User | null>> {

        try {
            const existing: UserTypeOrmEntity | null = await this.repo.findOne({ where: { id } });
            if (!existing) return Result.ok(null);

            Object.assign(existing, data);
            const saved: UserTypeOrmEntity = await this.repo.save(existing);

            return Result.ok(plainToInstance(User, saved, { excludeExtraneousValues: true }))
        } catch (error) {
            return Result.fail<User | null>(error.message || 'Failed to update user')
        }
    }
    async deleteUser(id: number): Promise<Result<boolean>> {
        try {
            const result: DeleteResult = await this.repo.delete(id)
            return Result.ok(result.affected !== 0)
        } catch (error) {
            return Result.fail<boolean>(error.message || 'Failed to delete user')
        }
    }

}