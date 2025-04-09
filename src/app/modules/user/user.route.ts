import { Router } from "express";
import validateRequest from "../../../middlewares/validateRequest";
import { userValidation } from "./user.validation";
import { userController } from "./user.controller";
import { USER_ROLE } from "./user.constants";
import auth from "../../../middlewares/auth";

const userRouter = Router();

userRouter.post('/create-admin', validateRequest(userValidation.userValidationSchema), userController.createUser)
userRouter.get('/:userId', userController.getSingleUser)
userRouter.put('/:userId', userController.updateUser)
userRouter.delete('/:userId', userController.deleteUser)

// only admin can see all users
userRouter.get('/', auth(USER_ROLE.admin, USER_ROLE.user), userController.getUser)

export default userRouter