'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from '../providers/ThemeProvider';
import { useLang } from '../providers/LanguageProvider';

const GITHUB_URL   = 'https://github.com/EgoBMZ';
const LINKEDIN_URL = 'https://www.linkedin.com/in/egobmz/';

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  );
}

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const isHome = pathname === '/';

  const NAV_LINKS = [
    { href: isHome ? '#about' : '/#about',       label: t.nav.about[lang] },
    { href: isHome ? '#stack' : '/#stack',       label: t.nav.stack[lang] },
    { href: isHome ? '#projects' : '/#projects', label: t.nav.projects[lang] },
    { href: isHome ? '#process' : '/#process',   label: t.nav.process[lang] },
    { href: isHome ? '#contact' : '/#contact',   label: t.nav.contact[lang] },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <>
      {/* ─── Navbar ─── */}
      <header
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
        style={{
          background: scrolled
            ? `${theme === 'dark' ? 'rgba(13,13,13,0.88)' : 'rgba(245,243,238,0.88)'}`
            : 'transparent',
          backdropFilter: scrolled ? 'blur(16px) saturate(1.8)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        }}
      >
        <div className="section-container">
          <nav className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <a href="/" className="flex items-center group py-1" aria-label="EgoBMZ Home">
              <img src="/logo.svg" alt="EgoBMZ Logo" className="w-14 h-14 md:w-16 md:h-16 object-contain transition-transform duration-300 group-hover:scale-110" />
            </a>

            {/* Desktop Nav Links */}
            <ul className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="relative px-4 py-2 rounded-lg font-body text-sm font-medium transition-all duration-200 hover:bg-[var(--surface-alt)] group"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    <span className="relative group-hover:text-[var(--text-primary)] transition-colors duration-200">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Desktop right actions */}
            <div className="hidden md:flex items-center gap-2">
              {/* Lang toggle */}
              <button
                id="lang-toggle-desktop"
                onClick={toggleLang}
                aria-label="Toggle language"
                className="h-9 px-3 rounded-lg flex items-center gap-1.5 text-xs font-mono font-medium transition-all duration-200 hover:bg-[var(--surface-alt)]"
                style={{ color: 'var(--text-muted)', border: '1px solid var(--border)' }}
              >
                <span className="text-base leading-none">{lang === 'es' ? '🇪🇸' : '🇬🇧'}</span>
                <span>{lang === 'es' ? 'ES' : 'EN'}</span>
                <span style={{ color: 'var(--border-strong)' }}>|</span>
                <span style={{ color: 'var(--text-faint)' }}>{lang === 'es' ? 'EN' : 'ES'}</span>
              </button>

              {/* GitHub */}
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-[var(--surface-alt)] hover:text-[var(--accent)]"
                style={{ color: 'var(--text-muted)' }}
              >
                <GithubIcon />
              </a>

              {/* LinkedIn */}
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-[var(--surface-alt)] hover:text-[var(--accent)]"
                style={{ color: 'var(--text-muted)' }}
              >
                <LinkedInIcon />
              </a>

              {/* Theme toggle */}
              <button
                id="theme-toggle-desktop"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-[var(--surface-alt)]"
                style={{ color: 'var(--text-muted)' }}
              >
                <span className="transition-all duration-300">
                  {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                </span>
              </button>

              {/* CTA */}
              <a href={isHome ? '#contact' : '/#contact'} className="btn-primary text-sm px-4 py-2.5">
                {t.nav.cta[lang]}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"/>
                  <polyline points="7 7 17 7 17 17"/>
                </svg>
              </a>
            </div>

            {/* Mobile: controls */}
            <div className="flex md:hidden items-center gap-1">
              {/* Lang toggle mobile */}
              <button
                id="lang-toggle-mobile"
                onClick={toggleLang}
                aria-label="Toggle language"
                className="h-9 px-2 rounded-lg flex items-center gap-1 text-xs font-mono font-medium transition-all duration-200 hover:bg-[var(--surface-alt)]"
                style={{ color: 'var(--text-muted)' }}
              >
                <span className="text-base leading-none">{lang === 'es' ? '🇪🇸' : '🇬🇧'}</span>
                <span>{lang === 'es' ? 'ES' : 'EN'}</span>
              </button>

              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-[var(--surface-alt)]"
                style={{ color: 'var(--text-muted)' }}
              >
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              </button>
              <button
                id="menu-toggle"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-[var(--surface-alt)]"
                style={{ color: 'var(--text-primary)' }}
              >
                <MenuIcon />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* ─── Mobile Drawer ─── */}
      <div className={`mobile-drawer ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-drawer-backdrop" onClick={() => setMenuOpen(false)} />
        <div className="mobile-drawer-panel" ref={drawerRef}>
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center">
              <img src="/logo.svg" alt="EgoBMZ Logo" className="w-16 h-16 object-contain" />
            </div>
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[var(--surface-alt)] transition-colors" style={{ color: 'var(--text-muted)' }}>
              <CloseIcon />
            </button>
          </div>

          {/* Nav links */}
          <ul className="flex flex-col gap-1 mb-10">
            {NAV_LINKS.map((link, i) => (
              <li key={link.href} style={{ animationDelay: `${i * 60}ms` }} className="animate-fade-in-up opacity-0">
                <a
                  href={link.href}
                  onClick={handleNavClick}
                  className="flex items-center justify-between px-4 py-3.5 rounded-xl font-display font-medium text-base transition-all duration-200 hover:bg-[var(--surface-alt)]"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {link.label}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }}>
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a href={isHome ? '#contact' : '/#contact'} onClick={handleNavClick} className="btn-accent w-full justify-center">
            {t.nav.ctaMobile[lang]}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
            </svg>
          </a>

          {/* Socials */}
          <div className="absolute bottom-8 left-6 right-6 flex items-center gap-3">
            {[
              { href: LINKEDIN_URL, label: 'LinkedIn', icon: <LinkedInIcon /> },
              { href: GITHUB_URL,   label: 'GitHub',   icon: <GithubIcon /> },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:bg-[var(--surface-alt)]"
                style={{ color: 'var(--text-muted)' }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
