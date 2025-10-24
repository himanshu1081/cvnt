import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
    title:
    {
        type: String, required: true
    },
    description: String,
    date: Date,
    capacity: {
        type: Number,
        required: true
    }
});

const Activity = mongoose.models.Activity || mongoose.model("Activity", activitySchema);
export default Activity;
