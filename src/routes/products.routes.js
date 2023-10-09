import {Router} from 'express';
import { getProducts, getProductById, createProduct, editProduct, deleteProduct } from '../controllers/products.controllers.js';


const router = Router();

router.get("/api/products", getProducts);
router.get("/api/products/:id", getProductById);
router.post("/api/products", createProduct);
router.put("/api/products/:id", editProduct);
router.delete("/api/products/:id", deleteProduct);

export default router;