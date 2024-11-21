import { Elysia, t } from "elysia";
import handleFileSpaces from "@/utilities/handle_file_spaces";
import { connectToDatabase } from "../../middleware";
// DAO

import { validate_auth } from "../auth/validate_auth";
import jwt from "@elysiajs/jwt";
import {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectRequest,
} from "@aws-sdk/client-s3";
const profile_routes = new Elysia({
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
  // get all profiles
  .get("/profiles", async ({ profileCollection, set }) => {
    try {
      const profiles = await profileCollection.find().toArray();
      if (profiles) {
        set.status = 200;
        return {
          status: 200,

          message: "Profiles found",
          profiles: profiles.map((profile) => {
            return {
              name: profile.name,
              handle: profile.handle,
              bio: profile.bio,
              avatar:
                "https://xander-files.nyc3.cdn.digitaloceanspaces.com" +
                profile.avatar,
            };
          }),
        };
      }
      set.status = 404;
      return {
        status: 404,

        message: "Profiles not found",
      };
    } catch (error) {
      set.status = 500;
      return {
        status: 500,

        message: "Internal server error",
      };
    }
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

            message: "Profile not found",
          };
        }
        const user = await usersCollection.findOne({
          _id: profile.user_id,
        });
        return {
          status: 200,

          message: "User found",
          user: {
            email: user.email,
            name: profile.name,
            handle: profile.handle,
            bio: profile.bio,
            avatar:
              "https://xander-files.nyc3.cdn.digitaloceanspaces.com" +
              profile.avatar,
          },
        };
      }
      return {
        status: 404,

        message: "User not found",
      };
    }
  )
  // Get Profile
  .derive(validate_auth)
  .get(
    "/profile",
    async ({ jwt, db, usersCollection, profileCollection, user, set }) => {
      try {
        const _user = await usersCollection.findOne({ email: user.email });

        if (_user) {
          const profile = await profileCollection.findOne({
            user_id: _user._id,
          });
          console.log("user", profile);
          if (!profile) {
            return {
              status: 404,

              message: "Profile not found",
            };
          }
          set.status = 200;
          return {
            status: 200,

            message: "User found",
            email: _user.email,
            name: profile.name,
            handle: profile.handle,
            bio: profile.bio,
            avatar:
              "https://xander-files.nyc3.cdn.digitaloceanspaces.com" +
              profile.avatar,
          };
        }
        set.status = 404;
        return {
          status: 404,

          message: "User not found",
        };
      } catch (error) {
        set.status = 500;
        return {
          status: 500,

          message: "Internal server error",
        };
      }
    }
  ) // Get A User Profile

  // Edit Profile

  .post(
    "/profile/edit",
    async ({ authCollection, profileCollection, body, user, set }) => {
      // console.log('user', user);
      try {
        const _user = await authCollection.findOne({
          email: user.email,
        });

        if (_user) {
          const { name, handle, bio, avatar } = body;
          let avatarUrl = null;

          // Retrieve the current avatar URL from MongoDB
          const currentProfile = await profileCollection.findOne({
            user_id: _user._id,
          });
          // Extract the avatar URL from the profile, if it exists
          const currentAvatarUrl = currentProfile
            ? currentProfile.avatar
            : null;

          // Check if avatar is provided as a base64 string
          if (avatar) {
            //console.log('avatar', avatar);

            const { s3, SPACE_NAME } = await handleFileSpaces();
            const mimeType = avatar.type;
            const avatarBuffer = await avatar.arrayBuffer();
            const fileBuffer = Buffer.from(avatarBuffer);
            const s3Params: any = {
              Bucket: SPACE_NAME || "",
              Key: `avatars/0x69420${_user._id}8008`, // Create a unique file path
              Body: fileBuffer, // The binary buffer of the decoded file
              //ContentEncoding: 'base64', // Required to indicate base64 encoding
              ContentType: mimeType, // Update based on file type if necessary
              ACL: "public-read",
            };

            try {
              //console.log('s3Params', s3Params);

              await s3.send(new PutObjectCommand(s3Params));
              // Read the object.
              const s3Response = await s3.send(new GetObjectCommand(s3Params));
              if (s3Response.Body) {
                const url = await s3Response.Body.transformToString();
                avatarUrl = url;
              } else {
                return {
                  status: 500,
                  message: "Failed to upload avatar",
                };
              }

              // Delete the previous avatar from DigitalOcean Spaces if it exists
              if (currentAvatarUrl) {
                //console.log('currentAvatarUrl', currentAvatarUrl);
                const oldKey = currentAvatarUrl.split(`${SPACE_NAME}/`)[1]; // Extract key from URL
                if (oldKey) {
                  await s3.deleteObject({
                    Bucket: SPACE_NAME,
                    Key: oldKey,
                  } as DeleteObjectRequest);
                }
              }
            } catch (error) {
              //console.error('Error uploading to DigitalOcean Spaces:', error);
              return {
                status: 500,

                message: "Failed to upload avatar",
              };
            }
          } else {
            // No new avatar provided, retain the current one
            //console.log('avatar', currentAvatarUrl);
            avatarUrl = currentAvatarUrl;
          }

          // Update profile information in MongoDB
          await profileCollection.updateOne(
            { user_id: _user._id },
            {
              $set: {
                name,
                handle,
                bio,
                avatar: `${avatarUrl}?v=${new Date().getTime()}`,
                auth_id: _user._id,
                updated_at: new Date(),
              },
            },
            { upsert: true }
          );
          set.status = 200;
          return {
            status: 200,

            message: "Profile updated",

            name,
            handle,
            bio,
            avatar: avatarUrl,
            user_id: _user._id,
          };
        }
        set.status = 404;
        return {
          status: 404,

          message: "User not found",
        };
      } catch (error) {
        set.status = 500;
        return {
          status: 500,

          message: "Internal server error" + error,
        };
      }
    },
    {
      body: t.Object({
        name: t.String(),
        handle: t.String(),
        bio: t.String(),
        avatar: t.File(),
      }),
    }
  );

export default profile_routes;
