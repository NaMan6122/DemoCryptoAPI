import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json({
    limit: "10mb",
}));

app.use(express.urlencoded({
    extended: true,
}));


//working with the routes:
import transactionRouter from "./routes/transactions.route.js"

app.use("/api/transactions/v1", transactionRouter);

export { app }
