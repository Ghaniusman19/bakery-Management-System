import express, { Router } from "express";
import { loginUser, registerUser } from "../controllers/userController.js";
import {
  addCustomer,
  getAllCustomers,
  searchCustomers,
  updateCustomer,
} from "../controllers/customerController.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  addProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
} from "../controllers/productController.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/add-Customer", protect, addCustomer);
router.get("/get-customers", protect, getAllCustomers);
router.get("/search-customers", protect, searchCustomers);
router.put("/update-customer/:id", protect, updateCustomer);
router.post("/add-product", protect, addProduct);
router.get("/get-product", protect, getAllProducts);
router.delete("/delete-product/:id", protect, deleteProduct);
router.put("/update-product/:id", protect, updateProduct);

export default router;
