import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function POST(request, { params }) {
	try {
		const { userMessage, aiResponse } = await request.json();
		const param = await params;
		const chatId = param.id;

		const db = client.db("Whooosh");
		const messages = db.collection("messages");

		await messages.insertMany([userMessage, aiResponse]);
		return NextResponse.json({ success: true }, { status: 201 });
	} catch (err) {
		console.log(err);
		return NextResponse.json({ error: err }, { status: 500 });
	}
}
