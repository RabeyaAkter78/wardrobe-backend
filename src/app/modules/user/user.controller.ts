import catchAsync from "../../../utils/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const createUser = catchAsync(
    async (req, res) => {
        const payload = req.body;
        const result = await UserService.createUser(payload);

        sendResponse(res, {
            statusCode: StatusCodes.CREATED, 
            message: 'User created successfully',
            data: result,
        })
    }
)

const getUser = catchAsync(
    async (req, res) => {
        const result = await UserService.getUsers();

        sendResponse(res, {
            statusCode: StatusCodes.OK,
            message: 'Users retrieved successfully',
            data: result,
        })
    }
)

const getSingleUser = catchAsync(async (req, res) => {
    console.log(req.params)
    const userId = req.params.userId

    const result = await UserService.getSingleUser(userId)

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'User getting successfully',
        data: result,
    })
})

const updateUser = catchAsync(async (req, res) => {
    const userId = req.params.userId
    const body = req.body
    const result = await UserService.updateUser(userId, body)

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'User updated successfully',
        data: result,
    })
})

const deleteUser = catchAsync(async (req, res) => {
    const userId = req.params.userId
    await UserService.deleteUser(userId)

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'user deleted successfully',
        data: {},
    })
})

export const userController = {
    createUser,
    getUser,
    getSingleUser,
    updateUser,
    deleteUser,
}