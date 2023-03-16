// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  handleProfileAvatarImageUpload,
  handleProfileHeaderImageUpload,
  HANDLE_PROFILE_AVATAR_IMAGE_UPLOAD,
  HANDLE_PROFILE_HEADER_IMAGE_UPLOAD,
  uploadImageToBucket,
  UploadImageToBucketOptions,
  UPLOAD_IMAGE_TO_BUCKET,
} from '@/services/images';
import { formDataConfig, handleFormData } from '@/utils/api/handleFormData';
import request, { Auth } from '@/utils/api/request';
import { response } from '@/utils/api/response';
import { readFileSync } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const requestHandler = request(req, res);
  const responseHandler = response(res);

  const handleImages = async (auth: Auth) => {
    const data = await handleFormData<
      { type: string } & UploadImageToBucketOptions,
      'image'
    >(req);

    if (!data) {
      return responseHandler.badRequest();
    }

    const { type } = data?.fields;
    const image = data?.files?.image?.at(0);

    if (!image) {
      return responseHandler.badRequest('Missing image');
    }

    switch (type) {
      case HANDLE_PROFILE_AVATAR_IMAGE_UPLOAD:
        const profileAvatarImage = await handleProfileAvatarImageUpload(image);
        if (!profileAvatarImage.ok) {
          return responseHandler.badRequest(profileAvatarImage.errorMessage);
        }
        return responseHandler.ok(profileAvatarImage.results);
      case HANDLE_PROFILE_HEADER_IMAGE_UPLOAD:
        const profileHeaderImage = await handleProfileHeaderImageUpload(image);
        if (!profileHeaderImage.ok) {
          return responseHandler.badRequest(profileHeaderImage.errorMessage);
        }
        return responseHandler.ok(profileHeaderImage.results);
      case UPLOAD_IMAGE_TO_BUCKET:
        const uploadedImage = await uploadImageToBucket({
          file: readFileSync(image.path),
          filename: data?.fields?.filename,
          acl: data?.fields?.acl,
          contentType: 'image/png',
        });
        if (!uploadedImage.ok) {
          return responseHandler.badRequest(uploadedImage.errorMessage);
        }
        return responseHandler.ok(uploadedImage.results);
      default:
        return responseHandler.ok(null);
    }
  };

  return requestHandler.signedPost(handleImages);
}

export const config = formDataConfig;
