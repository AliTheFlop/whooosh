import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
const client = new MongoClient(uri);

// GET To get an older chat
export async function GET(request, { params }) {
	try {
		const param = await params;
		const chatId = param.id;

		const db = client.db("Whooosh");
		const chats = db.collection("chat");

		const chatExists = await chats.findOne({
			_id: ObjectId.createFromHexString(chatId),
		});

		if (chatExists) {
			const getMessages = await db
				.collection("messages")
				.find({ chatId })
				.toArray();

			return NextResponse.json(
				{ messages: getMessages, chatTitle: chatExists.chatTitle },
				{ status: 201 }
			);
		} else {
			return NextResponse.json(
				{ error: "Chat not found..." },
				{ status: 400 }
			);
		}
	} catch (err) {
		console.log(err);
		return NextResponse.json({ error: err }, { status: 500 });
	}
}
