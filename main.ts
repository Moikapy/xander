import "dotenv/config";

import { server } from "./server.ts";

async function main() {
  // Start The Server
  await server();
}
main();
