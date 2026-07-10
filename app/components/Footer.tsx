'use client';

import { useLang } from '../providers/LanguageProvider';

const GITHUB_URL   = 'https://github.com/EgoBMZ';
const LINKEDIN_URL = 'https://www.linkedin.com/in/egobmz/';
const EMAIL        = 'egobmz@gmail.com';

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
    <footer className="py-12 md:py-16" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 items-start pb-10 mb-10" style={{ borderBottom: '1px solid var(--border)' }}>
          {/* Logo & Tagline */}
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center">
              <img src="/logo.svg" alt="EgoBMZ Logo" className="w-24 h-24 object-contain" />
            </div>
            <p className="font-body text-sm max-w-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {lang === 'es' 
                ? 'Desarrollador enfocado en construir experiencias móviles y web increíbles, rápidas y listas para producción.' 
                : 'Developer focused on building incredible, fast, and production-ready mobile and web experiences.'}
            </p>
            {/* Action CTA link */}
            <a 
              href="#contact" 
              className="text-xs font-mono font-medium hover:text-[var(--accent)] transition-all duration-200 flex items-center gap-1.5 mt-1" 
              style={{ color: 'var(--text-primary)' }}
            >
              {lang === 'es' ? 'Comienza un proyecto →' : 'Start a project →'}
            </a>
          </div>

          {/* Quick links */}
          <div className="flex flex-col items-start gap-4">
            <span className="font-display font-bold text-xs uppercase tracking-wider" style={{ color: 'var(--text-faint)' }}>
              {lang === 'es' ? 'Navegación' : 'Navigation'}
            </span>
            <nav className="flex flex-col gap-2.5" aria-label="Footer navigation">
              {LINKS.map((link) => (
                <a key={link.href} href={link.href} className="font-body text-sm transition-colors duration-200 hover:text-[var(--accent)]" style={{ color: 'var(--text-muted)' }}>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Socials & Contact info */}
          <div className="flex flex-col items-start gap-4">
            <span className="font-display font-bold text-xs uppercase tracking-wider" style={{ color: 'var(--text-faint)' }}>
              {lang === 'es' ? 'Redes & Contacto' : 'Socials & Contact'}
            </span>
            <div className="flex items-center gap-3">
              {/* LinkedIn */}
              <a 
                href={LINKEDIN_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:bg-[var(--surface-alt)] hover:text-[var(--accent)] hover:scale-110" 
                style={{ color: 'var(--text-muted)', border: '1px solid var(--border)' }}
                aria-label="LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              {/* GitHub */}
              <a 
                href={GITHUB_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:bg-[var(--surface-alt)] hover:text-[var(--accent)] hover:scale-110" 
                style={{ color: 'var(--text-muted)', border: '1px solid var(--border)' }}
                aria-label="GitHub"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>
            </div>
            {/* Email link */}
            <a href={`mailto:${EMAIL}`} className="font-mono text-sm hover:text-[var(--accent)] transition-colors mt-2" style={{ color: 'var(--text-muted)' }}>
              {EMAIL}
            </a>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-sm text-center" style={{ color: 'var(--text-faint)' }}>
            © {year} EgoBMZ. {f.built[lang]} <span style={{ color: 'var(--accent)' }}>♥</span> {f.using[lang]}
          </p>
        </div>
      </div>
    </footer>
  );
}
