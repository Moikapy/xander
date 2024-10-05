import express from "express";
import "dotenv/config";
import { init_routes } from "./routes";
import bodyParser from "body-parser";

export async function server() {
  try {
    //init express
    const app = express();

    app.use(bodyParser.json());

    await init_routes(app);

    // Start server and listen to PORT
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server listening on port: ${process.env.PORT || 3000}`);
    });
  } catch (error) {
    console.log("Error Message:", error.message);
    //ADD ERROR LOGGING FOR SERVER
  }
}
