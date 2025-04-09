import { Router } from "express";

import { AuthValidation } from "./auth.validation";
import validateRequest from "../../../middlewares/validateRequest";
import { AuthControllers } from "./auth.controller";
import { userValidation } from "../user/user.validation";

const authRouter = Router();

// authRouter.post('/register', AuthControllers.register);

authRouter.post('/register', validateRequest(userValidation.userValidationSchema), AuthControllers.register);
authRouter.post('/login', validateRequest(AuthValidation.loginValidationSchema), AuthControllers.login);



export default authRouter;