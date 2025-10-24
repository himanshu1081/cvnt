import Activity from "@/app/models/Activity";
import dbConnect from "@/app/lib/dbConnect";

export async function GET(req) {
    try {
        await dbConnect();
        const allActivities = await Activity.find()
        if (!allActivities) {
            return new Response(JSON.stringify({ message: "No activities found" }), { status: 404 })
        }
        return new Response(JSON.stringify({ message: "Activities Fetched", data: allActivities }), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ error: error }), { status: 500 })
    }
}