import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

// GET To get an older chat
export async function GET(request, { params }) {
	try {
		const param = await params;
		const chatId = param.id;

		const client = await clientPromise;
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
		return NextResponse.json({ error: err }, { status: 500 });
	}
}

export async function DELETE(request, { params }) {
	try {
		const param = await params;
		const chatId = param.id;

		const db = client.db("Whooosh");
		const chats = db.collection("chat");

		const result = await chats.deleteOne({
			_id: ObjectId.createFromHexString(chatId),
		});

		if (result.deletedCount === 1) {
			return NextResponse.json(
				{ success: true, message: "Chat deleted successfully." },
				{ status: 200 }
			);
		} else {
			return NextResponse.json(
				{ success: false, message: "Chat not found." },
				{ status: 404 }
			);
		}
	} catch (err) {
		return NextResponse.json(
			{ error: true, message: err },
			{ status: 500 }
		);
	}
}
