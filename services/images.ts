import { ResultsOrError } from '@/types/Results';
import { FileType } from '@/utils/api/handleFormData';
import config from '@/utils/config';
import s3Client from '@/utils/s3Client';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';

type ImageUploadOptions = {
  width?: number;
  height?: number;
  fit?: keyof sharp.FitEnum;
};

export const handleImageUpload = async (
  image: FileType,
  options: ImageUploadOptions
) => {
  try {
    const data = sharp(image.path);
    const metadata = await data.metadata();

    if (!config.images.checkSupport(metadata.format as string)) {
      return {
        ok: false,
        errorMessage: `${metadata.format} is not supported.`,
      };
    }

    const imageBuffer = await data
      .resize({
        width: options.width,
        height: options.height,
        fit: options.fit || 'contain',
      })
      .png({ quality: 80 })
      .toBuffer();

    return { ok: true, results: imageBuffer.toString('base64') };
  } catch (error) {
    return { ok: false, errorMessage: error as string };
  }
};

export const handleProfileHeaderImageUpload = async (
  image: FileType
): Promise<ResultsOrError<string>> => {
  try {
    const data = await handleImageUpload(image, {
      height: config.images.profile.header.height,
      width: config.images.profile.header.width,
      fit: 'cover',
    });
    return { ok: true, results: data.results as string };
  } catch (error) {
    return { ok: false, errorMessage: error as string };
  }
};

export const handleProfileAvatarImageUpload = async (
  image: FileType
): Promise<ResultsOrError<string>> => {
  try {
    const data = await handleImageUpload(image, {
      height: config.images.profile.avatar.height,
      width: config.images.profile.avatar.width,
      fit: 'cover',
    });
    return { ok: true, results: data.results as string };
  } catch (error) {
    return { ok: false, errorMessage: error as string };
  }
};

export type UploadImageToBucketOptions = {
  filename: string;
  file: Blob | Buffer | string;
  acl?: 'public-read' | 'private';
};

export const uploadImageToBucket = async ({
  filename,
  file,
  acl,
}: UploadImageToBucketOptions): Promise<ResultsOrError<{}>> => {
  try {
    const data = await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME as string,
        Key: filename,
        Body: file,
        ACL: (acl = 'public-read'),
      })
    );

    return {
      ok: true,
      results: {
        filename,
      },
    };
  } catch (error) {
    console.log(error);
    return { ok: false, errorMessage: error as string };
  }
};
