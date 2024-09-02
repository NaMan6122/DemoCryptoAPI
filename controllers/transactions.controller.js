import { ApiError } from "../helpers/apiError.js";
import { ApiResponse } from "../helpers/apiResponse.js";
import { asyncHandler } from "../helpers/asyncHandler.js";
import { Transactions } from "../models/transactions.model.js";
import mongoose from "mongoose";
import axios from "axios";
import { Price } from "../models/etherprice.model.js";

const fetchTransactions = asyncHandler( async(req, res) => {
    //fetching the address, which is passed as query params.
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
        return res.status(200).json(new ApiResponse(200, savedTransactions, "User Transactions Fetched and Saved in DB Successfully!"));

    } catch (error) {
        console.log("Something went wrong while fetching and storing transactions!!", error.message);
        throw new ApiError(500, "Fetching error!!");
    }
});

const fetchExpenses = asyncHandler( async(req, res) => {

    const address = req.params.address;
    //console.log("address: ", address);
    if(!address){
        throw new ApiError(400, "Please Provide Etherscan Address!");
    }

    const transactions = await Transactions.find({address}); //returns array of documents.
    if(transactions.length === 0){
        throw new ApiError(400, "User Address not Found in Database!!");
    }

    const totalExpenses = transactions.reduce((accumulator, transaction) => {
        const gasUsed = parseInt(transaction.gasUsed);
        const gasPrice = parseInt(transaction.gasPrice);
        let currExpense = (gasUsed * gasPrice);
        currExpense /= 1e18;
        accumulator += currExpense;
        return accumulator;
    }, 0);

    //now for the current price of Ethereum.
    const currEtherPrice = await Price.findOne().sort({ createdAt : -1 });
    console.log(currEtherPrice.priceInRupee);
    const resObject = {
        totalExpenses,
        currEtherPrice : currEtherPrice.priceInRupee,
    }
    return res.status(200).json(new ApiResponse(200, resObject, "User Expenses And Current Ethereum Price Fetched Successfully..!!"));
});

export { 
    fetchTransactions,
    fetchExpenses,
};
