import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma/prisma';
import { response } from './response';
import { getUser } from '@/pages/api/auth/[...thirdweb]';

export type Auth = {
  id: string;
  ip: string;
  email: string;
  address: string;
};

const request = (req: NextApiRequest, res: NextApiResponse) => {
  const { method, headers } = req;

  const secret = process.env.AUTH_PRIVATE_KEY || '';
  const authToken = headers.authorization?.split(' ')[1]?.trim() || '';

  const responseHandler = response(res);

  const post = (cb: () => Promise<any> | any) => {
    if (method === 'POST') {
      try {
        return cb();
      } catch (error) {
        console.log(error);
        return null;
      }
    }

    return responseHandler.forbidden();
  };

  const get = (cb: () => Promise<any> | any) => {
    if (method === 'GET') {
      try {
        return cb();
      } catch (error) {
        console.log(error);
        return null;
      }
    }

    return responseHandler.forbidden();
  };

  const authenticate = async (): Promise<Auth | boolean> => {
    try {
      const userAuth = await getUser(req);

      if (!userAuth) {
        return false;
      }

      const user = await prisma?.user.findUnique({
        where: {
          address: userAuth?.address,
        },
        select: {
          id: true,
          ip: true,
          email: true,
          address: true,
        },
      });

      if (!user) {
        return false;
      }

      return user as Auth;
    } catch (error) {
      return false;
    }
  };

  const signedPost = async (cb: (auth: Auth) => Promise<any> | any) => {
    const auth = (await authenticate()) as Auth;

    if (!auth) {
      return responseHandler.unauthorized();
    }

    return post(() => cb(auth));
  };

  const signedGet = async (cb: (auth: Auth) => Promise<any> | any) => {
    const auth = (await authenticate()) as Auth;

    if (!auth) {
      return responseHandler.unauthorized();
    }

    return get(() => cb(auth));
  };

  return {
    post,
    get,
    signedPost,
    signedGet,
  };
};

export default request;
