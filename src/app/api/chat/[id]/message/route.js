import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
	try {
		const { userMessage, aiResponse } = await request.json();

		const client = await clientPromise;
		const db = client.db("Whooosh");
		const messages = db.collection("messages");

		await messages.insertMany([userMessage, aiResponse]);
		return NextResponse.json({ success: true }, { status: 201 });
	} catch (err) {
		console.log(err);
		return NextResponse.json({ error: err }, { status: 500 });
	}
}
