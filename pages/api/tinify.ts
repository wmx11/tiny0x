// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/prisma/prisma';
import { TinifySchema } from '@/schema/tinify';
import request, { Auth } from '@/utils/api/request';
import { response } from '@/utils/api/response';
import { nanoid } from 'nanoid';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const requestHandler = request(req, res);
  const responseHandler = response(res);

  const tinify = async (auth: Auth) => {
    if (!auth.id) {
      return responseHandler.forbidden();
    }

    const body = req.body as TinifySchema;

    const slug = body?.slug ? body?.slug : `0x${nanoid(8)}`;

    const existingSlug = await prisma?.link.findUnique({
      where: {
        slug,
      },
    });

    if (existingSlug) {
      return responseHandler.badRequest(
        'A slug with the same name already exists.'
      );
    }

    const newLink = await prisma?.link.create({
      data: {
        slug,
        target: body?.target,
        title: body?.title,
        description: body?.description,
        doesAcceptAds: body?.doesAcceptAds,
        trackMetrics: body?.trackMetrics,
        userId: auth.id,
        // nftId: undefined,
      },
    });

    return responseHandler.ok(newLink);
  };

  return requestHandler.signedPost(tinify);
}
