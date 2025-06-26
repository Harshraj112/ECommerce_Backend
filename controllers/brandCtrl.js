import asyncHandler from "express-async-handler";
import Brand from "../model/Brand.js";

//@desc     Create New Brand
//@route    Post /api/v1/categories
//@public   Private/Admin

export const createBrandCtrl = asyncHandler(async (req, res) => {
  const { Name } = req.body;
  //brand exists
  const brandFound = await Brand.findOne({ Name });
  if (brandFound) {
    throw new Error("Brand Found !!");
  }

  //Create
  const brand = await Brand.create({
    name: req.body.brand.toLowerCase(),
    user: req.userAuthId,
  });


  res.json({
    status: "Success",
    message: "Brand created successfully",
    brand,
  });
});

//@desc     Get all Category
//@route    GET /api/v1/categories
//@public   Public

export const getAllBrandCtrl = asyncHandler(async (req, res) => {
  const brands = await Brand.find();

  res.json({
    status: "Success",
    message: "Brand fetched successfully",
    brands,
  });
});

//@desc     Get single Category
//@route    GET /api/v1/categories/:id
//@public   Public

export const getSingleBrandCtrl = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  res.json({
    status: "Success",
    message: "Brand fetched successfully",
    brand,
  });
});

//@desc     Update Category
//@route    PUT /api/v1/categories/:id
//@public   Public
export const updateBrandCtrl = asyncHandler(async (req, res) => {
  const { name } = req.body;

  //update
  const brand = await Brand.findByIdAndUpdate(
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
    brand,
  });
});

//@desc     Delete Single product
//@route    DELETE /api/brand/:id
//@public   Public

export const deleteBrandCtrl = asyncHandler(async(req, res) => {
  await Brand.findByIdAndDelete(req.params.id);
  res.json({
    status: "Success",
    message: "Brand deleted successfully",
  })
})
