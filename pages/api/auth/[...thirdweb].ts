import { ThirdwebAuth } from '@thirdweb-dev/auth/next';
import { PrivateKeyWallet } from '@thirdweb-dev/auth/evm';
import prisma from '@/prisma/prisma';
import { DEFAULT_URL } from '@/utils/config';

// Here we configure thirdweb auth with a domain and wallet
export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
  domain: process.env.NEXT_PUBLIC_AUTH_DOMAIN || '',
  wallet: new PrivateKeyWallet(process.env.AUTH_PRIVATE_KEY || ''),
  authOptions: {
    statement:
      'Please ensure that the domain above matches the URL of the current website.',
  },
  callbacks: {
    onLogin: async (address: string) => {
      const existingUser = await prisma.user.findUnique({
        where: {
          address,
        },
      });

      if (!existingUser) {
        await prisma.user.create({
          data: {
            address,
          },
        });
      }
    },
  },
});

// Use the ThirdwebAuthHandler as the default export to handle all requests to /api/auth/*
export default ThirdwebAuthHandler();
