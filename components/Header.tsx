
import React from 'react';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="flex items-center justify-between mb-8">
      <h1 className="text-4xl font-bold tracking-widest text-white uppercase sm:text-5xl">
        Todo App
      </h1>
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="text-white transition-transform duration-300 hover:scale-125 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white rounded-full"
      >
        {theme === 'light' ? <MoonIcon /> : <SunIcon />}
      </button>
    </header>
  );
};
