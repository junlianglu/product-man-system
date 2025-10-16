import {createProduct, getProductById, getAllProducts, 
    updateProductById, deleteProductById} from "../controllers/productController.js";
import express from "express";
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, adminMiddleware, createProduct);
router.get("/", authMiddleware, getAllProducts);
router.get("/:productId", authMiddleware, getProductById);
router.put("/:productId", authMiddleware, adminMiddleware, updateProductById);
router.delete("/:productId", authMiddleware, adminMiddleware, deleteProductById);
export default router;
