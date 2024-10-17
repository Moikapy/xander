import { Elysia, t } from "elysia";
import { rateLimit } from "elysia-rate-limit";
//API Routes
import { chat } from "../../../routes/chat.ts";

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

const studio_routes = new Elysia()
  .use(
    rateLimit({
      number: 50,
    }),
  )
  .decorate("body", new ChatInput())
  .post(
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
  );
export default studio_routes;
