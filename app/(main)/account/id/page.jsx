import React from 'react'

const AccountsPage = async ({params}) => {
  const accountData = await getAccountWithTransactions(params.id);

  if(!accountData) {
    notFound();
  }

  const { transactions, ...account } = accountData;

   return (
    <div className='space-y-8 px-5 flex gap-4 items-end justify-between'>
      <div>
        <h1>{account.name}</h1>
        <p>{type.charAt(0) + type.slice(1).toLowerCase()} Account</p>
      </div>

      <div>
        <div>${parseFloat(account.balance).toFixed(2)}</div>
        <p>{account._count.transactions} Transactions</p>
      </div>
    
    
    {/* Chart Section */}

    {/* Transaction Table */}
    </div>
  )
}

export default AccountsPage;
