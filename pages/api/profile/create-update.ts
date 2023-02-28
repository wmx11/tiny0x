// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/prisma/prisma';
import { ProfileSchema } from '@/schema/profile';
import request, { Auth } from '@/utils/api/request';
import { response } from '@/utils/api/response';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const requestHandler = request(req, res);
  const responseHandler = response(res);

  const CreateOrUpdateProfile = async () => {
    // if (!auth.id) {
    //   return responseHandler.forbidden();
    // }

    const { username, description, isPromoted, name, profile_links, subtitle } =
      req.body as ProfileSchema & { isUpdate: boolean };

    const existingProfile = await prisma.profile.findUnique({
      where: {
        username,
      },
    });

    if (existingProfile) {
      return responseHandler.badRequest('Username already exists');
    }

    const profile = await prisma.profile.upsert({
      where: {
        username,
      },
      create: {
        username,
        description,
        name,
        profile_links,
        subtitle,
        isPromoted,
        // userId: auth.id,
      },
      update: {
        username,
        description,
        name,
        profile_links,
        subtitle,
        isPromoted,
      },
    });

    return responseHandler.ok(profile);
  };

  return requestHandler.post(CreateOrUpdateProfile);
}
