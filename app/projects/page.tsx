'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLang } from '../providers/LanguageProvider';
import { Project, getProjects } from '../lib/projects';

function ArrowLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export default function ProjectsPage() {
  const { lang, t } = useLang();
  const [projectsData, setProjectsData] = useState<Project[] | null>(null);
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState<'all' | 'mobile' | 'web'>('all');

  useEffect(() => {
    const load = async () => {
      const data = await getProjects();
      setProjectsData(data);
      setMounted(true);

      // Trigger reveal animations
      setTimeout(() => {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(el => el.classList.add('visible'));
      }, 100);
    };
    load();
  }, []);

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

  const allProjects = projectsData && projectsData.length > 0 ? projectsData : fallbackProjects;

  const filteredProjects = allProjects.filter(project => {
    if (filter === 'all') return true;
    const typeEn = project.type_en.toLowerCase();
    if (filter === 'mobile') return typeEn.includes('mobile');
    if (filter === 'web') return typeEn.includes('web');
    return true;
  });

  if (!mounted) return <div className="min-h-screen" style={{ background: 'var(--bg)' }} />;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-32" style={{ background: 'var(--bg)', color: 'var(--text-primary)' }}>
        <div className="section-container relative z-10 py-12 md:py-20">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-sm font-medium mb-12 hover:text-[var(--accent)] transition-colors" style={{ color: 'var(--text-muted)' }}>
            <ArrowLeft />
            {lang === 'es' ? 'Volver al inicio' : 'Back to home'}
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 reveal visible">
            <div>
              <span className="tag tag-accent mb-4 inline-flex">{projTranslations.tag[lang]}</span>
              <h1 className="font-display font-bold text-4xl md:text-6xl leading-tight" style={{ color: 'var(--text-primary)' }}>
                {(projTranslations as any).viewAll[lang]}
              </h1>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-12 reveal visible" style={{ animationDelay: '100ms' }}>
            {['all', 'mobile', 'web'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat as any)}
                className={`px-6 py-2 rounded-full font-medium text-sm transition-all duration-300 ${filter === cat ? 'bg-[var(--accent)] text-white shadow-lg' : 'bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
                style={{ border: filter === cat ? 'none' : '1px solid var(--border)' }}
              >
                {(projTranslations as any).filters[cat][lang]}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project: Project, i: number) => (
              <article key={project.id} className="reveal group visible" style={{ animationDelay: `${(i % 4) * 80}ms` }}>
                <Link href={`/projects/${project.id}`} className="card h-full flex flex-col overflow-hidden block" style={{ minHeight: '320px', border: '1px solid var(--border)', background: 'var(--surface)' }}>
                  {/* Gradient header */}
                  <div className="relative h-48 md:h-56 flex items-center justify-center overflow-hidden flex-shrink-0" style={{ background: project.gradient }}>
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(0,0,0,0.2) 0%, transparent 50%)` }} />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-24 h-24 rounded-2xl flex items-center justify-center shadow-2xl overflow-hidden transition-transform duration-300 group-hover:scale-110" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
                        {project.logoUrl ? (
                          <img src={project.logoUrl} alt={`${project.title} Logo`} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-4xl text-white font-bold">{project.title[0]}</span>
                        )}
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="font-mono text-xs px-3 py-1 rounded-full font-medium" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)' }}>
                        {lang === 'es' ? project.type_es : project.type_en}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0" style={{ background: 'rgba(255,255,255,0.25)', color: '#fff', backdropFilter: 'blur(8px)' }} aria-hidden="true">
                      <ExternalLinkIcon />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6 md:p-8 gap-4">
                    <div>
                      <h3 className="font-display font-bold text-2xl mb-3 transition-colors duration-200 group-hover:text-[var(--accent)]" style={{ color: 'var(--text-primary)' }}>
                        {project.title}
                      </h3>
                      <p className="font-body text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                        {lang === 'es' ? project.desc_es : project.desc_en}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-auto pt-4">
                      {project.tags.map((tag: string) => <span key={tag} className="tag text-xs">{tag}</span>)}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="py-20 text-center text-[var(--text-muted)]">
              {lang === 'es' ? 'No se encontraron proyectos en esta categoría.' : 'No projects found in this category.'}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
