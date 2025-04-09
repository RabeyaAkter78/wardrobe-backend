import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import catchAsync from '../utils/catchAsync';
import { TUserRole } from '../app/modules/user/user.interface';
import User from '../app/modules/user/user.model';
import config from '../app/config';

const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        // console.log(token);
        if (!token) {
            throw new Error('You are not authorized!');
        }

        const decoded = jwt.verify(
            token,
            config.jwt_secret as string,
        ) as JwtPayload;


        const { role, email } = decoded;

        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('User not found');
        }

        const userStatus = user?.userStatus

        if (userStatus === 'inactive') {
            throw new Error('User is inactive');
        }

        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new Error(
                'You are not authorized',
            );
        }

        req.user = decoded as JwtPayload;
        next();
    });
};

export default auth;