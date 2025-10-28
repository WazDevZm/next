'use client';

import { useState } from 'react';
import { Record } from '@/types/Record';
import deleteRecord from '@/app/actions/deleteRecord';

interface RecordItemProps {
  record: Record;
}

const RecordItem = ({ record }: RecordItemProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this expense?')) {
      return;
    }

    setIsDeleting(true);
    try {
      const result = await deleteRecord(record.id);
      if (result.error) {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error deleting record:', error);
      alert('Failed to delete expense');
    } finally {
      setIsDeleting(false);
    }
  };

  const getCategoryIcon = (category: string | null) => {
    switch (category) {
      case 'Food':
        return '🍔';
      case 'Transportation':
        return '🚗';
      case 'Shopping':
        return '🛒';
      case 'Entertainment':
        return '🎬';
      case 'Bills':
        return '💡';
      case 'Healthcare':
        return '🏥';
      default:
        return '📦';
    }
  };

  const getCategoryColor = (category: string | null) => {
    switch (category) {
      case 'Food':
        return 'from-orange-500 to-red-500';
      case 'Transportation':
        return 'from-blue-500 to-cyan-500';
      case 'Shopping':
        return 'from-purple-500 to-pink-500';
      case 'Entertainment':
        return 'from-pink-500 to-rose-500';
      case 'Bills':
        return 'from-yellow-500 to-orange-500';
      case 'Healthcare':
        return 'from-green-500 to-emerald-500';
      default:
        return 'from-gray-500 to-slate-500';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 sm:p-4 rounded-xl shadow-lg border border-gray-100/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-200 group'>
      <div className='flex items-start justify-between gap-2 mb-2'>
        <div className='flex items-center gap-2 flex-1 min-w-0'>
          <div
            className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br ${getCategoryColor(
              record.category
            )} rounded-lg flex items-center justify-center shadow-md flex-shrink-0`}
          >
            <span className='text-sm sm:text-base'>
              {getCategoryIcon(record.category)}
            </span>
          </div>
          <div className='flex-1 min-w-0'>
            <h4 className='font-bold text-gray-900 dark:text-gray-100 text-sm truncate'>
              {record.text}
            </h4>
            <p className='text-xs text-gray-500 dark:text-gray-400'>
              {record.category || 'Other'}
            </p>
          </div>
        </div>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className='w-7 h-7 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 disabled:opacity-50 flex-shrink-0'
          title='Delete expense'
        >
          {isDeleting ? (
            <div className='w-3 h-3 border-2 border-red-600/30 border-t-red-600 rounded-full animate-spin'></div>
          ) : (
            <span className='text-sm'>🗑️</span>
          )}
        </button>
      </div>

      <div className='flex items-center justify-between mt-2 pt-2 border-t border-gray-100 dark:border-gray-700'>
        <span className='text-xs text-gray-500 dark:text-gray-400'>
          {formatDate(record.date || record.createdAt.toString())}
        </span>
        <span className='text-base sm:text-lg font-bold text-emerald-600 dark:text-emerald-400'>
          K{record.amount.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default RecordItem;
