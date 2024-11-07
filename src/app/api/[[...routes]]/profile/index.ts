import { Elysia, t } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { ObjectId } from "mongodb";
import DAO from "@/dao";
const profile_routes = new Elysia({
  serve: {
    maxRequestBodySize: 1024 * 1024 * 8,
  },
})
  .get(
    "/profile/:handle",
    async ({ params, usersCollection, profileCollection }) => {
      const { handle } = params;
      console.log("handle", handle);
      const profile = await profileCollection.findOne({
        handle,
      });

      if (profile) {
        if (!profile) {
          return {
            status: 404,
            body: {
              message: "Profile not found",
            },
          };
        }
        const user = await usersCollection.findOne({
          _id: profile.user_id,
        });
        return {
          status: 200,
          body: {
            message: "User found",
            user: {
              email: user.email,
              name: profile.name,
              handle: profile.handle,
              bio: profile.bio,
              avatar: profile.avatar,
            },
          },
        };
      }
      return {
        status: 404,
        body: {
          message: "User not found",
        },
      };
    }
  )
  // Get Profile
  .get(
    "/profile",
    async ({ jwt, db, usersCollection, profileCollection, user }) => {
      const _user = await usersCollection.findOne({ email: user.email });
      console.log("user", user);
      if (_user) {
        const profile = await profileCollection.findOne({
          user_id: _user._id,
        });
        if (!profile) {
          return {
            status: 404,
            body: {
              message: "Profile not found",
            },
          };
        }
        return {
          status: 200,
          body: {
            message: "User found",

            email: _user.email,
            name: profile.name,
            handle: profile.handle,
            bio: profile.bio,
            avatar: profile.avatar,
          },
        };
      }
      return {
        status: 404,
        body: {
          message: "User not found",
        },
      };
    },
    { headers: t.Object({ Authorization: t.String() }) }
  ) // Get A User Profile

  // Edit Profile
  .post(
    "/profile/edit",
    async ({ jwt, db, usersCollection, profileCollection, body, user }) => {
      const _user = await usersCollection.findOne({
        email: user.email,
      });

      if (_user) {
        const { name, handle, bio, avatar } = body;
        await profileCollection.updateOne(
          { user_id: _user._id },
          {
            $set: {
              name,
              handle,
              bio,
              avatar,
              user_id: _user._id,
            },
          },
          { upsert: true }
        );
        return {
          status: 200,
          body: {
            message: "Profile updated",
          },
        };
      }
      return {
        status: 404,
        body: {
          message: "User not found",
        },
      };
    },
    {
      headers: t.Object({
        Authorization: t.String(),
      }),
      body: t.Object({
        name: t.String(),
        handle: t.String(),
        bio: t.String(),
        avatar: t.File(),
      }),
    }
  );
export default profile_routes;
