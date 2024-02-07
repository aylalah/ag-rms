import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined; //eslint-disable-line no-var
}

const prisma = global.prisma || new PrismaClient({ log: [] });

if (process.env.NODE_ENV === 'development') global.prisma = prisma;

export const dbQuery = prisma;
