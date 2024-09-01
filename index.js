import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./dbConfig/dbConfig.js";

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
        console.log(`Server Is Running on Port: ${process.env.PORT || 2000}`);
    });
})
.catch((error) => {
    console.log("Server Connection Failed!", error);
});


