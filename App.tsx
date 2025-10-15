
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Todo } from './types';
import { Filter } from './types';
import { Header } from './components/Header';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TODO_STORAGE_KEY } from './constants';
import { THEME_STORAGE_KEY } from './constants';

const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>(TODO_STORAGE_KEY, []);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>(THEME_STORAGE_KEY, 'light');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  }, [setTheme]);

  const addTodo = useCallback((text: string) => {
    if (text.trim() === '') return;
    const newTodo: Todo = {
      id: `${Date.now()}-${Math.random()}`,
      text,
      completed: false,
    };
    setTodos(prevTodos => [newTodo, ...prevTodos]);
  }, [setTodos]);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, [setTodos]);
  
  const deleteTodo = useCallback((id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }, [setTodos]);

  const editTodo = useCallback((id: string, newText: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  }, [setTodos]);

  const clearCompleted = useCallback(() => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  }, [setTodos]);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case Filter.Active:
        return todos.filter(todo => !todo.completed);
      case Filter.Completed:
        return todos.filter(todo => todo.completed);
      case Filter.All:
      default:
        return todos;
    }
  }, [todos, filter]);

  const activeTodosCount = useMemo(() => todos.filter(todo => !todo.completed).length, [todos]);

  return (
    <div className="min-h-screen font-sans text-gray-800 transition-colors duration-300 bg-gray-100 dark:bg-gray-900 dark:text-gray-200">
      <div className="container max-w-2xl px-4 py-12 mx-auto sm:py-20">
        <Header theme={theme} toggleTheme={toggleTheme} />
        
        <main>
          <TodoInput onAddTodo={addTodo} />
          
          <div className="mt-8 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <TodoList 
              todos={filteredTodos} 
              onToggleTodo={toggleTodo} 
              onDeleteTodo={deleteTodo}
              onEditTodo={editTodo}
            />
            <TodoFilter 
              filter={filter}
              onFilterChange={setFilter}
              activeTodosCount={activeTodosCount}
              onClearCompleted={clearCompleted}
              hasCompletedTodos={todos.some(t => t.completed)}
            />
          </div>
        </main>

        <footer className="mt-12 text-sm text-center text-gray-500 dark:text-gray-400">
          <p>Double-click a todo to edit it.</p>
          <p>Built with React, TypeScript, and Tailwind CSS.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
