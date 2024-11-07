import "dotenv/config";
import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors, HTTPMethod } from "@elysiajs/cors";
import { MongoClient, ObjectId } from "mongodb";
import { withAxiom } from "next-axiom";
import { jwt } from "@elysiajs/jwt";
// Routes
import { auth_routes } from "./auth";
import studio_routes from "./studio";
import profile_routes from "./profile";
import { validate_auth } from "./auth/validate_auth";
// DAO
// MongoDB connection setup
let init = false;
const MONGO_URI = "mongodb://localhost:27017";
const DATABASE_NAME = process.env.DATABASE_NAME || "xander_app";
let db: any;
let usersCollection: any;
let blogsCollection: any;
let profileCollection: any;

async function connectToDatabase() {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  db = client.db(DATABASE_NAME);
  usersCollection = db.collection("users");
  blogsCollection = db.collection("blogs");
  profileCollection = db.collection("profile");
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
        title: "Xander API Documentation",
        version: "0.0.0",
      },
    },

    path: "/",
  };

export function useAPI(prefix?: string) {

  const app = new Elysia({ prefix: prefix || "" })
    .use(
      jwt({
        name: "jwt",
        secret: process.env.SECRET || "SECRET",
      })
    ) // Auth routes
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
      return { db, usersCollection, blogsCollection,profileCollection };
    })
    .use(auth_routes) //auth routes
    .derive(validate_auth)
    .use(studio_routes)
    .use(profile_routes);

  return app;
}

const app = useAPI("/api");

// Expose methods
export const GET = withAxiom(app.handle);
export const POST = withAxiom(app.handle);
export const PATCH = withAxiom(app.handle);
export const DELETE = withAxiom(app.handle);
export const PUT = withAxiom(app.handle);

export type API = typeof app;
