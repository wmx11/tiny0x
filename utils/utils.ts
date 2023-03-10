import { IncomingMessage } from 'http';
import { nanoid } from 'nanoid';
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

/**
 *
 * @param address - 0x... Address to be truncated
 * @param take - Number of characters to leave in the final result
 * @returns - Truncated 0x Address
 */
export const truncateAddress = (address: string, take = 4) => {
  if (!address) {
    return '...';
  }

  return `${address.substring(0, take)}...${address.substring(
    address.length - take
  )}`;
};

/**
 * @desc - Users nanoid or other random string generator to generate a tiny link alias
 * @returns - Generated random alias for the tiny link
 */
export const generateLinkAlias = () => {
  return `0x${nanoid(8)}`;
};
