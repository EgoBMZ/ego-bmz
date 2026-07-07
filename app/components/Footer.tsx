'use client';

import { useLang } from '../providers/LanguageProvider';

export default function Footer() {
  const { lang, t } = useLang();
  const year = new Date().getFullYear();
  const f = t.footer;

  const LINKS = [
    { href: '#about',    label: f.links.about[lang] },
    { href: '#stack',    label: f.links.stack[lang] },
    { href: '#projects', label: f.links.projects[lang] },
    { href: '#contact',  label: f.links.contact[lang] },
  ];

  return (
    <footer className="py-10" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
      <div className="section-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-display font-bold text-xs" style={{ background: 'var(--accent)' }}>E</div>
            <span className="font-display font-semibold text-base" style={{ color: 'var(--text-primary)' }}>EgoBMZ</span>
          </div>

          {/* Copyright */}
          <p className="font-body text-sm text-center" style={{ color: 'var(--text-faint)' }}>
            © {year} EgoBMZ. {f.built[lang]}{' '}
            <span style={{ color: 'var(--accent)' }}>♥</span>{' '}
            {f.using[lang]}
          </p>

          {/* Quick links */}
          <nav className="flex items-center gap-5" aria-label="Footer navigation">
            {LINKS.map((link) => (
              <a key={link.href} href={link.href} className="font-body text-sm transition-colors duration-200 hover:text-[var(--text-primary)]" style={{ color: 'var(--text-muted)' }}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
