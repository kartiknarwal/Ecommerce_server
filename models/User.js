import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        default: "user",
    },
}, {
    timestamps: true, // Correct usage of timestamps
});

export const User = mongoose.model("User", userSchema);
