import { Model, Types } from "mongoose"


export type Order = {
    _id(_id: any): unknown
    email: string,
    car: Types.ObjectId,
    quantity: number,
    totalPrice: number
}

export type OrderModel = Model<Order, Record<string, never>>