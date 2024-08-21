import express from "express";
import * as productController from "../controllers/productController.js";

const router = express.Router();

router.route("/create").post(productController.createProduct);
router.route("/update").post(productController.updateProduct);
router.route("/products").get(productController.getAllProducts);
router.route("/delete").post(productController.deleteProduct);


export default router;
