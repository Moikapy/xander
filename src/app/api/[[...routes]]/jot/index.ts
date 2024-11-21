import { Elysia, t } from "elysia";
import { validate_auth } from "../auth/validate_auth";
import jwt from "@elysiajs/jwt";
import { connectToDatabase } from "../../middleware";

const jot_routes = new Elysia({
  prefix: "/jot",
  serve: {
    maxRequestBodySize: 1024 * 1024 * 8,
  },
})
  .use(
    jwt({
      name: "jwt",
      secret: process.env.SECRET || "SECRET",
    })
  )
  .resolve(connectToDatabase)
  .derive(validate_auth)
  .post(
    "/create",
    async ({
      body,
      set,
      user,
      authCollection,
      profileCollection,
      jotsCollection,
    }) => {
      try {
        if (!user) {
          set.status = 401;
          return {
            message: "Unauthorized",
          };
        }
        // Check if user exists
        const auth = await authCollection.findOne({ email: user.email });
        if (!auth) {
          set.status = 401;
          return {
            message: "Unauthorized",
          };
        }
        // Check if profile exists
        const profile = await profileCollection.findOne({ auth_id: auth._id });
        if (!profile) {
          set.status = 401;
          return {
            message: "Unauthorized",
          };
        }
        // Create jot
        await jotsCollection.insertOne({
          profile_id: profile._id,
          content: body.content,
          created_at: new Date(),
          updated_at: new Date(),
        });
        set.status = 200;
        return {
          message: "created",
        };
      } catch (error) {
        set.status = 500;
        return {
          message: "Error: " + error,
        };
      }
    },
    {
      body: t.Object({
        content: t.String(),
      }),
    }
  )
  .get(
    "/:id",
    async ({ params: { id }, set, profileCollection, jotsCollection }) => {
      //  check if jot exists
      const jot = await jotsCollection.findOne({ _id: id });
      if (!jot) {
        set.status = 404;
        return {
          message: "Jot not found",
        };
      }
      // check if profile exists
      const profile = await profileCollection.findOne({ _id: jot.profile_id });
      if (!profile) {
        set.status = 404;
        return {
          message: "Profile not found",
        };
      }
      set.status = 200;
      return {
        message: "success",
        jot,
        profile,
      };
    }
  )
  // update jot
  .patch(
    "/:id",
    async ({ body, params: { id }, set, user, authCollection, jotsCollection }) => {
      // check if user exists
      const auth = await authCollection.findOne({ email: user.email });
      if (!auth) {
        set.status = 401;
        return {
          message: "Unauthorized",
        };
      }
      // check if jot exists
      const jot = await jotsCollection.findOne({ _id: id });
      if (!jot) {
        set.status = 404;
        return {
          message: "Jot not found",
        };
      }
      // update jot
      await jotsCollection.updateOne(
        { _id: id },
        {
          $set: {
            content: body.content,
            updated_at: new Date(),
          },
        }
      );
      set.status = 200;
      return {
        message: "updated",
      };
    } 
  )
  

export default jot_routes;
