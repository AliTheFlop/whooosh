import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
	try {
		const body = await request.json();

		const client = await clientPromise;
		const db = client.db("Whooosh");
		const users = db.collection("users");

		const newUser = {
			username: body.username,
			email: body.email,
			hashedPassword: await bcrypt.hash(body.password, 10),
			createdAt: new Date(),
			lastLoggedIn: new Date(),
		};

		const existingUser = await users.findOne({ email: body.email });

		if (existingUser) {
			return NextResponse.json(
				{ error: "Email is already being used." },
				{ status: 400 }
			);
		}

		const result = await users.insertOne(newUser);
		return NextResponse.json({ success: true }, { status: 201 });
	} catch (err) {
		console.log(err);
		return NextResponse.json({ error: err }, { status: 500 });
	}
}
