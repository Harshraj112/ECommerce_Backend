import asyncHandler from "express-async-handler";
import Category from "../model/Category.js";

//@desc     Create New Category
//@route    Post /api/v1/categories
//@public   Private/Admin

export const createCategoryCtrl = asyncHandler(async (req, res) => {
    const {name} = req.body;
    //Category exists
    const categoryFound = await Category.findOne({name})
    if(categoryFound) {
        throw new Error("Category Found !!")
    }

    //Create
    const category = await Category.create({
        name,
        user: req.userAuthId,
    })

    res.json({
        status: "Success",
        message: "Category created successfully",
        category
    })
})