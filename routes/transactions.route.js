import Router from "express";
import { fetchTransactions } from "../controllers/transactions.controller.js";

const router = Router();

router.route("/fetch-normal-transactions").get(fetchTransactions);

export default router;