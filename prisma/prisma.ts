import { PrismaClient } from '@prisma/client';
const prisma = typeof window === 'undefined' ? new PrismaClient() : null;
export default prisma;
