import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    brand: {
        type: String,
        required: true
    },

    category:
        {
            type: String,
            ref: "Category",
            required: true,
        },

    sizes: {
        type: [String],
        enum: ["S", "M", "L", "XL", "XXl"],
        required: true,
    },

    colors: {
        type: [String],
        require: true,
    },

    images: [
        {
            type: String,
            default: "https://via.placeholder.com/150",
        },
    ],

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },

    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        },
    ],

    price: {
        type: Number,
        required: true,
    },

    totalQty: {
        type: Number,
        required: true,
    },

    totalSold: {
        type: Number,
        required: true,
        default: 0,
    }

}, {
    timestamps: true,        //Automatically put time and date when it created
    toJSON: {virtuals: true},
});
//Virtuals
//Total rating
ProductSchema.virtual('totalReviews').get(function() {
    console.log(this);
})

//Compile the Schema to model
const Product = mongoose.model('Product', ProductSchema);        //It creates a model called Product based on the productSchema.

export default Product;