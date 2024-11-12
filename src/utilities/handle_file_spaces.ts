import {S3} from '@aws-sdk/client-s3';

export default async function handleFileSpaces() {
  // Initialize S3 with DigitalOcean Spaces credentials and endpoint
  const s3 = new S3({
    credentials: {
      // Store in .env
      accessKeyId: Bun.env.DO_SPACE_ACCESS_KEY,

      // Store in .env
      secretAccessKey: Bun.env.DO_SPACE_SECRET_KEY,
    },

    // Replace with your region's endpoint
    endpoint: 'https://nyc3.digitaloceanspaces.com',

    // DigitalOcean Space region (replace 'nyc3' with your region)
    region: 'nyc3',
  });

  const SPACE_NAME = Bun.env.DO_SPACE_NAME; // Your DigitalOcean Space name

  return {
    s3,
    SPACE_NAME,
  };
}
