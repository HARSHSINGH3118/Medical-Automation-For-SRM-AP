// routes/commonRoutes.js
import express from "express";
import { notFound } from "../controllers/commonController.js";

const router = express.Router();

router.all("*", notFound);

export default router;
