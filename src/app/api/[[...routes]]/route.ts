import "dotenv/config";
import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors, HTTPMethod } from "@elysiajs/cors";

import { jwt } from "@elysiajs/jwt";
import { withAxiom } from 'next-axiom';
// Routes
import studio_routes from "./studio";

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
  .use(
    jwt({
      name: "jwt",
      secret: process.env.SECRET || "SECRET",
    }),
  )
  .use(cors(corsConfig))
  .use(swagger(swaggerConfig))

  .use(studio_routes);

// Expose methods
export const GET = withAxiom(app.handle);
export const POST = withAxiom(app.handle);
export const PATCH = withAxiom(app.handle);
export const DELETE = withAxiom(app.handle);
export const PUT = withAxiom(app.handle);

export type API = typeof app;
