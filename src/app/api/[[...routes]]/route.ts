import "dotenv/config";
import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors, HTTPMethod } from "@elysiajs/cors";
import { MongoClient, ObjectId } from "mongodb";
import { withAxiom } from "next-axiom";
// Routes
import { auth_routes } from "./auth";
import studio_routes from "./studio";
// DAO
// MongoDB connection setup
let init = false
  const MONGO_URI = process.env.MONGOURI || "mongodb://mongo:27017";
  const DATABASE_NAME = process.env.DATABASE_NAME || "xander_app";
let db: any;
let usersCollection: any;
let blogsCollection: any;

async function connectToDatabase() {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  db = client.db(DATABASE_NAME);
  usersCollection = db.collection("users");
  blogsCollection = db.collection("blogs");
}


const corsConfig = {
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE", "PUT"] as HTTPMethod[],
  allowedHeaders: "*",
  exposedHeaders: "*",
  maxAge: 5,
};

const swaggerConfig = {
  documenation: {
    info: {
      title: "API Documentation",
      version: "0.0.0",
    },
  },
  path: "/",
};

const app = new Elysia({ prefix: "/api" })
  .use(cors(corsConfig))
  .use(swagger(swaggerConfig))
  .resolve(async () => {
    if (!init) {
      console.log("Connecting");
      connectToDatabase();
      init = true;
      
    } else {
      console.log("Connected to MongoDB");
    }
    return { db, usersCollection, blogsCollection };
  })
  .use(auth_routes)
  .use(studio_routes);

// Expose methods
export const GET = withAxiom(app.handle);
export const POST = withAxiom(app.handle);
export const PATCH = withAxiom(app.handle);
export const DELETE = withAxiom(app.handle);
export const PUT = withAxiom(app.handle);

export type API = typeof app;
