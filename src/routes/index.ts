import { chat } from "./chat";
export async function init_routes(app: any) {
  await chat(app);
}
