import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
const client = new MongoClient(uri);

export async function POST(request, { params }) {
	try {
		const param = await params;
		const chatId = param.id;

		const { userId } = await request.json();

		console.log(userId);

		const db = client.db("Whooosh");
		const chats = db.collection("chat");

		const chatExists = await chats.findOne({ chatId: chatId });

		if (chatExists) {
			const getMessages = await db
				.collection("messages")
				.find({ chatId })
				.toArray();

			return NextResponse.json(
				{ messages: getMessages },
				{ status: 201 }
			);
		}

		const newChat = {
			chatId: chatId,
			userId: userId,
			timestamp: new Date(),
		};

		const result = await chats.insertOne(newChat);
		return NextResponse.json({ success: true }, { status: 200 });
	} catch (err) {
		console.log(err);
		return NextResponse.json({ error: err }, { status: 500 });
	}
}
