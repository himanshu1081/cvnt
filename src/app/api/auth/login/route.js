import { generateToken } from "@/app/lib/jwt";
import User from "@/app/models/User";
import bcrypt from 'bcrypt';
import dbConnect from "@/app/lib/dbConnect";


export async function POST(req) {
    try {
        await dbConnect();
        const { email, password } = await req.json();

        if (!email || !password) {
            return new Response(JSON.stringify({ message: "All fields required" }), { status: 400 })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return new Response(JSON.stringify({ message: "No user found" }), { status: 404 })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return new Response(JSON.stringify({ message: "Wrong password" }), { status: 401 })
        }

        const token = generateToken(user)

        return new Response(JSON.stringify({ message: "Login Successfull", token, user: { id: user._id, email: user.email, isadmin: user.isadmin } }), { status: 200 })

    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: "Something went wrong" }), { status: 500 })
    }
}