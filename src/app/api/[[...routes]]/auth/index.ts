import { Elysia, t } from "elysia";
import { jwt } from "@elysiajs/jwt";
// DAO
import dao from "@/dao";

let init = false;

export const auth_routes = new Elysia()

  .use(
    jwt({
      name: "jwt",
      secret: process.env.SECRET || "SECRET",
    })
  ) // Auth routes
  .post("/signup", async ({ body, db, usersCollection }) => {
    console.log("eb", typeof db);

    try {
      const { email, password } = body as {
        email: string;
        password: string;
      };

      if (!email || !password) {
        return {
          status: 400,
          body: { message: "Email and password are required" },
        };
      }

      const existingUser = await usersCollection.findOne({ email });
      if (existingUser) {
        return { status: 400, body: { message: "User already exists" } };
      }
      // Hash the password before storing
      const hashedPassword = await Bun.password.hash(password, {
        memoryCost: 4, // memory usage in kibibytes
        timeCost: 3, // the number of iterations
        algorithm: "argon2id",
      });
      await usersCollection.insertOne({ email, password: hashedPassword });
      return { status: 201, body: { message: "User registered successfully" } };
    } catch (error: any) {
      console.log("Error Message - Signup: ", error.message);
      return { status: 500, body: { message: error.message } };
    }
  })
  .post("/login", async ({ body, jwt, db, usersCollection }) => {
    try {
      console.log("eb", typeof db);
      const { email, password } = body as {
        email: string;
        password: string;
      };

      const user = await usersCollection.findOne({ email });

      // Compare the provided password with the hashed password
      const isPasswordValid = await Bun.password.verify(
        password,
        user.password
      );
      if (!isPasswordValid) {
        return {
          status: 401,
          body: { message: "Invalid username or password" },
        };
      }

      const token = await jwt.sign({ email });
      return { status: 200, body: { message: "Login successful", token } };
    } catch (error: any) {
      console.log("Error Message - Login: ", error.message);
      return { status: 500, body: { message: error.message } };
    }
  });
