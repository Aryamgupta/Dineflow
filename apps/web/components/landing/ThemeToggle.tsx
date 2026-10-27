'use client';

import { useEffect, useState } from 'react';
import { Icon } from './Icon';

type Theme = 'light' | 'dark';
type ThemeToggleProps = { compact?: boolean };

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  try {
    window.localStorage.setItem('dineflow-theme', theme);
  } catch {
    // The theme still applies for the current page if storage is unavailable.
  }
}

export function ThemeToggle({ compact = false }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    let savedTheme: string | null = null;
    try {
      savedTheme = window.localStorage.getItem('dineflow-theme');
    } catch {
      // Fall back to the operating system preference when storage is unavailable.
    }
    const initialTheme: Theme = savedTheme === 'dark' || savedTheme === 'light'
      ? savedTheme
      : window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';

    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
    document.documentElement.style.colorScheme = initialTheme;

    const syncTheme = () => {
      const currentTheme = document.documentElement.dataset.theme;
      if (currentTheme === 'dark' || currentTheme === 'light') setTheme(currentTheme);
    };
    window.addEventListener('dineflow-theme-change', syncTheme);
    return () => window.removeEventListener('dineflow-theme-change', syncTheme);
  }, []);

  function toggleTheme() {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    applyTheme(nextTheme);
    window.dispatchEvent(new Event('dineflow-theme-change'));
  }

  return (
    <button
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      aria-pressed={theme === 'dark'}
      className={`theme-toggle${compact ? ' theme-toggle-compact' : ''}`}
      onClick={toggleTheme}
      type="button"
    >
      <Icon name={theme === 'light' ? 'dark_mode' : 'light_mode'} />
      {compact ? <span>Theme</span> : null}
      <span className="visually-hidden">{theme === 'light' ? 'Dark theme' : 'Light theme'}</span>
    </button>
  );
}
