import dbConnect from "@/app/lib/dbConnect";
import Booking from "@/app/models/Booking";
import Activity from "@/app/models/Activity";
import { verifyToken } from "@/app/lib/jwt";

export async function POST(req) {
    try {
        await dbConnect();
        const {activityId} = await req.json();
        const activity = await Activity.findById(activityId)
        if (!activity) {
            return new Response(JSON.stringify({ message: "No activity found" }), { status: 404 })
        }
        const token = req.headers.get("authorization")?.split(" ")[1];

        const isLoggedIn = verifyToken(token)
        if (!isLoggedIn) {
            return new Response(JSON.stringify({ message: "User not logged in" }), { status: 401 })
        }
        const userId = isLoggedIn.id;

        const alreadyBooked = await Booking.findOne({ userId, activityId })
        if (alreadyBooked) {
            return new Response(JSON.stringify({ message: "Activity already booked" }), { status: 400 })
        }
        const bookingCount = await Booking.countDocuments({ activityId });
        if (bookingCount >= activity.capacity) {
            return new Response(JSON.stringify({ message: "Activity is fully booked" }), { status: 400 });
        }

        const booking = await Booking.create({
            userId,
            activityId
        })
        return new Response(JSON.stringify({ message: "Booking Done", data: booking }), { status: 201 })
    } catch (error) {
        console.error("Booking Error:", error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }
}