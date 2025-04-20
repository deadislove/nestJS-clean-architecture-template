import { IProductRepository } from "@domain/repositories/product.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductTypeOrmEntity } from "../entities";
import { DeleteResult, Repository } from "typeorm";
import { Result } from "@domain/core/result";
import { Product } from "@domain/entities/product.entity";
import { plainToInstance } from "class-transformer";

export class ProductRepository implements IProductRepository {
    constructor(
        @InjectRepository(ProductTypeOrmEntity)
        private readonly repo: Repository<ProductTypeOrmEntity>,
    ) { }

    async getProducts(): Promise<Result<Product[]>> {
        try {
            const products: ProductTypeOrmEntity[] = await this.repo.find()
            const resultData = plainToInstance(Product, products, {
                excludeExtraneousValues: true
            })

            if (resultData.length > 0) {
                return Result.ok(resultData)
            }
            else {
                const emptyObj: Product[] = []
                return Result.ok(emptyObj)
            }
        }
        catch (error) {
            return Result.fail<Product[]>(error.message || 'Failed to fetch products')
        }
    }

    async findProductById(id: number): Promise<Result<Product | null>> {

        if (id === 0) return Result.ok(null)

        try {
            const found: ProductTypeOrmEntity | null = await this.repo.findOne({ where: { id } })

            if (!found) return Result.ok(null)

            return Result.ok(plainToInstance(Product, found, { excludeExtraneousValues: true }))
        }
        catch (error) {
            return Result.fail<Product | null>(error.message || 'Failed to fetch product by id')
        }
    }

    async createProduct(data: Partial<Product>): Promise<Result<Product>> {
        try {
            const productEntity = plainToInstance(ProductTypeOrmEntity, data)
            const saved = await this.repo.save(productEntity)
            return Result.ok(plainToInstance(Product, saved, { excludeExtraneousValues: true }))
        }
        catch (error) {
            return Result.fail<Product>(error.message || 'Failed to create product')
        }
    }

    async updateProduct(id: number, data: Partial<Product>): Promise<Result<Product | null>> {

        try {
            const exisitng = await this.repo.findOne({ where: { id } })
            if (!exisitng) return Result.ok(null)

            Object.assign(exisitng, data)
            const saved: ProductTypeOrmEntity = await this.repo.save(exisitng)

            return Result.ok(plainToInstance(Product, saved, { excludeExtraneousValues: true }))
        } catch (error) {
            return Result.fail<Product | null>(error.message || 'Failed to update product')
        }
    }

    async deleteProduct(id: number): Promise<Result<boolean>> {
        try {
            const result: DeleteResult = await this.repo.delete(id)
            return Result.ok(result.affected !== 0)
        }
        catch(error) {
            return Result.fail<boolean>(error.message || 'Failed to delete product')
        }
    }
}