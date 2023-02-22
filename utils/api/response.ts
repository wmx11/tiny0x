import { NextApiResponse } from 'next';

export const status = {
  ok: {
    code: 200,
    message: 'OK',
    data: {},
  },
  badRequest: {
    code: 400,
    message: 'Bad Request',
    errorMessage: '',
  },
  unauthorized: {
    code: 401,
    message: 'Unauthorized',
    errorMessage: '',
  },
  forbidden: {
    code: 403,
    message: 'Forbidden',
    errorMessage: '',
  },
  notFound: {
    code: 404,
    message: 'Not Found',
    errorMessage: '',
  },
  tooManyRequests: {
    code: 429,
    message: 'Too many requests',
    errorMessage: '',
  },
};

export const response = (res: NextApiResponse) => {
  return {
    ok: <T>(data?: T, message?: string) =>
      res.status(status.ok.code).json({
        ...status.ok,
        message,
        data,
      }),
    badRequest: (errorMessage?: string) =>
      res
        .status(status.badRequest.code)
        .json({ ...status.badRequest, errorMessage }),
    unauthorized: (errorMessage?: string) =>
      res
        .status(status.unauthorized.code)
        .json({ ...status.unauthorized, errorMessage }),
    forbidden: (errorMessage?: string) =>
      res
        .status(status.forbidden.code)
        .json({ ...status.forbidden, errorMessage }),
    notFound: (errorMessage?: string) =>
      res
        .status(status.notFound.code)
        .json({ ...status.notFound, errorMessage }),
    tooManyRequests: (errorMessage?: string) =>
      res
        .status(status.tooManyRequests.code)
        .json({ ...status.tooManyRequests, errorMessage }),
  };
};
