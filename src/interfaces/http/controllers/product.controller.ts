import { CreateProductUseCase, DeleteProductUseCase, GetProductUseCase, UpdateProductUseCase, UserPorductUseCase } from "@application/use-cases/product";
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { CreateProductRequestModel } from "../dto/requests/product/create-product.request";
import { CreateProductUseCaseInput, DeleteProductUseCaseInput, GetProductUseCaseOutput, UpdatedProductUseCaseInput, UserWithProductsOutput } from "@application/interfaces/product";
import { plainToInstance } from "class-transformer";
import { CoreResponse } from "@shared/core/response";
import { CreateProductResponseModel, GetProductOutputResponseModel, UpdatedProductResponseModel, UserWithProductsResponseModel } from "../dto/responses/product";
import { UpdateProductRequestModel } from "../dto/requests/product";

@Controller('product')
export class ProductController {
    constructor(
        private readonly createProductCase: CreateProductUseCase,
        private readonly getProductCase: GetProductUseCase,
        private readonly updateProductCase: UpdateProductUseCase,
        private readonly deleteProductCase: DeleteProductUseCase,
        private readonly userWithProductCase: UserPorductUseCase,
    ){}

    @Get()
    async allProducts() : Promise<CoreResponse<GetProductOutputResponseModel[]>> {
        const products: CoreResponse<GetProductUseCaseOutput[]> = await this.getProductCase.execute()

        if(products.data) {
            const responseData: GetProductOutputResponseModel[] = plainToInstance(GetProductOutputResponseModel, products.data)
            return CoreResponse.success(responseData)
        } else if (products.errors.length > 0) {
            return CoreResponse.fail(products.errors)
        } else {
            return CoreResponse.empty(204)
        }
        
    }

    @Get(':id')
    async productById(
        @Param('id', ParseIntPipe) id: number
    ) : Promise<CoreResponse<GetProductOutputResponseModel[]>> {
        const product: CoreResponse<GetProductUseCaseOutput[]> = await this.getProductCase.execute(id)

        if(product.data) {
            const responseData: GetProductOutputResponseModel[] = plainToInstance(GetProductOutputResponseModel, product.data)
            return CoreResponse.success(responseData)
        } else if (product.errors.length > 0) {
            return CoreResponse.fail(product.errors)
        } else {
            return CoreResponse.empty(204)
        }
    }

    @Post()
    async create(@Body() requestModel: CreateProductRequestModel) : Promise<CoreResponse<CreateProductResponseModel>> {
        const productInput: CreateProductUseCaseInput = plainToInstance(CreateProductUseCaseInput, requestModel)
        const product: CoreResponse<GetProductUseCaseOutput> = await this.createProductCase.execute(productInput)

        if(product.data) {
            const responseData: CreateProductResponseModel = plainToInstance(CreateProductResponseModel, product.data)
            return CoreResponse.success(responseData)
        }
        else if(product.errors.length > 0) {
            return CoreResponse.fail(product.errors)
        }
        else {
            return CoreResponse.empty(204)
        }
    }

    @Put(':id')
    async updateProductById(
        @Param('id', ParseIntPipe) id: number,
        @Body() requestModel: UpdateProductRequestModel
    ):Promise<CoreResponse<UpdatedProductResponseModel>> {

        if(requestModel.id !== id) {
            return CoreResponse.fail(['Bad request'], 400)
        }

        const productInput: UpdatedProductUseCaseInput = plainToInstance(UpdatedProductUseCaseInput, requestModel).withDefaults()
        const resultProduct: CoreResponse<GetProductUseCaseOutput> = await this.updateProductCase.execute(productInput)

        if(resultProduct.data) {
            const responseData: UpdatedProductResponseModel = plainToInstance(UpdatedProductResponseModel, resultProduct.data)
            return CoreResponse.success(responseData)
        } else if(resultProduct.errors.length > 0) {
            return CoreResponse.fail(resultProduct.errors)
        } else {
            return CoreResponse.empty(204)
        }
    }

    @Delete(':id')
    async deleteProductById(
        @Param('id', ParseIntPipe) id:number,
    ) : Promise<CoreResponse<Boolean>>{
        if(id === 0) return CoreResponse.fail(['Bad request'], 400)
        
        const deleteProductUseCaseInput: DeleteProductUseCaseInput = plainToInstance(DeleteProductUseCaseInput, { id })
        const deleteProduct = await this.deleteProductCase.execute(deleteProductUseCaseInput)

        if(deleteProduct.data) {
            const responseData = plainToInstance(Boolean, deleteProduct.data)
            return CoreResponse.success(responseData)
        } else if (deleteProduct.errors.length > 0) {
            return CoreResponse.fail(deleteProduct.errors)
        } else {
            return CoreResponse.empty(204)
        }
    }

    @Get('/userwithproduct/:id')
    async getUserWithProductByUserId(
        @Param('id', ParseIntPipe) id: number,
    ) : Promise<CoreResponse<UserWithProductsResponseModel[]>>{

        if(id === 0) return CoreResponse.fail(['Bad request'], 400)

        const result:CoreResponse<UserWithProductsOutput[]> = await this.userWithProductCase.executeUserWithProduct(id)

        if(result.data) {
            const responseData: UserWithProductsResponseModel[] = plainToInstance(UserWithProductsResponseModel, result.data)
            return CoreResponse.success(responseData)
        }
        else if (result.errors.length > 0) {
            return CoreResponse.fail(result.errors)
        } else {
            return CoreResponse.empty(204)
        }
    }
}