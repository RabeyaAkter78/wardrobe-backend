import { Model } from "mongoose"


export type Car = {
    // id: string,
    brand: string,
    model: string,
    year: number,
    price: number,
    image: string,
    category: 'Sedan' | 'SUV' | 'Truck' | 'Coupe' | 'Convertible',
    description: string,
    quantity: number,
    inStock: boolean
}

export type CarModel = Model<Car, Record<string, never>>