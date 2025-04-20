import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { CoreResponse } from "@shared/core/response";
import { CreateUserUseCase, DeleteUserUseCase, GetUserUseCase, UpdateUserUseCase } from "@application/use-cases/user";
import { CreateUserResponseModel, GetUserOutputResponseModel, UpdatedUserResponseModel } from "../dto/responses/user";
import { CreateUserUseCaseInput, DeleteUserUseCaseInput, GetUserUseCaseOutput, UpdatedUserUseCaseInput } from "@application/interfaces/user";
import { CreateUserRequestModel, UpdateUserRequestModel } from "../dto/requests/user";

@Controller('user')
export class UserController {
    constructor(
        private readonly createUserCase: CreateUserUseCase,
        private readonly getUserCase: GetUserUseCase,
        private readonly updateUserCase: UpdateUserUseCase,
        private readonly deleteUserCase: DeleteUserUseCase
    ){}

    @Get()
    async allUser() : Promise<CoreResponse<GetUserOutputResponseModel[]>> {
        const users: CoreResponse<GetUserUseCaseOutput[]> = await this.getUserCase.execute()

        if(users.data) {
            const responseData: GetUserOutputResponseModel[] = plainToInstance(GetUserOutputResponseModel, users.data)
            return CoreResponse.success(responseData)
        } else if (users.errors.length > 0) {
            return CoreResponse.fail(users.errors)
        } else {
            return CoreResponse.empty(204)
        }
    }

    @Get(':id')
    async userById(
        @Param('id', ParseIntPipe) id: number
    ) : Promise<CoreResponse<GetUserOutputResponseModel[]>>
    {
        const user:CoreResponse<GetUserUseCaseOutput[]> =  await this.getUserCase.execute(id)

        if(user.data) {
            const responseData: GetUserOutputResponseModel[] = plainToInstance(GetUserOutputResponseModel, user.data)
            return CoreResponse.success(responseData)
        } else if (user.errors.length > 0) {
            return CoreResponse.fail(user.errors)
        } else {
            return CoreResponse.empty(204)
        }
    }

    @Post()
    async create(@Body() requestModel: CreateUserRequestModel) : Promise<CoreResponse<CreateUserResponseModel>> {
        const userInput:CreateUserUseCaseInput = plainToInstance(CreateUserUseCaseInput, requestModel)
        const user: CoreResponse<GetUserUseCaseOutput> = await this.createUserCase.execute(userInput)
        
        if(user.data) {
            const responseData: CreateUserResponseModel = plainToInstance(CreateUserResponseModel, user.data)
            return CoreResponse.success(responseData)
        } else if (user.errors.length > 0) {
            return CoreResponse.fail(user.errors)
        } else {
            return CoreResponse.empty(204)
        }
    }

    @Put(':id')
    async updateUserById(
        @Param('id', ParseIntPipe) id:number,
        @Body() requestModel: UpdateUserRequestModel
    ) : Promise<CoreResponse<UpdatedUserResponseModel>> {

        if(requestModel.id !== id) {
            return CoreResponse.fail(['Bad request'], 400)
        }

        const userInput: UpdatedUserUseCaseInput = plainToInstance(UpdatedUserUseCaseInput, requestModel)
        const resultUser: CoreResponse<GetUserUseCaseOutput> = await this.updateUserCase.execute(userInput)

        if(resultUser.data) {
            const responseData: UpdatedUserResponseModel = plainToInstance(UpdatedUserResponseModel, resultUser.data)
            return CoreResponse.success(responseData)
        } else if (resultUser.errors.length > 0) {
            return CoreResponse.fail(resultUser.errors)
        } else {
            return CoreResponse.empty(204)
        }
    }

    @Delete(':id')
    async deleteUserById(
        @Param('id', ParseIntPipe) id:number,
    ) : Promise<CoreResponse<Boolean>> {
        if(id === 0 ) return CoreResponse.fail(['Bad request'], 400)

        const deleteUserUseCaseInput: DeleteUserUseCaseInput = plainToInstance(DeleteUserUseCaseInput, {id})        
        const deleteUser = await this.deleteUserCase.execute(deleteUserUseCaseInput)

        if(deleteUser.data) {
            const responseData = plainToInstance(Boolean, deleteUser.data)
            return CoreResponse.success(responseData)
        } else if (deleteUser.errors.length > 0) {
            return CoreResponse.fail(deleteUser.errors)
        } else {
            return CoreResponse.empty(204)
        }
    }

}