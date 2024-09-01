import mongoose from "mongoose";

const priceModel = new mongoose.Schema({
    priceInRupee: {
        type: Number,
        required: true,
    },

}, {timestamps: true});

export const Price = mongoose.model("Price", priceModel);