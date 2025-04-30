import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { name: "Check Budget Alerts" },
  { cron: "0 */6 * * *" },
  async ({ step }) => {
    const budget = await step.run("fetch-budget", async()=> {
        return await db.budget.findMany({
            include: {
                user: {
                    include: {
                        accounts: {
                            where: {
                                isDefault: true,
                            },
                        },
                    },
                },
            },
        });
    });

    for(const budget of budget) {
        const defaultAccount = budget.user.accounts[0];
        if(!defaultAccount) continue;
    }
  },
);
