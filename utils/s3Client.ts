import { S3Client } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  forcePathStyle: false, // Configures to use subdomain/virtual calling format.
  endpoint: 'https://sfo3.digitaloceanspaces.com',
  region: 'sfo3',
  credentials: {
    accessKeyId: process.env.BUCKET_KEY || '',
    secretAccessKey: process.env.BUCKET_SECRET || '',
  },
});

export default s3Client;
