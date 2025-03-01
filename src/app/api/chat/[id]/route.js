import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
const client = new MongoClient(uri);

export async function GET(request, { params }) {
	try {
		const param = await params;
		const chatId = param.id;

		const db = client.db("Whooosh");
		const chats = db.collection("chat");

		const chatExists = await chats.findOne({ chatId: chatId });

		console.log(chatExists);

		if (chatExists) {
			const getMessages = await db
				.collection("messages")
				.find({ chatId })
				.toArray();

			console.log(getMessages);

			return NextResponse.json(
				{ messages: getMessages },
				{ status: 201 }
			);
		}

		const newChat = {
			chatId: chatId,
			timestamp: new Date(),
		};

		return NextResponse.json({ error: true }, { status: 500 });
	} catch (err) {
		console.log(err);
		return NextResponse.json({ error: err }, { status: 500 });
	}
}
