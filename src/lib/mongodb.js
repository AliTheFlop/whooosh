import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {
	maxPoolSize: 10, // Adjust based on your needs
};

let client;
let clientPromise;

if (!uri) {
	throw new Error("Please add your MongoDB URI to .env");
}

if (process.env.NODE_ENV === "development") {
	// In development, use a global variable to preserve the connection across hot reloads
	if (!global._mongoClientPromise) {
		client = new MongoClient(uri, options);
		global._mongoClientPromise = client.connect();
	}
	clientPromise = global._mongoClientPromise;
} else {
	// In production, create a new connection
	client = new MongoClient(uri, options);
	clientPromise = client.connect();
}

export default clientPromise;
