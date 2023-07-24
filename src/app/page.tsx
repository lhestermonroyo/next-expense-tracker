import { Fragment } from 'react';
import Link from 'next/link';
import { FaceFrownIcon } from '@heroicons/react/24/outline';

import { prisma } from './db';

import StatItem from '@/components/StatItem';
import TransItem from '@/components/TransItem';

async function getExpenses() {
  'use server';

  try {
    return await prisma.expenses.findMany();
  } catch (error) {
    return [];
  }
}

export default async function Home() {
  const expenses = await getExpenses();

  let totalIncome = 0;
  let totalExpense = 0;

  const incomeList = expenses
    .filter(expense => expense.type === 'income')
    .map(expense => expense.amount);

  if (incomeList.length !== 0) {
    totalIncome = incomeList.reduce((acc, expense) => acc + expense);
  }

  const expenseList = expenses
    .filter(expense => expense.type === 'expense')
    .map(expense => expense.amount);

  if (expenseList.length !== 0) {
    totalExpense = expenseList.reduce((acc, expense) => acc + expense);
  }

  return (
    <Fragment>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-xl">Expense Tracker</h1>
        <Link
          className="border border-slate-300 text-slate-300 px-3 py-2 rounded hover:bg-slate-700 focus-within:bg-slate-700 outlne-none"
          href="/add-transaction"
        >
          Add Transaction
        </Link>
      </header>
      <div className="my-12 grid grid-cols-4 gap-4">
        <StatItem type="balance" value={totalIncome - totalExpense} />
        <StatItem type="income" value={totalIncome} />
        <StatItem type="expense" value={totalExpense} />
        <StatItem type="transactions" value={expenses.length} />
      </div>
      {expenses.length === 0 ? (
        <div className="my-24">
          <FaceFrownIcon className="h-16 w-16 mx-auto mb-4" />
          <p className="text-center">No expenses recorded yet.</p>
        </div>
      ) : (
        <ul className="my-12 divide-y rounded divide-gray-200 dark:divide-gray-700">
          {expenses.map(expense => (
            <TransItem key={expense.id} expense={expense} />
          ))}
        </ul>
      )}
    </Fragment>
  );
}
