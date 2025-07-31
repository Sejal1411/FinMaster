import { getAccountWithTransactions } from '@/actions/accounts';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';
import TransactionTable from '../_components/transaction-table';
import { BarLoader } from 'react-spinners';
import AccountChart from '../_components/account-chart';

const AccountsPage = async ({ params }) => {
    // Ensure params is awaited before accessing its properties
    const resolvedParams = await params;

    if (!resolvedParams?.id) {
        notFound();
    }

    const accountData = await getAccountWithTransactions(resolvedParams.id);

    if (!accountData) {
        notFound();
    }

    const { transactions, ...account } = accountData;

    return (
        <div className='space-y-8 px-5 mt-5'>
            <div className='flex gap-4 items-end justify-between'>
                <div className='mb-5'>
                    <h1 className='text-5xl text-pink-200 sm:text-6xl font-bold capitalize'>
                        {account.name}
                    </h1>
                    
                </div>

                <div className='text-right pb-2 text-pink-100'>
                    <div className='text-xl sm:text-2xl font-bold'>
                        ${parseFloat(account.balance).toFixed(2)}
                    </div>
                     <p className='text-gray-900'>
                        {account.type.charAt(0).toUpperCase() + account.type.slice(1).toLowerCase()} Account
                    </p>
                    <p className='text-sm text-gray-900'>
                        {account._count.transactions} Transactions
                    </p>
                </div>
            </div>

            {/* {Chart Section} */}
            <Suspense 
              fallback={<BarLoader className='mt-4' width={"100%"} color="#9333ea" />}
            >
                <AccountChart transactions={transactions} />
            </Suspense>

            {/* Transaction Table */}
            <Suspense fallback={<BarLoader className='mt-4' width={"100%"} color="#9333ea" />}>
                <TransactionTable transactions={transactions} />
            </Suspense>
        </div>
    );
};

export default AccountsPage;