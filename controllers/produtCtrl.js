import asyncHandler from "express-async-handler";
import Product from "../model/Product.js";

export const createProductCtrl = asyncHandler(async (req, res) => {
  const { name, description, category, sizes, colors, user, price, totalQty,brand } =
    req.body;

  const productExist = await Product.findOne({ name });
  if (productExist) {
    throw new Error("Product already exists");
  }

  //Create the product
  const product = await Product.create({
    name,
    description,
    category,
    sizes,
    colors,
    user: req.userAuthId,
    price,
    totalQty,
    brand
  });

  //Push the product into category
  //Send Response
    res.status(201).json({
        status: "Success",
        message: "Product created successfully",
        product,
    })
});


export const getProductsCtrl = asyncHandler(async(req, res) => {
  const products = await Product.find();
  res.json({
    status : "success",
    products
  })
})