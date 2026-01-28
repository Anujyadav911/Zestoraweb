import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "First name must contain at least 3 characters!"],
    },
    lastName: {
        type: String,
        required: false,
        minLength: [3, "Last name must contain at least 3 characters!"],
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Provide a valid email!"],
        unique: true,
    },
    googleId: {
        type: String,
        required: true,
        unique: true,
    },
    photo: {
        type: String,
    },
    role: {
        type: String,
        default: "user",
    }
});

export const User = mongoose.model("User", userSchema);
