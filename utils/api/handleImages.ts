import fs from 'fs';
import sharp from 'sharp';
// import { resolveImagePaths } from 'utils/utils';
import { v4 as uuidv4 } from 'uuid';
import { FileType } from './handleFormData';

type HandleImageUploadProps<T> = {
  image: FileType;
  prefix: string;
  isUpdate?: boolean;
  isRemove?: boolean;
  storageName?: 'images' | 'logos';
  instance?: T & {
    [key: string]: any;
  };
};

export const handleImageUpload = async <T>({
  image,
  prefix,
  isUpdate,
  instance,
  isRemove,
  storageName = 'images',
}: HandleImageUploadProps<T>) => {
  const imageId = `${prefix}_id`;
  const imageExtension = `${prefix}_extension`;
  const imageUrl = `${prefix}_url`;

  const resolvedPath = null;

  if ((isRemove || isUpdate) && image && instance && instance[imageId]) {
    try {
      fs.unlink(
        `${resolvedPath[storageName as keyof typeof resolvedPath]}/${
          instance[imageId]
        }.${instance[imageExtension]}`,
        (err) => {
          console.log(err);
        }
      );
    } catch (error) {}
  }

  if (isRemove) {
    return {
      [imageId]: undefined,
      [imageExtension]: undefined,
      [imageUrl]: undefined,
    };
  }

  if (!image) {
    return {};
  }

  const data = sharp(image?.path);
  const metaData = await data?.metadata();
  const imageName = uuidv4();

  const imageDataOjbect = {
    [imageId]: imageName,
    [imageExtension]: metaData?.format,
    [imageUrl]: image.size,
  };

  await data?.toFile(
    `${resolvedPath[storageName as keyof typeof resolvedPath]}/${imageName}.${
      metaData?.format
    }`
  );

  return imageDataOjbect;
};
