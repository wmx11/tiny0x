import apiRoutes from '@/routes/api';
import { ImageUploadReturnTypes } from '@/types/Files';
import { ResultsOrError } from '@/types/Results';
import { differenceInHours } from 'date-fns';
import { IncomingMessage } from 'http';
import { nanoid } from 'nanoid';
import { NextApiRequest } from 'next';
import { signedRequest } from './api/signedRequest';
import { ONE_DAY } from './contstants';

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

export const checkCanVoteAfterOneDay = (lastDay?: string | Date | null) => {
  return lastDay
    ? differenceInHours(new Date(), new Date(lastDay)) >= ONE_DAY
    : true;
};

/**
 * @desc - Users nanoid or other random string generator to generate a tiny link alias
 * @returns - Generated random alias for the tiny link
 */
export const generateLinkAlias = () => {
  return `0x${nanoid(8)}`;
};

export const uploadImageRequest = async (
  image: Blob | null,
  path: string
): Promise<ResultsOrError<ImageUploadReturnTypes>> => {
  try {
    const fd = new FormData();
    fd.append('type', 'uploadImageToBucket');
    fd.append('image', image as Blob);
    fd.append('filename', `${path}/${nanoid()}.png`);
    fd.append('acl', 'public-read');

    const { data } = await signedRequest<ImageUploadReturnTypes>({
      type: 'post',
      url: apiRoutes.image,
      data: fd,
      isFormData: true,
    });

    return { ok: true, results: data.data };
  } catch (error) {
    console.log(error);
    return { ok: false, errorMessage: error as string };
  }
};
