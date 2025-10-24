import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    userId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    activityId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Activity",
        required: true
    }
}, { timestamps: true });

const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
export default Booking;
