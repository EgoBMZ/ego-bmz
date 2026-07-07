'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { useLang } from '../../providers/LanguageProvider';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

function ArrowLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 4v16l14-8L7 4z"/>
    </svg>
  );
}

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { lang, t } = useLang();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    // Trigger reveal animations
    setTimeout(() => {
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach(el => el.classList.add('visible'));
    }, 100);
  }, [id]);

  const project = t.projects.items.find((p: any) => p.id === id);
  const otherProjects = t.projects.items.filter((p: any) => p.id !== id);

  if (!mounted) return <div className="min-h-screen" style={{ background: 'var(--bg)' }} />;

  if (!project) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center" style={{ background: 'var(--bg)' }}>
          <h1 className="text-4xl font-display font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            {lang === 'es' ? 'Proyecto no encontrado' : 'Project not found'}
          </h1>
          <Link href="/" className="btn-accent inline-flex items-center gap-2">
            <ArrowLeft />
            {lang === 'es' ? 'Volver al inicio' : 'Back to home'}
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen relative overflow-hidden pt-24" style={{ background: 'var(--bg)', color: 'var(--text-primary)' }}>
        {/* Dynamic Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: project.gradient, filter: 'blur(120px)' }} />

        <div className="section-container relative z-10 py-12 md:py-20">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-sm font-medium mb-12 hover:text-[var(--accent)] transition-colors" style={{ color: 'var(--text-muted)' }}>
            <ArrowLeft />
            {lang === 'es' ? 'Volver a proyectos' : 'Back to projects'}
          </Link>
          
          {/* Project Hero */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start mb-20">
            <div className="flex-shrink-0 w-32 h-32 md:w-48 md:h-48 rounded-3xl flex items-center justify-center text-6xl md:text-8xl shadow-2xl reveal" style={{ background: project.gradient }}>
              <span role="img" aria-hidden="true" className="animate-float">{project.emoji}</span>
            </div>
            
            <div className="flex-1 reveal" style={{ animationDelay: '100ms' }}>
              <span className="tag mb-4 inline-block">{project.type[lang]}</span>
              <h1 className="font-display font-bold text-5xl md:text-7xl leading-tight mb-6" style={{ color: 'var(--text-primary)' }}>
                {project.title}
              </h1>
              <p className="font-body text-lg md:text-xl leading-relaxed mb-8 max-w-2xl" style={{ color: 'var(--text-muted)' }}>
                {project.desc[lang]}
              </p>
              
              {/* Project Links (Live, Repo, Video) */}
              <div className="flex flex-wrap items-center gap-4">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-accent text-sm flex items-center gap-2 hover:scale-105 transition-transform">
                    {t.projects.links.live[lang]} <ExternalLinkIcon />
                  </a>
                )}
                {project.repoUrl && (
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost text-sm flex items-center gap-2" style={{ border: '1px solid var(--border)' }}>
                    <GithubIcon /> {t.projects.links.repo[lang]}
                  </a>
                )}
                {project.videoUrl && (
                  <a href={project.videoUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost text-sm flex items-center gap-2" style={{ border: '1px solid var(--border)' }}>
                    <PlayIcon /> {t.projects.links.video[lang]}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Featured Image Placeholder */}
          <div className="w-full h-[400px] md:h-[600px] rounded-3xl mb-24 overflow-hidden relative shadow-2xl reveal group" style={{ border: '1px solid var(--border)', animationDelay: '200ms' }}>
             <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" style={{ background: project.gradient, opacity: 0.8 }} />
             <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }} />
             <div className="absolute inset-0 flex flex-col items-center justify-center text-white/70 backdrop-blur-sm">
                <span className="text-4xl md:text-6xl mb-4">{project.emoji}</span>
                <span className="font-mono text-sm md:text-base uppercase tracking-widest">{lang === 'es' ? 'Captura principal de la app' : 'Main App Screenshot'}</span>
             </div>
          </div>

          {/* Technical Details Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 mb-32 reveal">
            <div className="lg:col-span-2">
              <h2 className="font-display text-3xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                {lang === 'es' ? 'Sobre el proyecto' : 'About the project'}
              </h2>
              <p className="font-body text-lg leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
                {lang === 'es' 
                  ? 'Este proyecto fue desarrollado con un enfoque en alto rendimiento y arquitectura limpia. El objetivo principal fue crear una experiencia de usuario fluida, que se sintiera nativa, al mismo tiempo que mantuviera una base de código escalable y fácil de mantener.'
                  : 'This project was developed focusing on high performance and clean architecture. The main goal was to create a seamless user experience that felt native, while maintaining a scalable and easily maintainable codebase.'}
              </p>
              <p className="font-body text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {lang === 'es' 
                  ? 'Se utilizaron las mejores prácticas de la industria, integrando CI/CD para despliegues automatizados y pruebas continuas. La UI fue diseñada de cero enfocándose en micro-interacciones, modo oscuro y accesibilidad.'
                  : 'Industry best practices were used, integrating CI/CD for automated deployments and continuous testing. The UI was designed from scratch focusing on micro-interactions, dark mode, and accessibility.'}
              </p>
            </div>
            
            {/* Enhanced Tech Stack */}
            <div className="p-8 rounded-3xl" style={{ background: 'var(--surface-alt)', border: '1px solid var(--border)' }}>
              <h3 className="font-display font-bold text-2xl mb-8" style={{ color: 'var(--text-primary)' }}>
                {lang === 'es' ? 'Stack Tecnológico' : 'Tech Stack'}
              </h3>
              <div className="flex flex-col gap-4">
                {project.tags.map((tag: string, index: number) => (
                  <div key={tag} className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--bg)] shadow-sm hover:shadow-md transition-shadow" style={{ border: '1px solid var(--border)' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg" style={{ background: 'var(--surface)', color: 'var(--accent)', border: '1px solid var(--border)' }}>
                      {index + 1}
                    </div>
                    <span className="font-body font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>{tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Secondary Mockups */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-32 reveal">
            <div className="h-80 md:h-[500px] rounded-3xl relative overflow-hidden group shadow-lg" style={{ border: '1px solid var(--border)', background: 'var(--bg)' }}>
              <div className="absolute inset-0 opacity-40 transition-transform duration-700 group-hover:scale-105" style={{ background: project.gradient }} />
              <div className="absolute inset-0 flex items-center justify-center text-white/60 backdrop-blur-sm">
                 <span className="font-mono text-sm uppercase tracking-widest bg-black/30 px-4 py-2 rounded-full">{lang === 'es' ? 'Detalle UI 1' : 'UI Detail 1'}</span>
              </div>
            </div>
            <div className="h-80 md:h-[500px] rounded-3xl relative overflow-hidden group shadow-lg" style={{ border: '1px solid var(--border)', background: 'var(--bg)' }}>
               <div className="absolute inset-0 opacity-20 transition-transform duration-700 group-hover:scale-105" style={{ background: project.gradient }} />
               <div className="absolute inset-0 flex items-center justify-center" style={{ color: 'var(--text-primary)' }}>
                 <span className="font-mono text-sm uppercase tracking-widest bg-[var(--surface)] px-4 py-2 rounded-full shadow-md">{lang === 'es' ? 'Detalle UI 2' : 'UI Detail 2'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* More Projects Section (Horizontal Scroll) */}
        {otherProjects.length > 0 && (
          <div className="py-24 border-t" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
            <div className="section-container mb-10 reveal">
              <h2 className="font-display font-bold text-3xl md:text-4xl" style={{ color: 'var(--text-primary)' }}>
                {t.projects.moreProjects[lang]}
              </h2>
            </div>
            
            {/* Horizontal Scroll Container */}
            <div className="flex overflow-x-auto gap-6 pb-12 px-6 md:px-12 xl:px-[calc((100vw-1200px)/2)] snap-x snap-mandatory hide-scrollbar reveal" style={{ animationDelay: '100ms' }}>
              {otherProjects.map((p: any) => (
                <Link href={`/projects/${p.id}`} key={p.id} className="snap-start flex-shrink-0 w-[300px] md:w-[400px] group">
                  <div className="card h-full flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl" style={{ border: '1px solid var(--border)', background: 'var(--bg)' }}>
                    <div className="relative h-48 flex items-center justify-center overflow-hidden flex-shrink-0" style={{ background: p.gradient }}>
                      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(0,0,0,0.2) 0%, transparent 50%)` }} />
                      <span className="relative text-6xl select-none transition-transform duration-500 group-hover:scale-110" role="img" aria-hidden="true">{p.emoji}</span>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-display font-bold text-xl mb-2" style={{ color: 'var(--text-primary)' }}>{p.title}</h3>
                      <p className="font-body text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: 'var(--text-muted)' }}>{p.desc[lang]}</p>
                      <div className="mt-auto flex items-center font-medium text-sm transition-colors duration-200 group-hover:text-[var(--accent)]" style={{ color: 'var(--text-primary)' }}>
                        {lang === 'es' ? 'Ver proyecto' : 'View project'} <ArrowRight />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </>
  );
}
