
import React from 'react';
import { Filter } from '../types';

interface TodoFilterProps {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
  activeTodosCount: number;
  onClearCompleted: () => void;
  hasCompletedTodos: boolean;
}

const FilterButton: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`font-bold transition-colors duration-200 ${
      isActive
        ? 'text-blue-500'
        : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
    }`}
  >
    {label}
  </button>
);

export const TodoFilter: React.FC<TodoFilterProps> = ({ 
  filter, 
  onFilterChange, 
  activeTodosCount, 
  onClearCompleted,
  hasCompletedTodos
}) => {
  return (
    <div className="flex items-center justify-between p-4 px-6 text-sm text-gray-500 dark:text-gray-400">
      <span>{activeTodosCount} item{activeTodosCount !== 1 ? 's' : ''} left</span>
      
      <div className="hidden space-x-4 sm:block">
        <FilterButton label="All" isActive={filter === Filter.All} onClick={() => onFilterChange(Filter.All)} />
        <FilterButton label="Active" isActive={filter === Filter.Active} onClick={() => onFilterChange(Filter.Active)} />
        <FilterButton label="Completed" isActive={filter === Filter.Completed} onClick={() => onFilterChange(Filter.Completed)} />
      </div>

      <button
        onClick={onClearCompleted}
        className={`transition-colors duration-200 hover:text-gray-800 dark:hover:text-gray-200 ${
          !hasCompletedTodos ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={!hasCompletedTodos}
      >
        Clear Completed
      </button>
    </div>
  );
};
