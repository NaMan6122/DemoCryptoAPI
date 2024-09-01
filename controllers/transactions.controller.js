import { ApiError } from "../helpers/apiError.js";
import { ApiResponse } from "../helpers/apiResponse.js";
import { asyncHandler } from "../helpers/asyncHandler.js";
import { Transactions } from "../models/transactions.model.js";
import mongoose from "mongoose";
import axios from "axios";
import path from "path"; //for path resolving, windows.

const fetchTransactions = asyncHandler( async(req, res) => {
    //the address is passed as a query parameter in the url, and can be accessed from the req.body object.
    //now, since we have the address and the api key, we can form construct the url, and fetch the json data, and also store it in mongoDB.
    //there will be multiple transactions, stored in a lits, now we can save each transaction separately  with the same address in mongo DB.
    //we can access these transactions by using the find query in mongoose, to find all documents with the given adddress.

    const address = req.query.address;
    const apiKey = process.env.ETHER_API_KEY;
    console.log("address: ", address);
    console.log("api key: ", apiKey);
    if(!address){
        throw new ApiError(400, "Please Provide Etherscan Address!")
    }
    const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${apiKey}`

    try {
        const response = await axios.get(url);
        const transactionList = response.data.result;
        //console.log(transactionList);
        //now we are ready with the data.
        //we can now save each transaction in the database.

        //constructing an array of transactions, where each transaction will contain the address field:
        const transactionArray = transactionList.map(currTransaction => ({
            ...currTransaction,
            address,
        }));
        //now saving each transaction as a separate document in the DB, using insertMany.
        const savedTransactions = await Transactions.insertMany(transactionArray);
        console.log(savedTransactions);
        res.status(200).json(new ApiResponse(200, savedTransactions, "User Transactions Fetched and Saved in DB Successfully!"));

    } catch (error) {
        console.log("Something went wrong while fetching and storing transactions!!", error.message);
        throw new ApiError(500, "Fetching error!!");
    }
});

export { fetchTransactions };
