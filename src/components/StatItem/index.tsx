import {
  BanknotesIcon,
  GlobeAltIcon,
  QueueListIcon,
  ReceiptPercentIcon,
} from '@heroicons/react/24/outline';
import React from 'react';

type StatItemProps = {
  type: 'balance' | 'income' | 'expense' | 'transactions';
  value: number;
};

export default function StatItem({ type, value }: StatItemProps) {
  return (
    <div className="block p-6 border border-gray-600 bg-slate-700 rounded-lg shadow">
      <div className="flex justify-end mb-4">
        {type === 'balance' && (
          <div className="p-2 rounded-full bg-yellow-500">
            <GlobeAltIcon className="h-4 w-4" />
          </div>
        )}
        {type === 'income' && (
          <div className="p-2 rounded-full bg-green-600">
            <BanknotesIcon className="h-4 w-4" />
          </div>
        )}
        {type === 'expense' && (
          <div className="p-2 rounded-full bg-red-600">
            <ReceiptPercentIcon className="h-4 w-4" />
          </div>
        )}
        {type === 'transactions' && (
          <div className="p-2 rounded-full bg-blue-700">
            <QueueListIcon className="h-4 w-4" />
          </div>
        )}
      </div>
      <h5 className="mb-2 text-4xl font-bold tracking-tight">
        {type !== 'transactions' && '$'}
        {type !== 'transactions' ? (value ?? 0).toFixed(2) : value ?? 0}
      </h5>
      <p className="font-normal text-gray-400 capitalize">{type}</p>
    </div>
  );
}
