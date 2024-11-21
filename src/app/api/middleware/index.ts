import "dotenv/config";
import { MongoClient, ObjectId } from "mongodb";
let db: any;
let authCollection: any;
let jotsCollection: any;
let profileCollection: any;
let papersCollection: any;
let init = false;
const MONGO_URI = process.env.MONGO_URI || "";

const DATABASE_NAME = process.env.DATABASE_NAME || "xander_app";
export async function connectToDatabase() {
  if (init) {
    console.log("Already connected to database");
    return { db, authCollection, jotsCollection, profileCollection };
  }
  console.log("MONGO_URI", typeof process.env.MONGO_URI);
  console.log("Connecting to database");
  const client = new MongoClient(MONGO_URI, {
    tls: process.env.NODE_ENV === "production" ? true : false,
  });
  await client.connect();
  db = client.db(DATABASE_NAME);
  authCollection = db.collection("auth");
  jotsCollection = db.collection("jots");
  profileCollection = db.collection("profile");
  papersCollection = db.collection("papers");
  init = true;
  return {
    db,
    authCollection,
    jotsCollection,
    profileCollection,
    papersCollection,
  };
}
