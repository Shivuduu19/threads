import mongoose, { Schema, mongo } from "mongoose";
import { string } from "zod";

const userSchema = new Schema({
    id: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    image: String,
    bio: String,
    threads: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thread'
        }
    ],
    onboarded: {
        type: Boolean,
        default: false,
    },
    communities: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'community',
        }
    ],

})

const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User