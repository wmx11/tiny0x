// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import request from '@/utils/api/request';
import { response } from '@/utils/api/response';
import { AUTH_COOKIE } from '@/utils/contstants';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const requestHandler = request(req, res);
  const responseHandler = response(res);

  const getToken = () => {
    const cookies = req.cookies;

    if (!cookies.hasOwnProperty(AUTH_COOKIE)) {
      return responseHandler.ok(null);
    }

    return responseHandler.ok(req.cookies[AUTH_COOKIE]);
  };

  return requestHandler.post(getToken);
}
