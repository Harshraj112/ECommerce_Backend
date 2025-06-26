//Colour Schema 
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ColourSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
    },
    { timestamps: true }
);

const Colour = mongoose.model("color", ColourSchema);
export default Colour;