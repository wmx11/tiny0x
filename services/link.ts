import prisma from '@/prisma/prisma';
import { TinifySchema } from '@/schema/tinify';
import { Actions } from '@/types/Actions';
import { ResultsOrError } from '@/types/Results';
import { DEFAULT_TAKE } from '@/utils/contstants';
import { generateLinkAlias } from '@/utils/utils';
import { Link } from '@prisma/client';
import { endOfMonth, startOfMonth } from 'date-fns';
import slugify from 'slugify';

export const GET_LINKS_BY_USER = 'getLinksByUser';
export const getLinksByUser = async (userId: string) => {
  try {
    const links = await prisma?.link.findMany({
      where: {
        userId,
      },
      orderBy: {
        date_created: 'desc',
      },
      include: {
        _count: {
          select: {
            actions: true,
          },
        },
      },
    });

    return links;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const GET_RECENT_LINKS_BY_USER = 'getRecentLinksByUser';
export const getRecentLinksByUser = async (userId: string) => {
  try {
    const links = await prisma?.link.findMany({
      where: {
        userId,
      },
      orderBy: {
        date_created: 'desc',
      },
      take: DEFAULT_TAKE,
      include: {
        _count: {
          select: {
            actions: true,
          },
        },
      },
    });
    return links;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const GET_TOTAL_LINKS_COUNT_BY_USER = 'getTotalLinksCountByUser';
export const getTotalLinksCountByUser = async (userId: string) => {
  try {
    const count = await prisma?.link.count({
      where: {
        userId,
      },
    });

    return count;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const GET_TOTAL_LINKS_COUNT_FOR_THIS_MONTH_BY_USER_IP =
  'getTotalLinksCountForThisMonthByUserIp';
export const getTotalLinksCountForThisMonthByUserIp = async (
  userId: string
) => {
  try {
    const user = await prisma?.user.findUnique({
      where: {
        id: userId,
      },
    });

    // Nothing on localhost
    if (user?.ip === '::1') {
      return 0;
    }

    const count = await prisma?.link.count({
      where: {
        user: {
          ip: user?.ip,
        },
        date_created: {
          gte: startOfMonth(new Date()),
          lte: endOfMonth(new Date()),
        },
      },
    });

    return count;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const TINIFY_LINK = 'tinifyLink';
export const tinifyLink = async (
  data: TinifySchema & { userId: string }
): Promise<ResultsOrError<Link>> => {
  try {
    const slug = data?.slug
      ? slugify(data?.slug, { lower: true })
      : generateLinkAlias();

    const existingSlug = await prisma?.link.findUnique({
      where: {
        slug: slug || '',
      },
    });

    if (existingSlug) {
      return {
        ok: false,
        errorMessage: `Link with the alias ${slug} already exists. Please choose another one.`,
      };
    }

    const newLink = await prisma?.link.create({ data: { ...data, slug } });

    return { ok: true, results: newLink as Link };
  } catch (error) {
    return { ok: false, errorMessage: error as string };
  }
};

export const UPDATE_TINY_LINK = 'updateTinyLink';
export const updateTinyLink = async (
  data: TinifySchema & { userId: string; linkId?: string }
): Promise<ResultsOrError<Link>> => {
  try {
    const dataCopy = { ...data };
    const linkId = dataCopy?.linkId;

    delete dataCopy.linkId;
    delete dataCopy.slug;

    const updatedLink = await prisma?.link.update({
      where: {
        id: linkId,
      },
      data: {
        ...dataCopy,
        userId: dataCopy?.userId,
      },
    });

    return { ok: true, results: updatedLink as Link };
  } catch (error) {
    return { ok: false, errorMessage: error as string };
  }
};

export type GetLinkStatsByAliasReturnTypes = {
  link: Link | null | undefined;
  clicks: number | undefined;
  groups: {
    device: string;
    country: string;
    referer: string;
    ip: string;
    country_code: string;
    _count: number;
  }[];
};

export const GET_LINK_STATS_BY_ALIAS = 'getLinkStatsByAlias';
export const getLinkStatsByAlias = async (
  userId: string,
  alias: string
): Promise<ResultsOrError<GetLinkStatsByAliasReturnTypes>> => {
  try {
    const link = await prisma?.link.findUnique({
      where: {
        slug: alias,
      },
    });

    if (link?.userId !== userId) {
      return {
        ok: false,
        errorMessage: 'You cannot access information about this link.',
      };
    }

    const clicks = await prisma?.action.count({
      where: {
        link: {
          slug: alias,
          userId,
        },
        type: Actions.Click,
      },
    });

    const groups = await prisma?.action.groupBy({
      by: ['device', 'country', 'referer', 'ip', 'country_code'],
      _count: true,
      where: {
        link: {
          slug: alias,
          userId,
        },
      },
    });

    return {
      ok: true,
      results: {
        link,
        clicks,
        groups: groups as GetLinkStatsByAliasReturnTypes['groups'],
      },
    };
  } catch (error) {
    return { ok: false, errorMessage: error as string };
  }
};
