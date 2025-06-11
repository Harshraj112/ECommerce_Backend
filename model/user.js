import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order"
        },
    ],
    wishLists: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "wishList"
        },
    ],
    isAdmin: {
        type: Boolean,
        default: false
    },
    hasShippingAddress: {
        type: Boolean,
        default: false
    },
    ShippingAddress: {
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        address: {
            type: String
        },
        city: {
            type: String
        },
        postalCode: {
            type: Number
        },
        province: {
            type: String
        },
        country: {
            type: String
        },
        phoneNo: {
            type: String
        }
    },
}, {
    timestamps: true        //Automatically put time and date when it created
});

//Compile the Schema to model
const User = mongoose.model('User', userSchema);        //It creates a model called User based on the userSchema.

export default User;