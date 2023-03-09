// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { TinifySchema } from '@/schema/tinify';
import { tinifyLink } from '@/services/link';
import request, { Auth } from '@/utils/api/request';
import { response } from '@/utils/api/response';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const requestHandler = request(req, res);
  const responseHandler = response(res);

  const tinify = async (auth: Auth) => {
    const body = req.body as TinifySchema;

    const data = await tinifyLink({
      ...body,
      userId: auth.id,
    });

    if (!data.ok) {
      return responseHandler.badRequest(data?.errorMessage);
    }

    return responseHandler.ok(data?.results);
  };

  return requestHandler.signedPost(tinify);
}
