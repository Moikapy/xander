import { Elysia, t } from "elysia";
import { rateLimit } from "elysia-rate-limit";
import { Logger } from 'next-axiom';
//API Routes
import  chat  from "../../../../lib/chat";

class ChatInput {
  prompt: string;
  model: string;
  temperature: number;
  system_message: string;
  max_tokens: number;

  constructor(
    prompt: string = "",
    model: string = "claude-3-5-haiku-20241022",
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
      max: 50,
    })
  )
  .decorate("body", new ChatInput())
  .post(
    "/chat",
    async ({ body }) => {
      const log = new Logger();
      log.info("Model used: ", { model_name: body.model });

      //await log.flush()
      return chat(body);
    },
    {
      body: t.Object({
        prompt: t.String({
          minLength: 1,
        }),
        model: t.String({
          default: "claude-3-5-haiku-20241022",
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
    }
  );
export default studio_routes;
