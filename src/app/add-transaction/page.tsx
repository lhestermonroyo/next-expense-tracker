import { Fragment } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

import { prisma } from '../db';

async function createTransaction(payload: FormData) {
  'use server';

  const type = payload.get('type')?.valueOf();
  const name = payload.get('name')?.valueOf();
  const amount = payload.get('amount')?.valueOf();

  if (typeof type !== 'string' || type.length === 0) {
    return;
  }

  if (typeof name !== 'string' || name.length === 0) {
    return;
  }

  if (typeof amount !== 'string' || amount.length === 0) {
    return;
  }

  await prisma.expenses.create({
    data: {
      type,
      name,
      amount: parseFloat(amount),
    },
  });

  redirect('/');
}
export default async function AddTransaction() {
  return (
    <Fragment>
      <header className="flex justify-start items-center mb-4">
        <Link
          className="flex justify-center items-center border border-slate-300 text-slate-300 px-3 py-2 rounded hover:bg-slate-700 focus-within:bg-slate-700 outlne-none mr-4"
          href="/"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" /> Back
        </Link>
        <h1 className="text-xl">Add Transaction</h1>
      </header>
      <form action={createTransaction} className="mt-12">
        <div className="w-full mb-2">
          <label className="block mb-2" htmlFor="type">
            Type
          </label>
          <select
            name="type"
            placeholder="Select type"
            id="type"
            className="w-full px-3 py-2 rounded border border-slate-300 mb-4 bg-slate-700"
          >
            <option value="">Select type</option>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <div className="w-full mb-2">
          <label className="block mb-2" htmlFor="name">
            Expense Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter expense name"
            id="name"
            className="w-full px-3 py-2 rounded border border-slate-300 mb-4 bg-slate-700"
          />
        </div>
        <div className="w-full mb-2">
          <label className="block mb-2" htmlFor="amount">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            placeholder="Enter amount"
            id="name"
            className="w-full px-3 py-2 rounded border border-slate-300 mb-4 bg-slate-700"
          />
        </div>
        <div className="w-full mb-2 flex gap-2 justify-end">
          <button className="border border-slate-300 text-slate-300 px-3 py-3 rounded hover:bg-slate-700 focus-within:bg-slate-700 outlne-none">
            Save Transaction
          </button>
          <Link
            href="/"
            className="border border-slate-300 text-slate-300 px-3 py-3 rounded hover:bg-slate-700 focus-within:bg-slate-700 outlne-none"
          >
            Cancel
          </Link>
        </div>
      </form>
    </Fragment>
  );
}
