import express from "express";
import userModel from "../models/userModel.js";

const router = express.Router();

// Route to save the user's cart to the database
router.post("/save-cart", async (req, res) => {
  try {
    const { cart, email } = req.body;

    await userModel.findOneAndUpdate({ email }, { cart });

    res.status(200).json({
      success: true,
      message: "Cart saved successfully",
    });
  } catch (error) {
    console.error("Error saving cart:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// Route to fetch the user's cart from the database
router.get("/fetch-cart", async (req, res) => {
  try {
    const { email } = req.query;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      cart: user.cart,
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

export default router;
