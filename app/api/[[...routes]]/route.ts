import "dotenv/config";
import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors, HTTPMethod } from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";
import { jwt } from "@elysiajs/jwt";
import { opentelemetry } from "@elysiajs/opentelemetry";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";



//API Routes
import { chat } from "../../routes/chat.ts";



class ChatInput {
  prompt: string;
  model: string;
  temperature: number;
  system_message: string;
  max_tokens: number;

  constructor(
    prompt: string = "",
    model: string = "claude-2-haiku-20240307",
    temperature: number = 0.5,
    system_message: string = "You are a chill assistant.",
    max_tokens: number = 200,
  ) {
    this.prompt = prompt;
    this.model = model;
    this.temperature = temperature;
    this.system_message = system_message;
    this.max_tokens = max_tokens;
  }
}

const corsConfig = {
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'], 
  allowedHeaders: '*',
  exposedHeaders: '*',
  maxAge: 5,

};

    const swaggerConfig={
      documenation: {
        info: {
          title: "API Documentation",
          version: "0.0.0",
        },
      },
     path:'/'
    }


const app = new Elysia({ prefix: '/api' })
  .use(
    jwt({
      name: "jwt",
      secret: process.env.SECRET || "SECRET",
    }),
  )
  .use(cors(corsConfig))
  .use(
    swagger(swaggerConfig),
  )
  .post("/chat",({ body }) => chat(body),
      {
        body: t.Object({
          prompt: t.String({
            minLength: 1,
          }),
          model: t.String({
            default: "claude-3-haiku-20240307",
          }),
          temperature: t.Number({
            default: 0.5,
          }),
          max_tokens: t.Number({
            default: 200,
          }),
          system_message: t.String({
            default: "you are a helpful assistant",
          }),
        }),
      },
      {
        detail: {
          summary: "Chat with AI",
          tag: ["Chat"],
        },
      },
    ).onError(({ code, error }) => {
    console.log(code)
    return new Response(JSON.stringify({ error: error.toString() }), { status: 500 })
})

// Expose methods
export const GET = app.handle;
export const POST = app.handle;
export const PATCH = app.handle;
export const DELETE = app.handle;
export const PUT = app.handle;

export type API = typeof app;
