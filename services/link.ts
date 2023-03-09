import prisma from '@/prisma/prisma';
import { TinifySchema } from '@/schema/tinify';
import { ResultsOrError } from '@/types/Results';
import { DEFAULT_TAKE } from '@/utils/contstants';
import { generateLinkAlias } from '@/utils/utils';
import { Link } from '@prisma/client';

export const getLinksByUser = async (userId: string) => {
  try {
    const links = await prisma?.link.findMany({
      where: {
        userId,
      },
      orderBy: {
        date_created: 'desc',
      },
    });

    return links;
  } catch (error) {
    console.log(error);
    return error;
  }
};

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
    });
    return links;
  } catch (error) {
    console.log(error);
    return error;
  }
};

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

export const tinifyLink = async (
  data: TinifySchema & { userId: string }
): Promise<ResultsOrError<Link>> => {
  try {
    const slug = data?.slug ? data?.slug : generateLinkAlias();

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
