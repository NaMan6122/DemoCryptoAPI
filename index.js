import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./dbConfig/dbConfig.js";
import { scheduler } from "./helpers/scheduler.js";
import { fetchAndStorePrice } from "./services/etherprice.services.js";

//load environment variables.
dotenv.config({
    path: "./.env",
});

//connecting to MongoDB.
connectDB()
.then(() => {
    app.on(process.env.PORT, (error) => {
        console.log("Some Error Occured While Server COnfig!", error);
        throw error;
    });

    app.listen(process.env.PORT || 4500, () => {
        console.log(`Server Is Running on Port: ${process.env.PORT || 4500}`);
    });
    fetchAndStorePrice();
    scheduler();

})
.catch((error) => {
    console.log("Server Connection Failed!", error);
});




