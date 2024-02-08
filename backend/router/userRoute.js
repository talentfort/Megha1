const express = require("express");
const authController = require("../controller/authController");
const productController = require("../controller/productController");
const userController = require("../controller/userController");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.get("/me", authenticate, userController.getMe, userController.getUser);
router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.get("/signout", authController.signout);
router.get("/pharmacy-users", authController.getPharmacyUsers);
router.put("/update-status/:userId", authController.updatePharmacyUserStatus);
router.post("/create-product", productController.createProduct);
router.post("/create-doctorstock", productController.createDoctorStock);
router.put(
    "/update-quantity/:productId",
    productController.updateProductQuantity
);
router.get("/get-all-products", productController.getAllProducts);
router.get("/get-doctorstock", productController.getDoctorStock);
router.get("/user-comments", productController.getUserComments);
router.post("/user-comments", productController.adduserComment);
module.exports = router;
