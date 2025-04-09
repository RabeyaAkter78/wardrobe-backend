import User from '../user/user.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { IUSer } from '../user/user.interface'
import { ILoginUser } from './auth.interface'
import config from '../../config'

const register = async (payload: IUSer) => {
  const result = await User.create(payload)
  return result
}

const login = async (payload: ILoginUser) => {
  // checking if the user is exist and select password so that it can be compared otherwise it will return an error.
  const user = await User.findOne({ email: payload?.email }).select('+password');

  if (!user) {
    throw new Error('User not found')
  }

  const userStatus = user?.userStatus

  if (userStatus === 'inactive') {
    throw new Error('User is inactive')
  }

  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password
  )

  if (!isPasswordMatched) {
    throw new Error('Invalid password')
  }

  //generate token
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  }
  const secret = config.jwt_secret as string;
  // console.log("JWT Secret:", secret);

  const token = jwt.sign(jwtPayload, secret, { expiresIn: '30d' });

  const varifiedUser = {
    name: user?.name,
    email: user?.email,
    role: user?.role
  }


  return { token, varifiedUser };
}

export const AuthService = {
  register,
  login,
}
