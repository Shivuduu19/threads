import mongoose, { Schema, mongo } from "mongoose";
import { string } from "zod";

const communitySchema = new Schema({
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
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]

})

const Community = mongoose.models.Community || mongoose.model('Community', communitySchema)
export default Community