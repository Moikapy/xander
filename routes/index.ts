import { chat } from "./chat.ts";
export async function init_routes(app: any) {
  await chat(app);
}
