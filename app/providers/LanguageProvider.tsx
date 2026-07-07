'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { type Lang, translations } from '../i18n/translations';

interface LanguageContextValue {
  lang: Lang;
  toggleLang: () => void;
  t: typeof translations;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'es',
  toggleLang: () => {},
  t: translations,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('es');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('egobmz-lang') as Lang | null;
    if (stored === 'en' || stored === 'es') {
      setLang(stored);
    }
  }, []);

  const toggleLang = () => {
    const next: Lang = lang === 'es' ? 'en' : 'es';
    setLang(next);
    localStorage.setItem('egobmz-lang', next);
  };

  if (!mounted) return null;

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t: translations }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
