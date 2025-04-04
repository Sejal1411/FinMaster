"use client"

import { Checkbox } from '@/components/ui/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { categoryColors } from '@/data/categories'
import { format } from 'date-fns'
import { Badge, ChevronDown, ChevronUp, Clock, RefreshCcw, Search, Trash, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useMemo, useState } from 'react'

const RECURRING_INTERVALS = {
  DAILY: "Daily",
  WEEKLY: "Weekly",
  MONTHLY: "Monthly",
  YEARLY: "Yearly",
}

const TransactionTable = ({ transactions }) => {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    field: "date",
    direction: "desc",
  });

  const [searchItem, setSearchItem] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [recurringFilter, setRecurringFilter] = useState("");


  const filteredAndSortedTransactions = useMemo(() => {
    let result = [...transactions];

    if(searchItem) {
      const searchLower = searchItem.toLowerCase();
      result = result.filter((transaction) => 
        transaction.description?.toLowerCase().includes(searchLower) 
      );
    }


    return result;
  }, [
    transactions,
    searchItem,
    typeFilter,
    recurringFilter,
    sortConfig,
  ]);

  const handleSort = (field) => {
    setSortConfig((current) => ({
      field,
      direction: current.field === field && current.direction === "asc" ? "desc" : "asc",
      direction : 
      current.field === field && current.direction === "asc" ? "desc" : "asc",
    }));
  }
  
  const handleSelect = (id) => {
    setSelectedIds((current => 
      current.includes(id)
      ? current.filter(item=>item != id) 
      : [...current, id]
    ));
  }

  const handleSelectAll = () => {
    setSelectedIds((current => 
      current.length === filteredAndSortedTransactions.length
      ? [] 
      : filteredAndSortedTransactions.map((t) => t.id)
    ));
  }

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    // Call the delete function with selectedIds
    deleteFn(selectedIds);
    setSelectedIds([]); // Clear selection after deletion
  }

  const handleClearFilters = () => {
    setSearchItem("");
    setTypeFilter("");
    setRecurringFilter("");
    setSelectedIds([]);
  }

  return (
    <div className='space-y-4'>
      {/* Filters */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div className='relative flex-1'>
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"/>
          <Input 
          placeholder="Search transactions"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          className="pl-8"
          />
        </div>

        <div className='flex gap-2'>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Types"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="INCOME">Income</SelectItem>
              <SelectItem value="EXPENSE">Expense</SelectItem>
            </SelectContent>
          </Select>

          <Select 
            value={recurringFilter} 
            onValueChange={(value) => setRecurringFilter(value)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All Transactions"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recurring">Recurring Only</SelectItem>
              <SelectItem value="non-recurring">Non-Recurring Only</SelectItem>
            </SelectContent>
          </Select>

          {selectedIds.length > 0 && (
            <div className='flex items-center gap-2'>
            <Button
              variant="destructive" 
              size="sm" 
              onClick={handleBulkDelete}
            >
              <Trash className='h-4 w-4 mr-2'/>
              Delete Selected ({selectedIds.length})
            </Button>
            </div>
          )}
          {(searchItem || typeFilter || recurringFilter) && (
            <Button 
             variant="outline" 
             size="sm" 
             onClick={handleClearFilters}
             title="Clear Filters"
             >
              <X className="h-4 w-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Transactions */}
      <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
                <Checkbox 
                  onCheckedChange={handleSelectAll}
                  checked={
                    selectedIds.length === 
                     filteredAndSortedTransactions.length &&
                     filteredAndSortedTransactions.length > 0
                  }
                />
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort("date")}
            >
                <div className='flex items-center'> Date
                  {sortConfig.field === "date" && 
                   (sortConfig.direction === "asc" ? (
                    <ChevronUp className='ml-1 h-4 w-4'/>
                  ) : (
                    <ChevronDown className='ml-1 h-4 w-4' />
                  ))}
                  {sortConfig.field === "date" && (
                    <span className="ml-2">{sortConfig.direction === "asc" ? <ChevronUp /> : <ChevronDown />}</span>
                  )}
                </div>
            </TableHead>
            <TableHead>Description</TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort("category")}
            >
              <div className='flex items-center'>
                Category
                {sortConfig.field === "category" && 
                   (sortConfig.direction === "asc" ? (
                    <ChevronUp className='ml-1 h-4 w-4'/>
                  ) : (
                    <ChevronDown className='ml-1 h-4 w-4' />
                  ))}
                  {sortConfig.field === "date" && (
                    <span className="ml-2">{sortConfig.direction === "asc" ? <ChevronUp /> : <ChevronDown />}</span>
                  )}
              </div>

            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort("amount")}
            >
                <div className='flex items-cente justify-end'>
                  Amount
                  {sortConfig.field === "amount" && 
                   (sortConfig.direction === "asc" ? (
                    <ChevronUp className='ml-1 h-4 w-4'/>
                  ) : (
                    <ChevronDown className='ml-1 h-4 w-4' />
                  ))}
                  {sortConfig.field === "date" && (
                    <span className="ml-2">{sortConfig.direction === "asc" ? <ChevronUp /> : <ChevronDown />}</span>
                  )}
                </div>
            </TableHead>
            <TableHead>Recurring</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            {filteredAndSortedTransactions.length !== 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center
                  text-muted-foreground">
                    No Transaction Found
                </TableCell>
              </TableRow>
            ): (
              filteredAndSortedTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <Checkbox onCheckedChange={() => handleSelect(transaction.id)}
                     checked={selectedIds.includes(transaction.id)}
                    />
                  </TableCell>
                  <TableCell>{format(new Date(transaction.date), "PP")}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className="capitalize">
                    <span style={{
                      background: categoryColors[transaction.category],
                    }}
                      className='px-2 py-1 rounded text-white text-sm'
                    >
                     {transaction.category}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {transaction.type === "EXPENSE" ? "red" : "green"}$
                    ${transaction.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {transaction.isRecurring ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <TooltipContent>
                            <Badge 
                             variant="outline" 
                             className='gap-1 bg-purple-100 text-purple-700 hover:bg-purple-200'>
                              <RefreshCcw className='h-3 w-3'/>
                              {RECURRING_INTERVALS[
                                transaction.recurringInterval
                              ]}
                            </Badge>
                            </TooltipContent>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className='text-sm'>
                              <div className='font-medium'>Next Date:</div>
                              <div>
                                {format(
                                  new Date(transaction.nextRecurringDate),
                                  "PP"
                                )}
                              </div>

                            </div>
                          </TooltipContent>
                        </Tooltip>
                     </TooltipProvider>
                    ) : (
                      <Badge variant="outline" className='gap-1'>
                        <Clock className='h-3 w-3'/>
                        One-time
                      </Badge>
                    )}
                  </TableCell>

                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel 
                            onClick={() => {
                              // Handle edit action
                              router.push(
                                `/transaction/create?edit=${transaction.id}`
                              )
                            }}>
                          Edit</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                         className="text-destructive"
                         onClick={() => deleteFn([transaction.id])}> 
                         Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
              </TableRow>
              ))
            )}
        </TableBody>
     </Table>
     </div>
    </div>
  )
}

export default TransactionTable
