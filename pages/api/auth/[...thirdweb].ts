import prisma from '@/prisma/prisma';
import { getIpAddress } from '@/utils/utils';
import { PrivateKeyWallet } from '@thirdweb-dev/auth/evm';
import { ThirdwebAuth } from '@thirdweb-dev/auth/next';
import { NextApiRequest } from 'next';

export type Session = {
  id: string;
  profileId: string;
};

export type UserSession = {
  address: string;
  session?: Session;
};

// Here we configure thirdweb auth with a domain and wallet
export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
  domain: process.env.NEXT_PUBLIC_AUTH_DOMAIN || '',
  wallet: new PrivateKeyWallet(process.env.AUTH_PRIVATE_KEY || ''),
  authOptions: {
    statement:
      'Please ensure that the domain above matches the URL of the current website.',
  },
  callbacks: {
    onLogin: async (address: string, req) => {
      try {
        const ip = getIpAddress(req as NextApiRequest);

        const existingUser = await prisma?.user.findUnique({
          where: {
            address,
          },
          select: {
            id: true,
            address: true,
            profile: {
              select: {
                id: true,
              },
            },
          },
        });

        if (!existingUser) {
          await prisma?.user.create({
            data: {
              address,
              email: undefined,
              ip,
            },
          });
        }

        const session: Session = {
          id: existingUser?.id as string,
          profileId: existingUser?.profile?.id as string,
        };

        return session;
      } catch (error) {
        console.log(error);
        return undefined;
      }
    },
  },
});

// Use the ThirdwebAuthHandler as the default export to handle all requests to /api/auth/*
export default ThirdwebAuthHandler();
