import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const BudgetProgress = ({ initialBudget, currentExpenses }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newBudget, setNewBudget] = useState(
        initialBudget?.amount?.toString() || ""
    );

    const percentUsed = initialBudget
     ? (currentExpenses / initialBudget.amount) * 100
     : 0;

  return (
    <Card>
    <CardHeader>
        <CardTitle>Monthly Budget (Default Account)</CardTitle>
        <CardDescription>Card Description</CardDescription>
    </CardHeader>
    <CardContent>
        <p>Card Content</p>
    </CardContent>
    </Card>

  )
}

export default BudgetProgress;
