import mongoose from "mongoose";

const transactionsModel = new mongoose.Schema({
    address: {
        type: String,
        required: true,
        index: true,
    },

    blockNumber: String,
    blockHash: String,
    timeStamp: String,

    hash: { //since the hash is unique for every transactuon,
        type: String,
        required: true,
        unique: true,
    },

    nonce: String,
    transactionIndex: String,
    from: String,
    to: String,
    value: String,
    gas: String,
    gasPrice: String,
    input: String,
    methodId: String,
    functionName: String,
    contractAddress: String,
    cumulativeGasUsed: String,
    txreceipt_status: String,
    gasUsed: String,
    confirmations: String,
    isError: String
});

export const Transactions = mongoose.model("Transactions", transactionsModel);
