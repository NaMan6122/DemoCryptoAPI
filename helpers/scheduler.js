import { fetchAndStorePrice } from "../services/etherprice.services.js";
import cron from "node-cron";

//schduling for an interval of 10 minutes.
const scheduler = () => {
    cron.schedule("*/10 * * * *" , async () => {
    console.log("Fetching Price of Ethereum...!");
    try {
        await fetchAndStorePrice();
    } catch (error) {
        console.log("Error fetching pricem of ether!");
    }
},{
    scheduled: true,
})};
// scheduler is a cron job that runs every 10 minutes. It fetches the price of Ethereum
// and stores it in the database. The function fetchAndStorePrice is called every 10 minutes.

export { scheduler };