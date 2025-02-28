import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
const client = new MongoClient(uri);

export async function POST(request, { params }) {
	try {
		const { messageData: userMessage, aiResponse } = await request.json();
		const chatId = params.id;

		const db = client.db("Whooosh");
		const messages = db.collection("messages");

		const newMessage = {
			userMessage,
			aiResponse,
			chatId: chatId,
			timestamp: new Date(),
		};

		const result = await messages.insertOne(newMessage);
		return NextResponse.json({ success: true }, { status: 201 });
	} catch (err) {
		console.log(err);
		return NextResponse.json({ error: err }, { status: 500 });
	}
}
