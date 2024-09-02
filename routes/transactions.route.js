import Router from "express";
import { fetchExpenses, fetchTransactions } from "../controllers/transactions.controller.js";

const router = Router();

router.route("/fetch-normal-transactions").get(fetchTransactions);
router.route("/fetch-user-expenses/:address").get(fetchExpenses);

export default router;