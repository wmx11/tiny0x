import { Request, Response } from 'express';
import { getIpAddress } from '../../utils/utils';
import prisma from '../../prisma/prisma';
import handleLinkActions from '../models/handleLinkActions';

const linkController = async (req: Request, res: Response) => {
  const { slug } = req.params;

  if (!slug) {
    return res.redirect('/');
  }

  const existingLink = await prisma?.link.findUnique({
    where: {
      slug,
    },
  });

  if (!existingLink) {
    return res.redirect('/');
  }

  const ip = getIpAddress(req);

  await handleLinkActions(existingLink, ip);

  return res.redirect(existingLink.target);
};

export default linkController;
