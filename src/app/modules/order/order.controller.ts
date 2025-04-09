import { Order } from "./order.interface";
import { OrderServices } from "./order.service";
import { Request, Response } from "express";
const createOrder = async (req: Request, res: Response) => {
    try {
        // console.log(req.body);
        const orderData = req.body;
        const result = await OrderServices.createOrder(orderData);
        res.status(200).json({
            success: true,
            message: "order created successfully",
            data: result
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "something went wrong",
            error
        })
    }
};

const getRevinew = async (req: Request, res: Response) => {
    try {
        const result = await OrderServices.getRevinew()
        res.status(200).json({
            success: true,
            message: "Revenue calculated successfully",
            data: result
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Revenue not found",
            error
        })
    }
}

export const OrderController = {
    createOrder,
    getRevinew
};