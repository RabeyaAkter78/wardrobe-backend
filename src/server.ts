import app from "./app";
import mongoose from "mongoose";
import Config from "./app/config";


main().catch(err => console.log(err));

async function main() {
    try {
        await mongoose.connect(Config.database_url as string);
        if (Config.database_url) {
            console.log("database connected successfully",);
        }
        app.listen(5000, () => {
            console.log(`LuxeRides app listening on port ${Config.port}`);
        })
    } catch (error) {
        console.log(error);
    }
}




