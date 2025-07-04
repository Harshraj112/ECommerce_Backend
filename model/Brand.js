//Brand Schema
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const BrandSchema = new Schema (
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        product: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
        ],
    },
    { timestamps: true }
);

const Brand = mongoose.model("Brand", BrandSchema);

export default Brand;