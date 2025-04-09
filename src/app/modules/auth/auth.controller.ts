import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";

const register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await AuthService.register(req.body);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        status: true,
        message: "User registered successfully",
        data: result
    })
});

const login = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.login(req.body);

    sendResponse(res, {
        statusCode: StatusCodes.ACCEPTED,
        status: true,
        message: "User logged in successfully",
        token: result?.token,
        data: result?.varifiedUser
    })
})




export const AuthControllers = {
    register,
    login
}