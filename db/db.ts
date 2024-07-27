import { PrismaClient } from '@prisma/client';

// Singleton pattern to create a single instance of PrismaClient
const prismaClientSingleton = new PrismaClient();

// Declare a global variable to hold the PrismaClient instance in development mode
declare global {
    var prisma: PrismaClient | undefined;
}

// Use the global variable if it exists, otherwise create a new instance
const db = globalThis.prisma ?? prismaClientSingleton;

// Set the global variable in development mode to prevent creating multiple instances
if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = db;
}

export default db;

/*

import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

export default db*/