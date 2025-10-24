import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/models/User";


export async function POST(req) {
    try {
        await dbConnect();
        const { email, password, name } = await req.json();
        if (!email || !password || !name) {
            return new Response(JSON.stringify({ message: "All fields not set" }), { status: 400 })
        }
        const alreadyExist = await User.findOne({ email });
        if (alreadyExist) {
            return new Response(JSON.stringify({ message: "User already exists!" }), { status: 400 })
        }
        const user = await User.create({
            name,
            email,
            password,
            isadmin:true
        });
        const { password: _, ...userData } = user.toObject();
        return new Response(JSON.stringify({ message: "User registered Sucessfully", data: userData }), { status: 201 })

    } catch (error) {
        return new Response(JSON.stringify({ error: "server error" }), { status: 500 })
    }
}