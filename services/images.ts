import { ResultsOrError } from '@/types/Results';
import { FileType } from '@/utils/api/handleFormData';
import config from '@/utils/config';
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
        fit: 'contain',
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
      fit: 'contain',
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
      fit: 'contain',
    });
    return { ok: true, results: data.results as string };
  } catch (error) {
    return { ok: false, errorMessage: error as string };
  }
};

export const uploadImageToBucket = async () => {};
