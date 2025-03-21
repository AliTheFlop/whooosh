import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
	try {
		const param = await params;
		const userId = param.userId;

		const client = await clientPromise;
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
