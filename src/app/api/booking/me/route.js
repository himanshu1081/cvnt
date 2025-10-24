import dbConnect from "@/app/lib/dbConnect";
import Booking from "@/app/models/Booking";
import Activity from "@/app/models/Activity";
import { verifyToken } from "@/app/lib/jwt";

export async function GET(req) {
    try {
        await dbConnect();
        const token = req.headers.get("authorization")?.split(" ")[1];

        const isLoggedIn = verifyToken(token)
        if (!isLoggedIn) {
            return new Response(JSON.stringify({ message: "User not logged in" }), { status: 401 })
        }
        const userId = isLoggedIn.id;
        const getBookingDetails = await Booking.find({ userId });
        return new Response(JSON.stringify({ message: "All Booking details fetched", getBookingDetails }), { status: 200 })
    } catch (error) {
        console.error("Booking Error:", error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }
}