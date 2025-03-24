"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const serializedTransaction = (obj) => {
    const serialized = { ...obj };
 
     if(obj.balance) {
         serialized.balance = obj.balance.toNumber();
     }
 
     if(obj.amount) {
         serialized.amount = obj.amount.toNumber();
     }
 
     return serialized;
};

export async function updateDefaultAccount(accountId) {
    try {
        const { userId } = await auth();
            if(!userId) throw new Error('Unauthorized');
        
            const user = await db.user.findUnique({
                where: {
                    clerkUserId: userId,
                },
            });
        
            if(!user) {
                throw new Error('Unauthorized');
            }

            await db.account.updateMany({
                where: { userId: user.id, isDefault: true},
                data: { isDefault: false},
            });

            const account = await db.account.update({
                where: {
                    id: accountId,
                    userId: user.id,
                },
                data: { isDefault: true},
            });

            revalidatePath("/dashboard");
            return { success: true, data: serializedTransaction(account)};
    } catch (error) {
       return { success: false, error: error.response };
    }
}

export async function getAccountWithTransactions(accountId) {
    const { userId } = await auth();
        if(!userId) throw new Error('Unauthorized');
        
        const user = await db.user.findUnique({
            where: {
                clerkUserId: userId,
            },
        });
        
        if(!user) {
            throw new Error('Unauthorized');
        }

        const account = await db.account.findUnique({
            where: { id: accountId, userId: user.id },
            include: {
                transactions: {
                    orderBy: { data: "desc" },
                },
                _count: {
                    select: {transactions: true },
                },
            },
        });

        if(!account) return null;

        return {
            ...serializedTransaction(account),
            transactions:account.transactions.map(serializedTransaction),
        }
}