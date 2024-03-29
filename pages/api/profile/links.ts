// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  getLinksByUser,
  getLinkStatsByAlias,
  getRecentLinksByUser,
  getTotalLinksCountByUser,
  getTotalLinksCountForThisMonthByUserIp,
  GET_LINKS_BY_USER,
  GET_LINK_STATS_BY_ALIAS,
  GET_RECENT_LINKS_BY_USER,
  GET_TOTAL_LINKS_COUNT_BY_USER,
  GET_TOTAL_LINKS_COUNT_FOR_THIS_MONTH_BY_USER_IP,
} from '@/services/link';
import request, { Auth } from '@/utils/api/request';
import { response } from '@/utils/api/response';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const requestHandler = request(req, res);
  const responseHandler = response(res);

  const linksController = async (auth: Auth) => {
    const { type, alias } = req.body as { type: string; alias: string };

    switch (type) {
      case GET_LINKS_BY_USER:
        const links = await getLinksByUser(auth.id);
        return responseHandler.ok(links);
      case GET_RECENT_LINKS_BY_USER:
        const recentLinks = await getRecentLinksByUser(auth.id);
        return responseHandler.ok(recentLinks);
      case GET_TOTAL_LINKS_COUNT_BY_USER:
        const linksCount = await getTotalLinksCountByUser(auth.id);
        return responseHandler.ok(linksCount);
      case GET_TOTAL_LINKS_COUNT_FOR_THIS_MONTH_BY_USER_IP:
        const linksCountByIp = await getTotalLinksCountForThisMonthByUserIp(
          auth.id
        );
        return responseHandler.ok(linksCountByIp);
      case GET_LINK_STATS_BY_ALIAS:
        const linkStatsByAlias = await getLinkStatsByAlias(auth.id, alias);
        if (!linkStatsByAlias.ok) {
          return responseHandler.badRequest(linkStatsByAlias.errorMessage);
        }
        return responseHandler.ok(linkStatsByAlias);
      default:
        return responseHandler.ok(null);
    }
  };

  return requestHandler.signedPost(linksController);
}
