import "dotenv/config";

import { server } from "./server";

async function main() {
  // Start The Server
  await server();
}
main();
