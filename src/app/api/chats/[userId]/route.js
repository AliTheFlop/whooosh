import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
const client = new MongoClient(uri);

export async function GET(request, { params }) {
	try {
		const param = await params;
		const userId = param.userId;

		const db = client.db("Whooosh");
		const chats = db.collection("chat");

		const getChats = await chats.find({ userId: userId }).toArray();

		return NextResponse.json({ chats: getChats }, { status: 201 });
	} catch (err) {
		console.log(err);
		return NextResponse.json({ error: err }, { status: 500 });
	}
}
