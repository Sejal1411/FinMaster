import { sendEmail } from "@/actions/send-email";
import { inngest } from "./client";
import EmailTemplate from "@/emails/templates";

export const checkBudgetAlert = inngest.createFunction(
  { name: "Check Budget Alerts" },
  { cron: "0 */6 * * *" },
  async ({ step }) => {
    const budgets = await step.run("fetch-budget", async()=> {
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

    for(const budget of budgets) {
        const defaultAccount = budget.user.accounts[0];
        if(!defaultAccount) continue;

        await step.run(`check-budget-${budget.id}`, async () => {
            const startDate = new Date();
            startDate.setDate(1);

            const expenses = await db.transaction.aggregate({
                where: {
                    userId: budget.userId,
                    accountId: defaultAccount.id,
                    type: "EXPENSE",
                    date: {
                        gte: startDate,
                    },
                },
                _sum: {
                    amount: true,
                },
            });

            const totalExpenses = expenses._sum.amount?.toNumber() || 0;
            const budgetAmount = budget.amount;
            const percentageUsed = (totalExpenses / budgetAmount) * 100;

            if(percentageUsed>=80 && 
                (!budget.lastAlertSent || 
                 isNewMonth(new Date(budget.lastAlertSent), new Date()))
            ) {
                // Send Email
                await sendEmail({
                    to: budget.user.email,
                    subject: `Budget Alert for ${defaultAccount.name}`,
                    react: EmailTemplate({
                        userName: budget.user.name,
                        type: "budget-alert",
                        data: {
                            percentageUsed,
                            budgetAmount: parsedInt(budgetAmount).toFixed(1),
                            totalExpenses: parseInt(totalExpenses).toFixed(1),
                            accountName: defaultAccount.name,
                        }
                    }),
                });

                // Update lastAlertSent
                await db.budget.update({
                    where: { id: budget.id },
                    data: { lastAlertSent: new Date() },
                })
        }
        });
    }
  },
);

function isNewMonth(lastAlertDate, currentDate) {
    return (
        lastAlertDate.getMonth() !== currentDate.getMonth() ||
        lastAlertDate.getFullYear() !== currentDate.getFullYear()
    )
}
