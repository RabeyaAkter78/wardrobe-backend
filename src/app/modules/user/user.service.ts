
import { IUSer } from "./user.interface";
import User from "./user.model";

const createUser = async (payload: IUSer): Promise<IUSer> => {
    payload.role = "user";
    const Result = await User.create(payload);
    return Result
}


const getUsers = async () => {
    const result = await User.find()
    return result
}

const getSingleUser = async (id: string) => {
    const result = await User.findById(id)
    return result
}

const updateUser = async (id: string, data: IUSer) => {
    const result = await User.findByIdAndUpdate(id, data, { new: true })
    return result
}

const deleteUser = async (id: string) => {
    const result = await User.findByIdAndDelete(id)
    return result
}

export const UserService = {
    createUser,
    getUsers,
    getSingleUser,
    updateUser,
    deleteUser
}