import "dotenv/config";
import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { html, Html } from "@elysiajs/html";
import { cors } from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";
import { jwt } from "@elysiajs/jwt";
import { opentelemetry } from "@elysiajs/opentelemetry";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";

import {
  renderToReadableStream,
  renderToString,
} from "react-dom/server.browser";
import { createElement } from "react";
import { StaticRouter } from "react-router-dom/server";
import { chat } from "./routes/chat.ts";
import App from "./src/App";
import path from "path";

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

// bundle client side react-code
await Bun.build({
  entrypoints: ["./src/index.tsx"],
  outdir: "./public",
});

const app = new Elysia()
  .use(
    jwt({
      name: "jwt",
      secret: Bun.env.SECRET || "SECRET",
    }),
  )
  .use(cors())
  .use(
    staticPlugin({
      assets: path.resolve(__dirname, "public"),
      prefix: "/",
    }),
  )
  .use(html())
  .use(
    swagger({
      documentation: {
        info: {
          title: "API Documentation",
          version: "0.0.0",
        },
      },
      path: "/api",
    }),
  )
  .use(
    opentelemetry({
      spanProcessors: [
        new BatchSpanProcessor(
          new OTLPTraceExporter({
            url: "https://api.axiom.co/v1/traces",
            headers: {
              Authorization: `Bearer ${Bun.env.AXIOM_TOKEN}`,
              "X-Axiom-Dataset": Bun.env.AXIOM_DATASET,
            },
          }),
        ),
      ],
    }),
  )
  .get(
    "*",
    async (req) => {
      // Parse the URL to get the pathname
      const { pathname } = new URL(req.url, `http://${req.headers.host}`);
      // create our React App component
      const appElement = createElement(
        StaticRouter,
        { location: pathname },
        createElement(App),
      );

      //const stream = await renderToReadableStream(app);

      // Convert the stream to a string
      const body = await renderToString(appElement);
      // construct the full HTML document
      const html = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <link rel="icon" href="/favicon.ico" /> 
                <link rel="stylesheet" href="/global.css">

            </head>
            <body>
                <div id="root">${body}
                </div>
                 <script type="module" src="/index.js"></script>

            </body>
        </html>
      `;

      // output the HTML as the response
      return new Response(html, {
        headers: { "Content-Type": "text/html" },
      });
    },
    {
      detail: {
        hide: true,
      },
    },
  )
  .get("/global.css", () => Bun.file("public/global.css"))

  .get("/index.js", () => Bun.file("public/index.js"))
  .get("/favicon.ico", () => Bun.file("public/favicon.ico"))
  .group("/api", (app) =>
    app.decorate("body", new ChatInput()).post(
      "/chat",
      ({ body }) => chat(body),
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
    ),
  )
  .get("/api/:route", async ({ params }) => {
    const route = params.route;
    // Dynamically serve API files based on the route
    const apiHandler = await import(`./api/${route}`);
    return apiHandler.default();
  })

  .listen({ port: Bun.env.PORT }, ({ hostname, port }) => {
    const url = Bun.env.NODE_ENV === "production" ? "https" : "http";

    console.log(`🦊 The Project is running at ${url}://${hostname}:${port}`);
  });

export type App = typeof app;
