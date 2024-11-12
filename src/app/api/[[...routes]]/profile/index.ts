import {Elysia, t} from 'elysia';
import handleFileSpaces from '@/utilities/handle_file_spaces';
import {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectRequest,
} from '@aws-sdk/client-s3';
const profile_routes = new Elysia({
  serve: {
    maxRequestBodySize: 1024 * 1024 * 8,
  },
})
  .get(
    '/profile/:handle',
    async ({params, usersCollection, profileCollection}) => {
      const {handle} = params;
      console.log('handle', handle);
      const profile = await profileCollection.findOne({
        handle,
      });

      if (profile) {
        if (!profile) {
          return {
            status: 404,
            body: {
              message: 'Profile not found',
            },
          };
        }
        const user = await usersCollection.findOne({
          _id: profile.user_id,
        });
        return {
          status: 200,
          body: {
            message: 'User found',
            user: {
              email: user.email,
              name: profile.name,
              handle: profile.handle,
              bio: profile.bio,
              avatar:
                'https://xander-files.nyc3.cdn.digitaloceanspaces.com' +
                profile.avatar,
            },
          },
        };
      }
      return {
        status: 404,
        body: {
          message: 'User not found',
        },
      };
    }
  )
  // Get Profile
  .get(
    '/profile',
    async ({jwt, db, usersCollection, profileCollection, user}) => {
      const _user = await usersCollection.findOne({email: user.email});
      console.log('user', user);
      if (_user) {
        const profile = await profileCollection.findOne({
          user_id: _user._id,
        });
        if (!profile) {
          return {
            status: 404,
            body: {
              message: 'Profile not found',
            },
          };
        }
        return {
          status: 200,
          body: {
            message: 'User found',
            email: _user.email,
            name: profile.name,
            handle: profile.handle,
            bio: profile.bio,
            avatar:
              'https://xander-files.nyc3.cdn.digitaloceanspaces.com/' +
              profile.avatar,
          },
        };
      }
      return {
        status: 404,
        body: {
          message: 'User not found',
        },
      };
    },
    {headers: t.Object({Authorization: t.String()})}
  ) // Get A User Profile

  // Edit Profile

  .post(
    '/profile/edit',
    async ({jwt, db, usersCollection, profileCollection, body, user}) => {
      console.log('user', body);

      const _user = await usersCollection.findOne({
        email: user.email,
      });

      if (_user) {
        const {name, handle, bio, avatar} = body;
        let avatarUrl = null;

        // Retrieve the current avatar URL from MongoDB
        const currentProfile = await profileCollection.findOne({
          user_id: _user._id,
        });
        // Extract the avatar URL from the profile, if it exists
        const currentAvatarUrl = currentProfile ? currentProfile.avatar : null;

        // Check if avatar is provided as a base64 string
        if (avatar) {
          console.log('avatar', avatar);
        
          const {s3, SPACE_NAME} = await handleFileSpaces();
          const mimeType = avatar.type;
          const file = new File([avatar],`avatars/0x69420${_user._id}8008.png`, {
            type: mimeType /* your Blob type */,
          });
          const avatarBuffer = await avatar.arrayBuffer()
          const fileBuffer = Buffer.from(avatarBuffer);
          const s3Params: any = {
            Bucket: SPACE_NAME || '',
            Key: `avatars/0x69420${_user._id}8008`, // Create a unique file path
            Body: fileBuffer, // The binary buffer of the decoded file
            //ContentEncoding: 'base64', // Required to indicate base64 encoding
            ContentType: mimeType, // Update based on file type if necessary
            ACL: 'public-read',
          };

          try {
            console.log('s3Params', s3Params);

            await s3.send(new PutObjectCommand(s3Params));
            // Read the object.
            const {Body} = await s3.send(new GetObjectCommand(s3Params));
            //console.log('Body', Body?.url);
            if (!Body) {
              return {
                status: 500,
                body: {
                  message: 'Failed to upload avatar',
                },
              };
            }
            avatarUrl = await Body?.url; //uploadResult.Location;

            // Delete the previous avatar from DigitalOcean Spaces if it exists
            if (currentAvatarUrl) {
              const oldKey = currentAvatarUrl.split(`${SPACE_NAME}/`)[1]; // Extract key from URL
              if (oldKey) {
                await s3.deleteObject({
                  Bucket: SPACE_NAME,
                  Key: oldKey,
                } as DeleteObjectRequest);
              }
            }
          } catch (error) {
            console.error('Error uploading to DigitalOcean Spaces:', error);
            return {
              status: 500,
              body: {
                message: 'Failed to upload avatar',
              },
            };
          }
        } else {
          // No new avatar provided, retain the current one
          console.log('avatar', currentAvatarUrl);
          avatarUrl = currentAvatarUrl;
        }

        // Update profile information in MongoDB
        await profileCollection.updateOne(
          {user_id: _user._id},
          {
            $set: {
              name,
              handle,
              bio,
              avatar: avatarUrl,
              user_id: _user._id,
            },
          },
          {upsert: true}
        );

        return {
          status: 200,
          body: {
            message: 'Profile updated',
          },
        };
      }

      return {
        status: 404,
        body: {
          message: 'User not found',
        },
      };
    },
    {
      headers: t.Object({
        authorization: t.String(),
        'content-type': t.String(),
      }),
      body: t.Object({
        name: t.String(),
        handle: t.String(),
        bio: t.String(),
        avatar: t.File(), // Expect avatar as a base64 string or null
      }),
      type: 'multipart/form-data',
    }
  );

export default profile_routes;
