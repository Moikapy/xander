import 'dotenv/config';
import { MongoClient } from "mongodb";

export default function DAO() {
  // MongoDB connection setup
  const MONGO_URI = process.env.MONGO_URI || "";
  const DATABASE_NAME = process.env.DATABASE_NAME || "xander_app";
  let db: any = null;
  let usersCollection = db.collection("users") || null;
  let blogsCollection = db.collection("blogs") || null;
  // profile
  let profileCollection = db.collection("profile") || null;

  function connectToDatabase() {
    if (!db) {
      const client = new MongoClient(MONGO_URI);
      client.connect().then(() => {
        db = client.db(DATABASE_NAME);
        usersCollection = db.collection("users");
        blogsCollection = db.collection("blogs");
        profileCollection = db.collection("profile");
      });
    }
  }
  return {
    db,
    connectToDatabase: connectToDatabase,
    get_usersCollection: () => {
      if (!usersCollection) {
        connectToDatabase();
        usersCollection = db.collection("users");
      }
      return usersCollection;
    },
    get_blogsCollection: () => {
      if (!blogsCollection) {
        connectToDatabase();
        blogsCollection = db.collection("blogs");
      }
      return blogsCollection;
    },
    get_profileCollection: () => {
      if (!profileCollection) {
        connectToDatabase();
        profileCollection = db.collection("profile");
      }
      return profileCollection;
    },
  };
}
