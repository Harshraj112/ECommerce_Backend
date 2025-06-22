import asyncHandler from "express-async-handler";
import Category from "../model/Category.js";

//@desc     Create New Category
//@route    Post /api/v1/categories
//@public   Private/Admin

export const createCategoryCtrl = asyncHandler(async (req, res) => {
  const { name } = req.body;
  //Category exists
  const categoryFound = await Category.findOne({ name });
  if (categoryFound) {
    throw new Error("Category Found !!");
  }

  //Create
  const category = await Category.create({
    name: name.toLowerCase(),
    user: req.userAuthId,
  });

  res.json({
    status: "Success",
    message: "Category created successfully",
    category,
  });
});

//@desc     Get all Category
//@route    GET /api/v1/categories
//@public   Public

export const getAllCategoryCtrl = asyncHandler(async (req, res) => {
  const categories = await Category.find();

  res.json({
    status: "Success",
    message: "Category fetched successfully",
    categories,
  });
});

//@desc     Get single Category
//@route    GET /api/v1/categories/:id
//@public   Public

export const getSingleCategoryCtrl = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  res.json({
    status: "Success",
    message: "Category fetched successfully",
    category,
  });
});

//@desc     Update Category
//@route    PUT /api/v1/categories/:id
//@public   Public
export const updateCategoryCtrl = asyncHandler(async (req, res) => {
  const { name } = req.body;

  //update
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name,
    },
    {
      new: true,
    }
  );
  res.json({
    status: "Success",
    message: "Category updated successfully",
    category,
  });
});

//@desc     Delete Single product
//@route    DELETE /api/category/:id
//@public   Public

export const deleteCategoryCtrl = asyncHandler(async(req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({
    status: "Success",
    message: "Product deleted successfully",
  })
})
