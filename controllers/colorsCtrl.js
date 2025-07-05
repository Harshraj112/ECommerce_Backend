import asyncHandler from "express-async-handler";
import Colour from "../model/colors.js";

//@desc     Create New Colour
//@route    Post /api/v1/colour
//@public   Private/Admin

export const createColourCtrl = asyncHandler(async (req, res) => {
  const { name } = req.body;

  // Validate input
  if (!name || typeof name !== 'string') {
    res.status(400);
    throw new Error("Colour name is required and must be a string");
  }

  // Check if colour exists
  const ColourFound = await Colour.findOne({ name: name.toLowerCase() });
  if (ColourFound) {
    res.status(400);
    throw new Error("Colour already exists!");
  }

  // Create new colour
  const colour = await Colour.create({
    name: name.toLowerCase(),
    user: req.userAuthId,
  });

  res.json({
    status: "Success",
    message: "Colour created successfully",
    colour,
  });
});


//@desc     Get all Category
//@route    GET /api/v1/categories
//@public   Public

export const getAllColourCtrl = asyncHandler(async (req, res) => {
  const colours = await Colour.find();

  res.json({
    status: "Success",
    message: "Colour fetched successfully",
    colours,
  });
});

//@desc     Get single Category
//@route    GET /api/v1/categories/:id
//@public   Public

export const getSingleColourCtrl = asyncHandler(async (req, res) => {
  const colour = await Colour.findById(req.params.id);

  res.json({
    status: "Success",
    message: "Colour fetched successfully",
    colour,
  });
});

//@desc     Update Category
//@route    PUT /api/v1/categories/:id
//@public   Public
export const updateColourCtrl = asyncHandler(async (req, res) => {
  const { name } = req.body;

  //update
  const colour = await Colour.findByIdAndUpdate(
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
    message: "Colour updated successfully",
    colour,
  });
});

//@desc     Delete Single product
//@route    DELETE /api/Colour/:id
//@public   Public

export const deleteColourCtrl = asyncHandler(async(req, res) => {
  await Colour.findByIdAndDelete(req.params.id);
  res.json({
    status: "Success",
    message: "Colour deleted successfully",
  })
})
