import "dotenv/config";
import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors, HTTPMethod } from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";
import { jwt } from "@elysiajs/jwt";
import { opentelemetry } from "@elysiajs/opentelemetry";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";
import { withAxiom, AxiomRequest } from 'next-axiom';
// Routes
import studio_routes from "./studio/index.ts";

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