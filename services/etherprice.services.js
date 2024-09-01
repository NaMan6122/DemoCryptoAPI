import { ApiError } from "../helpers/apiError.js";
import { ApiResponse } from "../helpers/apiResponse.js";
import { asyncHandler } from "../helpers/asyncHandler.js";
import { Price } from "../models/etherprice.model.js";
import mongoose from "mongoose";
import axios from "axios";

const fetchAndStorePrice = asyncHandler( async(req, res) => {
    try {
        const url = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr"
        const response = await axios.get(url);
        const price = response.data.ethereum.inr;
        console.log(price);
        if(price === null || price === undefined){
            throw new ApiError(500, "Limit Exceeded, Fetching after 10 Minutes.....!");
        }

        const priceEntry = new Price({priceInRupee : price});
        await priceEntry.save();
        console.log("Price Fetched and Stored Successfully!: ", priceEntry);
    } catch (error) {
        console.log("Error in Fetching and Storing Price..", error.message);
    }
});

export { fetchAndStorePrice };