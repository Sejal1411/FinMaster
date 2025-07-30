export const dynamic = "force-dynamic";

import { getDashboardData, getUserAccounts } from '@/actions/dashboard';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import React, { Suspense } from 'react'
import AccountCard from './_components/account-card';
import { getCurrentBudget } from '@/actions/budget';
import BudgetProgress from './_components/budget-progress';
import DashboardOverview from './_components/transaction-overview';
import CreateAccountDrawer from '@/frontend/components/create-account-drawer';

async function DashboardPage() {
  try {
    const accounts = await getUserAccounts();
    const defaultAccount = accounts?.find((account) => account.isDefault);

    // Get budget data only if there's a default account
    let budgetData = null;
    if (defaultAccount) {
      try {
        budgetData = await getCurrentBudget(defaultAccount.id);
      } catch (error) {
        console.error('Error fetching budget data:', error);
        budgetData = null;
      }
    }

    const transactions = await getDashboardData();

    return (
      <div className='space-y-8'>
        {/* Budget Progress */}
        {defaultAccount && budgetData && (
          <BudgetProgress 
            initialBudget={budgetData.budget}
            currentExpenses={budgetData?.currentExpenses || 0}
          />
        )}

        {/* Overview */}
        <Suspense fallback={"Loading Overview..."}>
          <DashboardOverview 
            accounts={accounts}
            transactions={transactions || []}
          />
        </Suspense>

        {/* Account Grid */}
        <div className='grid md:grid-cols-2 gap-4 lg:grid-cols-3'>
          <CreateAccountDrawer>
            <Card className='hover:shadow-md transition-shadow cursor-pointer border-dashed'>
              <CardContent className='flex flex-col items-center justify-center text-muted-foreground h-full pt-5'>
                <Plus className='h-10 w-10 mb-2'/>
                <p className='text-sm font-medium'>Add New Account</p>
              </CardContent>
            </Card>
          </CreateAccountDrawer>

          {accounts?.length > 0 && 
            accounts.map((account) => (
              <AccountCard key={account.id} account={account}/>
            ))
          }
        </div>
      </div>
    );
  } catch (error) {
    console.error('Dashboard error:', error);
    return (
      <div className='space-y-8'>
        <div className='text-center text-red-500'>
          Error loading dashboard. Please try again.
        </div>
      </div>
    );
  }
}

export default DashboardPage;