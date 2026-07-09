'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLang } from '../providers/LanguageProvider';
import { Project } from '../lib/projects';

function ExternalLinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default function Projects({ projects }: { projects: Project[] }) {
  const { lang, t } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const projTranslations = t.projects;

  const fallbackProjects: Project[] = projTranslations.items.map((item: any) => ({
    id: item.id,
    title: item.title,
    type_es: item.type.es,
    type_en: item.type.en,
    desc_es: item.desc.es,
    desc_en: item.desc.en,
    tags: [...item.tags],
    gradient: item.gradient,
    emoji: item.emoji,
    liveUrl: item.liveUrl,
    repoUrl: item.repoUrl,
    videoUrl: item.videoUrl,
    isFeatured: item.isFeatured,
    longDesc_es: item.longDesc_es ? [...item.longDesc_es] : undefined,
    longDesc_en: item.longDesc_en ? [...item.longDesc_en] : undefined,
    order: 0,
  }));
  const displayProjects = (projects && projects.length > 0 ? projects : fallbackProjects).filter(p => p.isFeatured).slice(0, 4);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const reveals = el.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }); },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-24 md:py-32" style={{ background: 'var(--bg)' }}>
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div className="reveal">
            <span className="tag tag-accent mb-4 inline-flex">{projTranslations.tag[lang]}</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl leading-tight" style={{ color: 'var(--text-primary)' }}>
              {projTranslations.heading[lang]}
            </h2>
          </div>
          <a href="#contact" className="btn-ghost text-sm self-start sm:self-auto reveal delay-100">
            {projTranslations.ctaBtn[lang]} <ArrowRight />
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayProjects.map((project: Project, i: number) => (
            <article key={project.id} className="reveal group" style={{ animationDelay: `${(i % 4) * 80}ms` }}>
              <Link href={`/projects/${project.id}`} className="card h-full flex flex-col overflow-hidden block" style={{ minHeight: '320px' }}>
                {/* Gradient header */}
                <div className="relative h-40 md:h-48 flex items-center justify-center overflow-hidden flex-shrink-0" style={{ background: project.gradient }}>
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(0,0,0,0.2) 0%, transparent 50%)` }} />
                  {/* Logo/Icon */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-24 h-24 rounded-2xl flex items-center justify-center shadow-2xl overflow-hidden transition-transform duration-300 group-hover:scale-110" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
                      {project.logoUrl ? (
                        <img src={project.logoUrl} alt={`${project.title} Logo`} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-4xl text-white font-bold">{project.title[0]}</span>
                      )}
                    </div>
                  </div>
                  {/* Type badge */}
                  <div className="absolute top-4 left-4">
                    <span className="font-mono text-xs px-3 py-1 rounded-full font-medium" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)' }}>
                      {lang === 'es' ? project.type_es : project.type_en}
                    </span>
                  </div>
                  {/* ExternalLinkIcon overlay indicator instead of separate link */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0" style={{ background: 'rgba(255,255,255,0.25)', color: '#fff', backdropFilter: 'blur(8px)' }} aria-hidden="true">
                    <ExternalLinkIcon />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6 gap-4">
                  <div>
                    <h3 className="font-display font-bold text-xl mb-2 transition-colors duration-200 group-hover:text-[var(--accent)]" style={{ color: 'var(--text-primary)' }}>
                      {project.title}
                    </h3>
                    <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      {lang === 'es' ? project.desc_es : project.desc_en}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag: string) => <span key={tag} className="tag text-xs">{tag}</span>)}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* View all projects link */}
        <div className="flex justify-center mt-12 reveal">
          <Link href="/projects" className="btn-ghost flex items-center gap-2">
            {(projTranslations as any).viewAll[lang]} <ArrowRight />
          </Link>
        </div>

        {/* CTA block */}
        <div className="mt-12 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 reveal" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <div>
            <h3 className="font-display font-bold text-2xl md:text-3xl mb-2" style={{ color: 'var(--text-primary)' }}>{projTranslations.ctaHeading[lang]}</h3>
            <p className="font-body text-sm" style={{ color: 'var(--text-muted)' }}>{projTranslations.ctaDesc[lang]}</p>
          </div>
          <a href="#contact" className="btn-accent flex-shrink-0">
            {projTranslations.ctaStart[lang]}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
