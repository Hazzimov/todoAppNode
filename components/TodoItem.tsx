
import React, { useState, useRef, useEffect } from 'react';
import { Todo } from '../types';
import { TrashIcon } from './icons/TrashIcon';
import { CheckIcon } from './icons/CheckIcon';


interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);
  
  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  const handleEditSubmit = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEditSubmit();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <li className="group flex items-center justify-between p-4 px-6 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center flex-grow">
        <button
          onClick={() => onToggle(todo.id)}
          className={`w-6 h-6 border-2 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
            todo.completed
              ? 'border-blue-500 bg-blue-500'
              : 'border-gray-300 dark:border-gray-600 hover:border-blue-500'
          }`}
          aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {todo.completed && <CheckIcon />}
        </button>
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={handleEditChange}
            onBlur={handleEditSubmit}
            onKeyDown={handleKeyDown}
            className="w-full px-2 py-1 ml-4 text-lg bg-transparent border-b border-blue-500 focus:outline-none"
          />
        ) : (
          <span
            onDoubleClick={handleDoubleClick}
            className={`ml-4 text-lg cursor-pointer ${
              todo.completed ? 'line-through text-gray-400 dark:text-gray-500' : ''
            }`}
          >
            {todo.text}
          </span>
        )}
      </div>
      <button 
        onClick={() => onDelete(todo.id)} 
        className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:text-red-500 focus:outline-none focus:text-red-500"
        aria-label="Delete todo"
      >
        <TrashIcon />
      </button>
    </li>
  );
};
