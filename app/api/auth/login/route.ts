import {NextResponse} from "next/server";
import client from "@/lib/mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request: Request){

    const {email, password}= await request.json();
    console.log("Email received:", email);

    if(!email || !password){
        return NextResponse.json({ message: "All fields are required"}, { status:400});
    }

    await client.connect();

    const db=client.db("auth-app");
    const usersCollection=db.collection("users");

    const user= await usersCollection.findOne({email});
    console.log("User found:", user);

    if(!user){
        return NextResponse.json({ message: "User not found"}, { status:404});
    }

    const isMatch = await bcrypt.compare( password, user.password);

    if (!isMatch) {
        return NextResponse.json(
            {
                message: "Invalid password."
            },
            {
                status: 401
            }
        );
    }

    const token = jwt.sign(
    { 
        email:user.email,
        name:user.name,
    },
    process.env.JWT_SECRET!,
    {
        expiresIn: "1d",
    }
    );

    return NextResponse.json({
        message: "Login Successful!",
        token,
    });


}