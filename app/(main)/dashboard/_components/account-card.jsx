import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react'

const AccountCard = ({ account }) => {
    const {name, type, balance, id, isDefault } = account;
  return (
    <Card>
       <CardHeader>
        <CardTitle>{name}</CardTitle>
        <Switch />
       </CardHeader>
       <CardContent>
         <div className='text-2xl font-bold'>
            ${parseFloat(balance).toFixed(2)}
         </div>
       </CardContent>
       <CardFooter>
        <p>Card Footer</p>
       </CardFooter>
    </Card>

  )
}

export default AccountCard
