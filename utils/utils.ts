import { IncomingMessage } from 'http';
import { NextApiRequest } from 'next';

export const sanitizeIp = (ip: string) => ip?.trim().replace(/(::ffff:)/g, '');

export const getIpAddress = (req: IncomingMessage | NextApiRequest) => {
  const forwarded = req.headers['x-forwarded-for'];
  const ip =
    typeof forwarded === 'string'
      ? forwarded.split(/, /)[0]
      : req.socket.remoteAddress;
  return sanitizeIp(ip as string);
};