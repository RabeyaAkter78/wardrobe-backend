import { CarModel } from "../car/car.models";
import { Order } from "./order.interface";
import { OrderModel } from "./order.models";

const createOrder = async (orderData: Order) => {
    const carData = await CarModel.findById(orderData.car);
    if (carData?.inStock === true) {
        const result = await OrderModel.create(orderData);

        if (result._id) {
            const updatedQuantity = carData.quantity - orderData.quantity;

            if (updatedQuantity === 0) {
                await CarModel.findByIdAndUpdate(orderData.car, { quantity: updatedQuantity, inStock: false });

            } else {

                await CarModel.findByIdAndUpdate(orderData.car, { quantity: updatedQuantity });
            }
        }

        return result;
    } else {
        return {
            status: false,
            message: "out of stock"
        }

    }
};


const getRevinew = async () => {
    const result = await OrderModel.aggregate([{
        $group: {
            _id: null,
            totalPrice: {
                $sum: "$totalPrice"

            }
        }
    }])
    return result
}


export const OrderServices = {
    createOrder,
    getRevinew
}