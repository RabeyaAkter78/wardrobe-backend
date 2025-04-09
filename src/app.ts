
import express, { Application, Request, Response } from "express"
import cors from "cors"
import { CarRoutes } from "./app/modules/car/car.route";
import { OrderRoutes } from "./app/modules/order/order.route";
import authRouter from "./app/modules/auth/auth.route";
import userRouter from "./app/modules/user/user.route";

const app: Application = express()

// parser:
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send('hello from backend of LuxeRides : Ideal for a premium or luxury car dealership.')
})



// Application routes:
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/cars', CarRoutes);
app.use('/api/orders', OrderRoutes)


export default app;
