
import React, { useState } from 'react';

interface TodoInputProps {
  onAddTodo: (text: string) => void;
}

export const TodoInput: React.FC<TodoInputProps> = ({ onAddTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTodo(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="absolute top-0 left-0 flex items-center h-full pl-6">
        <div className="w-6 h-6 border-2 rounded-full border-gray-300 dark:border-gray-600"></div>
      </div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Create a new todo..."
        className="w-full py-4 pl-16 pr-6 text-lg bg-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-400"
      />
    </form>
  );
};
