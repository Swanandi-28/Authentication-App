import client from "@/lib/mongodb"; 
import {NextResponse} from "next/server";
import bcrypt from "bcrypt";

export async function POST(request:Request) {

     const {name, email, password} = await request.json();

     if(!name ||!email ||!password) {
        return NextResponse.json({ message: "All fields are required " }, { status: 400 });
     }

     console.log(name);
     console.log(email);
     console.log(password);

     await client.connect();

     const db = client.db("auth-app");
     const usersCollection = db.collection("users");

     const existingUser = await usersCollection.findOne({email,});
     if (existingUser) {
      return NextResponse.json(
        {
            message: "User already exists."
        },
        {
            status: 409
        }
    );
  }
     const hashedPassword = await bcrypt.hash(password, 10);

     await usersCollection.insertOne({ name, email, password: hashedPassword, });

    return NextResponse.json({ message: "User created successfully!"});
}