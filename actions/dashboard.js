"use server"

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { clerkClient } from "@clerk/nextjs/server";


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

export async function createAccount(data) {   
    try{
        const { userId } = await auth();
        if(!userId) throw new Error('Unauthorized');

        const user = await db.user.findUnique({
            where: {
                clerkUserId: userId,
            },
        });

        if(!user) {
            console.error("User not found in the database for userId:", userId);
            throw new Error('Unauthorized');
        }

        // Convert balance to float before saving
        const balanceFloat = parseFloat(data.balance);
        if(isNaN(balanceFloat)) {
            throw new Error('Invalid balance amount');
        }

        //Check if this is the user's first amount
        const existingAccounts = await db.account.findMany({
            where: { userId: user.id},
        });

        const shouldBeDefault = 
          existingAccounts.length === 0?true: data.isDefault;

        // If this account should be default, unset other default accounts
        if (shouldBeDefault) {
            await db.account.updateMany({
                where: { userId: user.id, isDefault: true},
                data: { isDefault: false},
            });
        }

        const account = await db.account.create({
            data: {
                ...data,
                balance: balanceFloat,
                userId: user.id,
                isDefault: shouldBeDefault,
            },
        });


        const serializedAccount = serializedTransaction(account);

        revalidatePath("/dashboard");
        return { success: true, data: serializedAccount}
    } catch(error) {
        throw new Error(error.message);
    }
}

export async function getUserAccounts() {
  try {
    const { userId } = await auth();
    console.log("Retrieved userId:", userId); // Debug log

    if (!userId) throw new Error("Unauthorized");

    // Try to find the user in your DB
    let user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    // If not found, create the user
    if (!user) {
      const clerkUser = await clerkClient.users.getUser(userId);
      console.warn("User not found in DB, creating one...");
      user = await db.user.create({
        data: {
          clerkUserId: userId,
          email: clerkUser.emailAddresses[0].emailAddress,
        },
      });
    }

    // Get accounts for this user
    const accounts = await db.account.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: {
            transactions: true,
          },
        },
      },
    });

    const serializedAccount = accounts.map(serializedTransaction);
    return serializedAccount;

  } catch (error) {
    console.error("Error in getUserAccounts:", error.message);
    throw new Error(error.message);
  }
}



export async function getDashboardData() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Get all user transactions
  const transactions = await db.transaction.findMany({
    where: { userId: user.id },
    orderBy: { date: "desc" },
  });

  return transactions.map(serializedTransaction);
}