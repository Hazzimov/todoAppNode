// FIX: Import Jest globals to resolve TypeScript errors.
import { describe, beforeAll, it, expect } from '@jest/globals';
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  beforeAll(() => {
    // Mock localStorage
    const localStorageMock = (() => {
      let store: { [key: string]: string } = {};
      return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
          store[key] = value.toString();
        },
        removeItem: (key: string) => {
          delete store[key];
        },
        clear: () => {
          store = {};
        },
      };
    })();
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
  });

  it('renders the main heading', () => {
    render(<App />);
    const headingElement = screen.getByRole('heading', { name: /todo/i });
    expect(headingElement).toBeInTheDocument();
  });

  it('renders the todo input field', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/create a new todo.../i);
    expect(inputElement).toBeInTheDocument();
  });
});
