import { Car } from "./car.interface";
import { CarModel } from "./car.models";



const createCarIntoDB = async (carData: Car) => {
    console.log(carData);
    const result = await CarModel.create(carData);
    return result
};
const getAllCarsFromDB = async () => {
    const result = await CarModel.find({});
    return result
};
const getSIngleCarFromDB = async (id: string) => {
    const result = await CarModel.findById(id);
    return result
};
const updateCarIntoDB = async (id: string, carData: Car) => {
    try {
        const result = await CarModel.findByIdAndUpdate(
            id,
            { $set: carData },
            { new: true }
        );
        return {
            status: true,
            message: "car updated successfully",
            data: result
        };
    } catch (error) {
        return {
            status: false,
            message: "something went wrong",
            error
        };
    }
};

const deleteCarFromDB = async (id: string) => {
    const result = await CarModel.findByIdAndDelete(id);
    return result
}

export const CarServices = {
    createCarIntoDB,
    getAllCarsFromDB,
    getSIngleCarFromDB,
    updateCarIntoDB,
    deleteCarFromDB
};