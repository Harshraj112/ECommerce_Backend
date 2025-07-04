import asyncHandler from "express-async-handler";
import Product from "../model/Product.js";
import Review from "../model/review.js";

// @desc    Create new Review
// @route   POST /api/v1/reviews
// @access  Private/Admin

export const createReviewCtrl = asyncHandler(async(req, res) => {
    const {product, message, rating} = req.body;
    //1. Find the product by ID
    const { productID } = req.params;
    const productFound = await Product.findById(productID);
    if(!productFound) {
        throw new Error("Product Not Found");
    }

    //2.If user already review this product
    //create Review
    const review = await Review.create({
        message,
        rating,
        product: productFound?._id,
        user: req.userAuthId
    });
    //Push review into the product found
    productFound.reviews.push(review?._id)
    //resave
    await productFound.save();
    res.status(201).json({
        success: true,
        message: "Review created Successfully",
    })

})