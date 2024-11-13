import  chat  from "../lib/chat";
export async function init_routes(app: any) {
  await chat(app);
}
