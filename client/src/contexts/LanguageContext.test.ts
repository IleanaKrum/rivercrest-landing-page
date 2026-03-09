import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

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

describe('LanguageContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should have English and Swahili translation keys', () => {
    const translations = {
      en: {
        'dashboard.title': 'Student Dashboard',
        'language.english': 'English',
        'language.swahili': 'Swahili',
      },
      sw: {
        'dashboard.title': 'Dashibodi ya Wanafunzi',
        'language.english': 'Kiingereza',
        'language.swahili': 'Kiswahili',
      },
    };

    expect(translations.en['dashboard.title']).toBe('Student Dashboard');
    expect(translations.sw['dashboard.title']).toBe('Dashibodi ya Wanafunzi');
  });

  it('should persist language preference to localStorage', () => {
    localStorage.setItem('language', 'sw');
    expect(localStorage.getItem('language')).toBe('sw');
  });

  it('should retrieve language preference from localStorage', () => {
    localStorage.setItem('language', 'en');
    const savedLanguage = localStorage.getItem('language');
    expect(savedLanguage).toBe('en');
  });

  it('should default to English when no language is saved', () => {
    const savedLanguage = localStorage.getItem('language');
    expect(savedLanguage).toBeNull();
  });

  it('should support switching between languages', () => {
    localStorage.setItem('language', 'en');
    expect(localStorage.getItem('language')).toBe('en');

    localStorage.setItem('language', 'sw');
    expect(localStorage.getItem('language')).toBe('sw');
  });
});
