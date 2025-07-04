import asyncHandler from "express-async-handler";
import Product from "../model/Product.js";
import Category from "../model/Category.js";

export const createProductCtrl = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    category,
    sizes,
    colors,
    price,
    totalQty,
    brand,
  } = req.body;

  // //Brand exists
  // const brandExist = await Product.findOne({ name });
  // if (productExist) {
  //   throw new Error("Brand already exists");
  // }

  //Find the Brand
  const brandFound = await Category.findOne({
    name: brand.toLowerCase() 
  });
  if(!brandFound) {
    throw new Error("Brand not Found, Please create brand first or check category name");
  };

    //Product exists
  const productExist = await Product.findOne({ name });
  if (productExist) {
    throw new Error("Product already exists");
  }

  //Find the category
  const categoryFound = await Category.findOne({
    name: category
  });
  if(!categoryFound) {
    throw new Error("Category not Found, Please create category first or check category name");
  };

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
  categoryFound.products.push(product._id);
  //resave
  await categoryFound.save();

  //Push the product into brand
  brandFound.products.push(product._id);
  //resave
  await brandFound.save();

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

export const getProductCtrl = asyncHandler(async(req, res) => {
  const product = await Product.findById(req.params.id);
  if(!product) {
    throw new Error("Product not found")
  }
  res.json({
    status: "Success",
    message: "Product fetched successfully",
    product,
  })
})

//@desc     Update Single product
//@route    GET /api/products/:id
//@public   Public

export const updateProductCtrl = asyncHandler(async(req, res) => {
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
  
  //update
  const product = await Product.findByIdAndUpdate(req.params.id, {
    name,
    description,
    category,
    sizes,
    colors,
    user,
    price,
    totalQty,
    brand,
  }, {
    new: true,
  })
  res.json({
    status: "Success",
    message: "Product updated successfully",
    product,
  })
})

//@desc     Delete Single product
//@route    DELETE /api/products/:id
//@public   Public

export const deleteProductCtrl = asyncHandler(async(req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({
    status: "Success",
    message: "Product deleted successfully",
  })
})