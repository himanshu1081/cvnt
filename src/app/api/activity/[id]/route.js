import Activity from "@/app/models/Activity";
import dbConnect from "@/app/lib/dbConnect";
import { verifyToken } from "@/app/lib/jwt";

export async function GET(req, { params }) {
    try {
        await dbConnect();
        const { id } = await params
        if (!id) {
            return new Response(JSON.stringify({ message: "No id found" }), { status: 404 })
        }
        const activity = await Activity.findById(id)
        if (!activity) {
            return new Response(JSON.stringify({ message: "No activity found" }), { status: 404 })
        }
        return new Response(JSON.stringify({ message: "Activity Fetched", data: activity }), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }
}

export async function POST(req) {
    try {
        await dbConnect();
        const token = req.headers.get("authorization")?.split(" ")[1];
        const { title, description, date, capacity } = await req.json();
        if (!title || !description || !date || !capacity) {
            return new Response(JSON.stringify({ message: "All fields are required!" }), { status: 400 })
        }
        const isLoggedIn = verifyToken(token)
        if (!isLoggedIn) {
            return new Response(JSON.stringify({ message: "User not logged in" }), { status: 401 })
        }
        if (!isLoggedIn.isadmin) {
            return new Response(JSON.stringify({ message: "Admin access required" }), { status: 403 });
        }
        const activity = await Activity.create({
            title,
            description,
            date: new Date(date),
            capacity
        })
        return new Response(JSON.stringify({ message: "Activity Created", data: activity }), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }
}

export async function PUT(req, { params }) {
    try {
        await dbConnect();
        const { id } = await params
        const body = await req.json();
        const token = req.headers.get("authorization")?.split(" ")[1];
        if (!id) {
            return new Response(JSON.stringify({ message: "No id found" }), { status: 404 })
        }
        const isLoggedIn = verifyToken(token)
        if (!isLoggedIn) {
            return new Response(JSON.stringify({ message: "User not logged in" }), { status: 401 })
        }
        if (!isLoggedIn.isadmin) {
            return new Response(JSON.stringify({ message: "Admin access required" }), { status: 403 });
        }
        const activity = await Activity.findById(id)
        if (!activity) {
            return new Response(JSON.stringify({ message: "No activity found" }), { status: 404 })
        }
        const updatedActivity = await Activity.findByIdAndUpdate(id, body, { new: true });

        return new Response(JSON.stringify({ message: "Activity Updated", data: updatedActivity }), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }
}

export async function DELETE(req, { params }) {
    try {
        await dbConnect();

        const { id } = await params

        const token = req.headers.get("authorization")?.split(" ")[1];
        if (!id) {
            return new Response(JSON.stringify({ message: "No id found" }), { status: 404 })
        }

        const isLoggedIn = verifyToken(token)
        if (!isLoggedIn) {
            return new Response(JSON.stringify({ message: "User not logged in" }), { status: 401 })
        }

        if (!isLoggedIn.isadmin) {
            return new Response(JSON.stringify({ message: "Admin access required" }), { status: 403 });
        }

        const activity = await Activity.findById(id)
        if (!activity) {
            return new Response(JSON.stringify({ message: "No activity found" }), { status: 404 })
        }

        const updatedActivity = await Activity.findByIdAndDelete(id);
        return new Response(JSON.stringify({ message: "Activity Deleted", data: updatedActivity }), { status: 200 })

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }
}
