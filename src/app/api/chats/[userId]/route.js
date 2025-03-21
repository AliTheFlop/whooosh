import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function GET(request, { params }) {
	try {
		const param = await params;
		const userId = param.userId;

		const db = client.db("Whooosh");
		const chats = db.collection("chat");

		const getChats = await chats
			.find({ userId: userId })
			.sort({ timestamp: -1 })
			.toArray();

		return NextResponse.json({ chats: getChats }, { status: 201 });
	} catch (err) {
		console.log(err);
		return NextResponse.json({ error: err }, { status: 500 });
	}
}
