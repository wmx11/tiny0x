import {
  HANDLE_CAMPAIGN_IMAGE_UPLOAD,
  HANDLE_PROFILE_AVATAR_IMAGE_UPLOAD,
  HANDLE_PROFILE_HEADER_IMAGE_UPLOAD,
} from '@/services/images';
import { UseFormReturnType } from '@mantine/form';

export type ImageRequest = {
  fields: {
    left: string;
    top: string;
    height: string;
    width: string;
    fit: 'contain' | 'fill' | 'cover' | 'inside' | 'outside';
  };
  files: {
    imageData: {
      path: string;
    }[];
  };
};

export type ImageHandlers =
  | typeof HANDLE_PROFILE_HEADER_IMAGE_UPLOAD
  | typeof HANDLE_PROFILE_AVATAR_IMAGE_UPLOAD
  | typeof HANDLE_CAMPAIGN_IMAGE_UPLOAD;
  
export type SetImage = { setImage?: (image: Blob | null) => void };

export type ImageUploadComponentTypes<T> = {
  src?: string;
  isUpdate?: boolean;
  form?: UseFormReturnType<T>;
  formPath?: string;
} & SetImage;

export type ImageUploadReturnTypes = { filename: string; url: string };
