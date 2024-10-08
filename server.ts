import express from "express";
import "dotenv/config";
import { init_routes } from "./routes";
import bodyParser from "body-parser";

export async function server() {
  try {
    console.log("Starting Systems...")
    //init express
    const app = express();
    console.log("Attaching Middleware");
    
    app.use(bodyParser.json());
    console.log("Initializng Routes");
    
    await init_routes(app);

    // Start server and listen to PORT
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Online at: http://localhost:${process.env.PORT || 3000}`);
    });
  } catch (error) {
    console.log("Error Message:", error.message);
    //ADD ERROR LOGGING FOR SERVER
  }
}

