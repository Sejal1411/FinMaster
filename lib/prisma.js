import  { PrismaClient } from '@prisma/client';

export const db = globalThis.prisma || new PrismaClient();

if (process.nextTick.NODE_ENV !== 'production') {
    globalThis.prisma = db;
}