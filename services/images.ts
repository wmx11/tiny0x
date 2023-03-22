import { ImageUploadReturnTypes } from '@/types/Files';
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

export const HANDLE_IMAGE_UPLOAD = 'handleImageUpload';
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

export const HANDLE_PROFILE_HEADER_IMAGE_UPLOAD =
  'handleProfileHeaderImageUpload';
export const handleProfileHeaderImageUpload = async (
  image: FileType
): Promise<ResultsOrError<string>> => {
  try {
    const data = await handleImageUpload(image, {
      height: config.images.profile.header.height,
      width: config.images.profile.header.width,
      fit: 'cover',
    });
    return { ok: true, results: data?.results as string };
  } catch (error) {
    return { ok: false, errorMessage: error as string };
  }
};

export const HANDLE_PROFILE_AVATAR_IMAGE_UPLOAD =
  'handleProfileAvatarImageUpload';
export const handleProfileAvatarImageUpload = async (
  image: FileType
): Promise<ResultsOrError<string>> => {
  try {
    const data = await handleImageUpload(image, {
      height: config.images.profile.avatar.height,
      width: config.images.profile.avatar.width,
      fit: 'cover',
    });
    return { ok: true, results: data?.results as string };
  } catch (error) {
    return { ok: false, errorMessage: error as string };
  }
};

export const HANDLE_CAMPAIGN_IMAGE_UPLOAD = 'handleCampaignImageUpload';
export const handleCampaignImageUpload = async (
  image: FileType
): Promise<ResultsOrError<string>> => {
  try {
    const data = await handleImageUpload(image, {
      height: config.images.campaign.header.height,
      width: config.images.campaign.header.width,
      fit: 'contain',
    });
    return { ok: true, results: data?.results as string };
  } catch (error) {
    return { ok: false, errorMessage: error as string };
  }
};

export type UploadImageToBucketOptions = {
  filename: string;
  contentType: string;
  file: Blob | Buffer | string;
  acl?: 'public-read' | 'private';
};

export const UPLOAD_IMAGE_TO_BUCKET = 'uploadImageToBucket';
export const uploadImageToBucket = async ({
  filename,
  file,
  acl,
  contentType,
}: UploadImageToBucketOptions): Promise<
  ResultsOrError<ImageUploadReturnTypes>
> => {
  try {
    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME as string,
        Key: filename,
        Body: file,
        ACL: (acl = 'public-read'),
        ContentType: contentType,
      })
    );

    return {
      ok: true,
      results: {
        filename,
        url: config.images.getImageUrl(filename),
      },
    };
  } catch (error) {
    console.log(error);
    return { ok: false, errorMessage: error as string };
  }
};
