import {MongoClient, ObjectId} from 'mongodb';
let db: any;
let usersCollection: any;
let blogsCollection: any;
let profileCollection: any;
let init = false;
const MONGO_URI = 'mongodb://mongo:27017';
const DATABASE_NAME = process.env.DATABASE_NAME || 'xander_app';
export async function connectToDatabase() {

  if (init) {
    console.log('Already connected to database');
    return {db, usersCollection, blogsCollection, profileCollection};
  }
  console.log('Connecting to database');
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  db = client.db(DATABASE_NAME);
  usersCollection = db.collection('users');
  blogsCollection = db.collection('blogs');
  profileCollection = db.collection('profile');
  init = true;
  return {db, usersCollection, blogsCollection, profileCollection};
}
