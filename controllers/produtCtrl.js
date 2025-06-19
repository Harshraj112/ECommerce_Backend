import asyncHandler from "express-async-handler";
import Product from "../model/Product.js";

export const createProductCtrl = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    category,
    sizes,
    colors,
    user,
    price,
    totalQty,
    brand,
  } = req.body;

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
    brand,
  });

  //Push the product into category
  //Send Response
  res.status(201).json({
    status: "Success",
    message: "Product created successfully",
    product,
  });
});

//@desc     Get Page Info
//@route    GET /api/products
//@public   Public

export const getProductsCtrl = asyncHandler(async (req, res) => {
  //Query
  let productQuery = Product.find();
  //search by name
  if (req.query.name) {
    productQuery = productQuery.find({
      name: { $regex: req.query.name, $options: "i" },
    });
  }

  //filter by brand
  if (req.query.brand) {
    productQuery = productQuery.find({
      brand: { $regex: req.query.brand, $options: "i" },
    });
  }

  //filter by colour
  if (req.query.colors) {
    productQuery = productQuery.find({
      colour: { $regex: req.query.colors, $options: "i" },
    });
  }

  //filter by category
  if (req.query.category) {
    productQuery = productQuery.find({
      category: { $regex: req.query.category, $options: "i" },
    });
  }

  //filter by size
  if (req.query.sizes) {
    productQuery = productQuery.find({
      sizes: { $regex: req.query.sizes, $options: "i" },
    });
  }

  //filter by prize
  if (req.query.price) {
    const priceRange = req.query.price.split("-");
    productQuery = productQuery.find({
      price: { $gte: priceRange[0], $lte: priceRange[1] },
    });
  }

  //Pagination
  //page
  const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
  //limit
  const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
  //startIdx
  const startIdx = (page - 1) * limit;
  //endIdx
  const endIdx = page * limit;
  //total
  const total = await Product.countDocuments();

  productQuery = productQuery.skip(startIdx).limit(limit);

  //Pagination result
  const pagination = {};
  if (endIdx < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIdx > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  //await the query
  const products = await productQuery;

  res.json({
    status: "success",
    results: products.length,
    pagination,
    message: "Product fetched succesfully",
    products,
  });
});

//@desc     Get Single product
//@route    GET /api/products/:id
//@public   Public

export 