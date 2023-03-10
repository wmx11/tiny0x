// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  getLinksByUser,
  getRecentLinksByUser,
  getTotalLinksCountByUser,
  getTotalLinksCountForThisMonthByUserIp,
} from '@/services/link';
import request, { Auth } from '@/utils/api/request';
import { response } from '@/utils/api/response';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const requestHandler = request(req, res);
  const responseHandler = response(res);

  const linksController = async (auth: Auth) => {
    const { type } = req.body;
    switch (type) {
      case 'getLinksByUser':
        const links = await getLinksByUser(auth.id);
        return responseHandler.ok(links);
      case 'getRecentLinksByUser':
        const recentLinks = await getRecentLinksByUser(auth.id);
        return responseHandler.ok(recentLinks);
      case 'getTotalLinksCountByUser':
        const linksCount = await getTotalLinksCountByUser(auth.id);
        return responseHandler.ok(linksCount);
      case 'getTotalLinksCountForThisMonthByUserIp':
        const linksCountByIp = await getTotalLinksCountForThisMonthByUserIp(
          auth.id
        );
        return responseHandler.ok(linksCountByIp);
      default:
        return responseHandler.ok(null);
    }
  };

  return requestHandler.signedPost(linksController);
}
