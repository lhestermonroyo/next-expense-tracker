import React from 'react';
import { BanknotesIcon, ReceiptPercentIcon } from '@heroicons/react/24/outline';

type TransItemProps = {
  expense: {
    id: string;
    type: string;
    name: string;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
  };
};

export default function TransItem({ expense }: TransItemProps) {
  return (
    <li
      key={expense.id}
      className="p-3 hover:bg-slate-700 transition ease-in-out duration-500"
    >
      <div className="flex items-center space-x-6">
        <div className="flex-shrink-0">
          {expense.type === 'income' ? (
            <div className="p-3 rounded-full bg-green-600">
              <BanknotesIcon className="h-8 w-8" />
            </div>
          ) : (
            <div className="p-3 rounded-full bg-red-600">
              <ReceiptPercentIcon className="h-8 w-8" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-md font-medium truncate">{expense.name}</p>
          <p className="text-xs text-gray-400 capitalize truncate">
            {expense.type} &bull; {expense.updatedAt.toLocaleString()}
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold">
          ${expense.amount.toFixed(2)}
        </div>
      </div>
    </li>
  );
}
