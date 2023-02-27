// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import request, { Auth } from '@/utils/api/request';
import { response } from '@/utils/api/response';
import type { NextApiRequest, NextApiResponse } from 'next';
import { AUTH_COOKIE } from '@/utils/config';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const requestHandler = request(req, res);
  const responseHandler = response(res);

  const profileCrud = (auth: Auth) => {
    if (!auth.id) {
      return responseHandler.forbidden();
    }

    const { username, name, subtitle, description, profile_links, isUpdate } =
      req.body;
  };

  return requestHandler.signedPost(profileCrud);
}
