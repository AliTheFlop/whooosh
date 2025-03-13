import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
const client = new MongoClient(uri);

// POST To make a new chat
export async function POST(request) {
	try {
		const { userId, chatTitle } = await request.json();

		const db = client.db("Whooosh");
		const chats = db.collection("chat");

		const newChat = {
			userId: userId,
			chatTitle: chatTitle,
			timestamp: new Date(),
		};

		const result = await chats.insertOne(newChat);

		const generatedChatId = result.insertedId.toString();
		return NextResponse.json({ generatedChatId }, { status: 200 });
	} catch (err) {
		return NextResponse.json({ error: err }, { status: 500 });
	}
}
