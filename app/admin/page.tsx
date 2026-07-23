'use client';

import { useState, useEffect } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { auth, googleProvider, storage } from '../lib/firebase';
import { Project, getProjects, saveProject, deleteProject } from '../lib/projects';
import { useLang } from '../providers/LanguageProvider';

const HeartIcon = ({ solid }: { solid: boolean }) => (
  <svg className={`w-5 h-5 transition-colors ${solid ? 'text-red-500 fill-current' : 'text-gray-400 stroke-current fill-none'}`} viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

// Original hardcoded data for seeding
const SEED_PROJECTS: Project[] = [
  {
    id: 'fit-track',
    title: 'FitTrack Pro',
    type_es: 'Móvil', type_en: 'Mobile',
    desc_es: 'App de fitness multiplataforma con registro de entrenamientos en tiempo real, gráficas de progreso y arquitectura offline-first.',
    desc_en: 'Cross-platform fitness tracker with real-time workout logging, progress charts, and offline-first architecture.',
    tags: ['React Native', 'Expo', 'Firebase', 'Zustand'],
    gradient: 'linear-gradient(135deg, #E85D3D 0%, #FF8A70 100%)',
    emoji: '💪',
    liveUrl: '#', repoUrl: '#', videoUrl: '#',
    order: 1
  },
  {
    id: 'shopwave',
    title: 'ShopWave',
    type_es: 'Web + Móvil', type_en: 'Web + Mobile',
    desc_es: 'Plataforma e-commerce completa con tienda en Next.js, app Expo y capa de datos TypeScript compartida.',
    desc_en: 'Full e-commerce platform with Next.js storefront, Expo mobile app, and shared TypeScript data layer.',
    tags: ['Next.js', 'React Native', 'TypeScript', 'GraphQL'],
    gradient: 'linear-gradient(135deg, #3178C6 0%, #61DAFB 100%)',
    emoji: '🛒',
    liveUrl: '#', repoUrl: '#', videoUrl: '#',
    order: 2
  },
  {
    id: 'pulse-dashboard',
    title: 'Pulse Dashboard',
    type_es: 'Web', type_en: 'Web',
    desc_es: 'Dashboard SaaS con Next.js App Router, gráficas en tiempo real y modo oscuro completo.',
    desc_en: 'SaaS analytics dashboard built with Next.js App Router, featuring real-time charts and dark mode.',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Recharts'],
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
    emoji: '📊',
    liveUrl: '#', repoUrl: '#', videoUrl: '#',
    order: 3
  },
  {
    id: 'nomad-chat',
    title: 'Nomad Chat',
    type_es: 'Móvil', type_en: 'Mobile',
    desc_es: 'App de mensajería en tiempo real con cifrado extremo a extremo, notificaciones push y compartición de medios.',
    desc_en: 'Real-time messaging app with end-to-end encryption, push notifications and media sharing.',
    tags: ['React Native', 'Expo', 'Firebase', 'Node.js'],
    gradient: 'linear-gradient(135deg, #059669 0%, #34D399 100%)',
    emoji: '💬',
    liveUrl: '#', repoUrl: '#', videoUrl: '#',
    order: 4
  }
];

const ADMIN_EMAIL = 'egobmz@gmail.com'; // Change if needed

interface ProjectInput extends Omit<Project, 'tags' | 'order'> {
  tags: string | string[];
  order: number | '';
}

export default function AdminDashboard() {
  const { lang } = useLang();
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectInput | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
      if (currentUser?.email === ADMIN_EMAIL) {
        fetchProjects();
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = async () => {
    setShowLogoutModal(false);
    await signOut(auth);
  };

  const fetchProjects = async () => {
    setLoadingData(true);
    const data = await getProjects();
    setProjects(data);
    setLoadingData(false);
  };

  const handleSeed = async () => {
    if (!confirm('Are you sure you want to seed the default projects? This might overwrite existing IDs.')) return;
    setIsSaving(true);
    for (const p of SEED_PROJECTS) {
      await saveProject(p);
    }
    await fetchProjects();
    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm(`Are you sure you want to delete ${id}?`)) return;
    await deleteProject(id);
    await fetchProjects();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    setIsSaving(true);
    
    let tagsToSave: string[] = [];
    if (typeof editingProject.tags === 'string') {
      tagsToSave = editingProject.tags.split(',').map(s => s.trim()).filter(Boolean);
    } else if (Array.isArray(editingProject.tags)) {
      tagsToSave = [...editingProject.tags];
    }

    // Capture any pending tags typed in the input field but not submitted with Enter
    const tagInputEl = document.getElementById('tag-input') as HTMLInputElement;
    if (tagInputEl && tagInputEl.value.trim()) {
      const pendingTags = tagInputEl.value.split(',').map(t => t.trim()).filter(Boolean);
      pendingTags.forEach(tag => {
        if (!tagsToSave.includes(tag)) {
          tagsToSave.push(tag);
        }
      });
      tagInputEl.value = '';
    }
    
    await saveProject({ 
      ...editingProject, 
      tags: tagsToSave,
      order: editingProject.order === '' ? 0 : Number(editingProject.order)
    });
    setEditingProject(null);
    await fetchProjects();
    setIsSaving(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof Project) => {
    if (!e.target.files || e.target.files.length === 0 || !editingProject) return;
    const file = e.target.files[0];
    
    // Si no hay un ID aún, requerir uno o generarlo
    const projectId = editingProject.id || `temp-${Date.now()}`;
    if (!editingProject.id) {
      setEditingProject(prev => prev ? { ...prev, id: projectId } : null);
    }
    
    setUploadingField(fieldName);
    try {
      const storageRef = ref(storage, `projects/${projectId}/${fieldName}-${file.name}`);
      const uploadTask = await uploadBytesResumable(storageRef, file);
      const url = await getDownloadURL(uploadTask.ref);
      
      setEditingProject(prev => prev ? ({ ...prev, [fieldName]: url } as ProjectInput) : null);
    } catch (error) {
      console.error("Error uploading file", error);
      alert("Error subiendo el archivo. Asegúrate de configurar las reglas de Storage.");
    }
    setUploadingField(null);
  };

  const handleAIAutofill = async () => {
    if (!editingProject?.title || !editingProject?.desc_es) {
      alert("Por favor escribe al menos el Título y la Descripción (ES) para que la IA tenga contexto.");
      return;
    }
    
    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title_es: editingProject.title,
          type_es: editingProject.type_es,
          desc_es: editingProject.desc_es
        })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        alert(data.error || 'Error al generar los datos con IA.');
      } else {
        setEditingProject(prev => prev ? ({
          ...prev,
          id: data.slug || prev.id,
          type_en: data.type_en || prev.type_en,
          desc_en: data.desc_en || prev.desc_en,
          gradient: data.gradient || prev.gradient,
          tags: data.tags || prev.tags,
          longDesc_es: data.longDesc_es || prev.longDesc_es,
          longDesc_en: data.longDesc_en || prev.longDesc_en
        }) : null);
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión al generar con IA.");
    }
    setIsGenerating(false);
  };

  const handleInlineUpdate = async (p: Project, field: keyof Project, value: any) => {
    try {
      const updatedProject = { ...p, [field]: value };
      setProjects(projects.map(proj => proj.id === p.id ? updatedProject : proj));
      await saveProject(updatedProject);
    } catch (error) {
      console.error("Error updating project inline", error);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newTagValue = e.currentTarget.value.trim();
      if (newTagValue && editingProject) {
        const currentTags = Array.isArray(editingProject.tags) ? editingProject.tags : editingProject.tags.split(',').map(t => t.trim()).filter(Boolean);
        const newTags = newTagValue.split(',').map(t => t.trim()).filter(Boolean);
        const tagsToAdd = newTags.filter(t => !currentTags.includes(t));
        
        if (tagsToAdd.length > 0) {
          setEditingProject({ ...editingProject, tags: [...currentTags, ...tagsToAdd] });
        }
      }
      e.currentTarget.value = '';
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    if (editingProject) {
      const currentTags = Array.isArray(editingProject.tags) ? editingProject.tags : editingProject.tags.split(',').map(t => t.trim()).filter(Boolean);
      setEditingProject({ ...editingProject, tags: currentTags.filter(t => t !== tagToRemove) });
    }
  };

  const handleToggleTag = (tag: string) => {
    if (!editingProject) return;
    const currentTags = Array.isArray(editingProject.tags) ? editingProject.tags : editingProject.tags.split(',').map(t => t.trim()).filter(Boolean);
    if (currentTags.includes(tag)) {
      setEditingProject({ ...editingProject, tags: currentTags.filter(t => t !== tag) });
    } else {
      setEditingProject({ ...editingProject, tags: [...currentTags, tag] });
    }
  };

  if (loadingAuth) return <div className="min-h-screen flex items-center justify-center p-8 bg-[var(--bg)] text-[var(--text-primary)]">{lang === 'es' ? 'Cargando Auth...' : 'Loading Auth...'}</div>;

  if (!user) {
    return (
      <div className="min-h-screen relative flex flex-col items-center justify-center p-8 overflow-hidden" style={{ background: 'var(--bg)', color: 'var(--text-primary)' }}>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 animate-float" style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)', filter: 'blur(60px)', animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 animate-float" style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)', filter: 'blur(60px)', animationDuration: '10s', animationDelay: '2s' }} />
        
        <div className="relative z-10 flex flex-col items-center p-12 rounded-3xl shadow-2xl reveal visible" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: '1px solid var(--border)' }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg animate-float" style={{ background: 'var(--accent)' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-3 tracking-tight">{lang === 'es' ? 'Portal de Admin' : 'Admin Portal'}</h1>
          <p className="mb-10 text-center max-w-sm" style={{ color: 'var(--text-muted)' }}>
            {lang === 'es' ? 'Acceso restringido. Por favor, inicia sesión con tu cuenta de administrador.' : 'Restricted access. Please sign in with your administrator account.'}
          </p>
          
          <button 
            onClick={handleLogin} 
            className="btn-accent text-base md:text-lg px-8 py-4 flex items-center gap-3 hover:scale-105 transition-transform shadow-lg group"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="group-hover:animate-pulse">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            {lang === 'es' ? 'Continuar con Google' : 'Continue with Google'}
          </button>
        </div>
      </div>
    );
  }

  if (user.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[var(--bg)] text-[var(--text-primary)] text-center">
        <h1 className="text-4xl font-display font-bold mb-4 text-red-500">{lang === 'es' ? 'Acceso Denegado' : 'Access Denied'}</h1>
        <p className="mb-8">{lang === 'es' ? `Tu email (${user.email}) no está autorizado.` : `Your email (${user.email}) is not authorized.`}</p>
        <button onClick={handleLogout} className="btn-ghost" style={{ border: '1px solid var(--border)' }}>{lang === 'es' ? 'Cerrar sesión' : 'Sign out'}</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-display font-bold">{lang === 'es' ? 'Panel de Administración' : 'Portfolio Admin'}</h1>
          <div className="flex gap-4 items-center">
            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{user.email}</span>
            <button onClick={handleLogout} className="btn-ghost text-sm" style={{ border: '1px solid var(--border)' }}>{lang === 'es' ? 'Cerrar sesión' : 'Logout'}</button>
          </div>
        </div>

        {editingProject ? (
          <div className="p-8 rounded-2xl relative" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold font-display">{editingProject.id ? (lang === 'es' ? 'Editar Proyecto' : 'Edit Project') : (lang === 'es' ? 'Nuevo Proyecto' : 'New Project')}</h2>
              <button 
                type="button" 
                onClick={handleAIAutofill} 
                disabled={isGenerating}
                className="btn-accent px-4 py-2 text-sm bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-none shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
              >
                {isGenerating ? (lang === 'es' ? 'Generando...' : 'Generating...') : '✨ ' + (lang === 'es' ? 'Autocompletar con IA' : 'AI Autofill')}
              </button>
            </div>
            
            <form onSubmit={handleSave} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">ID (URL Slug)</label>
                  <input required type="text" className="w-full p-2 rounded-lg bg-[var(--bg)] border focus:outline-none" style={{ borderColor: 'var(--border)' }} value={editingProject.id} onChange={e => setEditingProject({...editingProject, id: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm mb-1">{lang === 'es' ? 'Título' : 'Title'}</label>
                  <input required type="text" className="w-full p-2 rounded-lg bg-[var(--bg)] border focus:outline-none" style={{ borderColor: 'var(--border)' }} value={editingProject.title} onChange={e => setEditingProject({...editingProject, title: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm mb-1">{lang === 'es' ? 'Tipo (ES)' : 'Type (ES)'}</label>
                  <input required type="text" className="w-full p-2 rounded-lg bg-[var(--bg)] border focus:outline-none" style={{ borderColor: 'var(--border)' }} value={editingProject.type_es} onChange={e => setEditingProject({...editingProject, type_es: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm mb-1">Type (EN)</label>
                  <input required type="text" className="w-full p-2 rounded-lg bg-[var(--bg)] border focus:outline-none" style={{ borderColor: 'var(--border)' }} value={editingProject.type_en} onChange={e => setEditingProject({...editingProject, type_en: e.target.value})} />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm mb-1">Description (ES)</label>
                  <textarea required className="w-full p-2 rounded-lg bg-[var(--bg)] border focus:outline-none h-24" style={{ borderColor: 'var(--border)' }} value={editingProject.desc_es} onChange={e => setEditingProject({...editingProject, desc_es: e.target.value})} />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm mb-1">Description (EN)</label>
                  <textarea required className="w-full p-2 rounded-lg bg-[var(--bg)] border focus:outline-none h-24" style={{ borderColor: 'var(--border)' }} value={editingProject.desc_en} onChange={e => setEditingProject({...editingProject, desc_en: e.target.value})} />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm mb-1">Long Description (ES) - Parrafos separados por línea en blanco</label>
                  <textarea className="w-full p-2 rounded-lg bg-[var(--bg)] border focus:outline-none h-32" style={{ borderColor: 'var(--border)' }} value={(editingProject.longDesc_es || []).join('\n\n')} onChange={e => setEditingProject({...editingProject, longDesc_es: e.target.value.split('\n\n')})} />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm mb-1">Long Description (EN) - Paragraphs separated by blank line</label>
                  <textarea className="w-full p-2 rounded-lg bg-[var(--bg)] border focus:outline-none h-32" style={{ borderColor: 'var(--border)' }} value={(editingProject.longDesc_en || []).join('\n\n')} onChange={e => setEditingProject({...editingProject, longDesc_en: e.target.value.split('\n\n')})} />
                </div>
                <div className="col-span-2 flex items-center gap-3 my-2">
                  <button type="button" onClick={() => setEditingProject({...editingProject, isFeatured: !editingProject.isFeatured})} className="flex items-center justify-center p-2 rounded-full hover:bg-[var(--surface-alt)] transition-colors">
                    <HeartIcon solid={!!editingProject.isFeatured} />
                  </button>
                  <label className="text-sm font-bold cursor-pointer" onClick={() => setEditingProject({...editingProject, isFeatured: !editingProject.isFeatured})}>
                    {lang === 'es' ? 'Destacado / Favorito (Mostrar en Inicio)' : 'Featured / Favorite (Show on Home)'}
                  </label>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm mb-2 font-bold">Tags</label>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(Array.isArray(editingProject.tags) ? editingProject.tags : (editingProject.tags || '').split(',').map(t => t.trim()).filter(Boolean)).map((tag, idx) => (
                      <span key={idx} className="flex items-center gap-1 bg-[var(--surface)] border px-3 py-1 rounded-full text-sm shadow-sm" style={{ borderColor: 'var(--border)' }}>
                        {tag}
                        <button type="button" onClick={() => handleRemoveTag(tag)} className="text-red-500 hover:text-red-700 font-bold ml-1 text-xs">✕</button>
                      </span>
                    ))}
                  </div>
                  <input id="tag-input" type="text" placeholder="Escribe un tag y presiona Enter..." className="w-full p-3 rounded-lg bg-[var(--bg)] border focus:outline-none mb-4" style={{ borderColor: 'var(--border)' }} onKeyDown={handleAddTag} />
                  
                  {/* Clickable Suggestion Pills */}
                  <div className="border p-4 rounded-xl" style={{ borderColor: 'var(--border)', background: 'var(--surface-alt)' }}>
                    <div className="text-xs uppercase tracking-wider font-bold mb-3" style={{ color: 'var(--text-muted)' }}>
                      {lang === 'es' ? 'Sugerencias (haz clic para agregar/quitar):' : 'Suggestions (click to add/remove):'}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {Array.from(new Set([
                        'React Native', 'Expo', 'Next.js', 'TypeScript', 'React', 'Node.js', 'Firebase', 'Tailwind CSS', 'Zustand', 'Reanimated',
                        ...projects.flatMap(p => p.tags || [])
                      ])).sort((a, b) => a.localeCompare(b)).map((tag) => {
                        const currentTags = Array.isArray(editingProject.tags) ? editingProject.tags : (editingProject.tags || '').split(',').map(t => t.trim()).filter(Boolean);
                        const isSelected = currentTags.includes(tag);
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => handleToggleTag(tag)}
                            className={`px-3 py-1 text-xs rounded-full border transition-all hover:scale-105 ${
                              isSelected 
                                ? 'bg-[var(--accent)] border-[var(--accent)] text-white font-semibold' 
                                : 'bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                            }`}
                            style={{ borderColor: isSelected ? 'var(--accent)' : 'var(--border)' }}
                          >
                            {isSelected ? '✓ ' : '+ '} {tag}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-1">Gradient CSS (Background)</label>
                  <input required type="text" className="w-full p-2 rounded-lg bg-[var(--bg)] border focus:outline-none font-mono text-xs" style={{ borderColor: 'var(--border)' }} value={editingProject.gradient} onChange={e => setEditingProject({...editingProject, gradient: e.target.value})} />
                </div>
                
                <div className="col-span-2 mt-4">
                  <h3 className="font-bold border-b pb-2 mb-4" style={{ borderColor: 'var(--border)' }}>Project Media</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Reusable Dropzone UI logic */}
                    {[
                      { key: 'logoUrl', label: 'Logo' },
                      { key: 'mainScreenshotUrl', label: 'Vista Previa (Hero)' },
                      { key: 'uiDetail1Url', label: 'UI Detail 1' },
                      { key: 'uiDetail2Url', label: 'UI Detail 2' },
                    ].map(field => (
                      <div key={field.key} className="border-2 border-dashed p-6 rounded-lg text-center hover:bg-[var(--surface-alt)] transition-colors cursor-pointer relative" style={{ borderColor: 'var(--border)' }}>
                        <label className="block text-sm mb-2 font-bold cursor-pointer">{field.label}</label>
                        {editingProject[field.key as keyof ProjectInput] && (
                           <img src={editingProject[field.key as keyof ProjectInput] as string} alt={field.label} className="h-24 mx-auto object-contain mb-4 bg-[var(--bg)] p-2 rounded shadow-sm" />
                        )}
                        <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, field.key as keyof Project)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                        <div className="text-xs text-[var(--text-muted)] pointer-events-none">
                          {uploadingField === field.key ? (
                            <span className="text-[var(--accent)] font-bold">{lang === 'es' ? 'Subiendo...' : 'Uploading...'}</span>
                          ) : (
                            <span>{lang === 'es' ? 'Haz clic o arrastra una imagen aquí' : 'Click or drag an image here'}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-1 mt-4">Live URL (optional)</label>
                  <input type="text" className="w-full p-2 rounded-lg bg-[var(--bg)] border focus:outline-none" style={{ borderColor: 'var(--border)' }} value={editingProject.liveUrl || ''} onChange={e => setEditingProject({...editingProject, liveUrl: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm mb-1 mt-4">Repo URL 1 (optional)</label>
                  <input type="text" className="w-full p-2 rounded-lg bg-[var(--bg)] border focus:outline-none mb-2" style={{ borderColor: 'var(--border)' }} value={editingProject.repoUrl || ''} onChange={e => setEditingProject({...editingProject, repoUrl: e.target.value})} placeholder="https://github.com/..." />
                  <input type="text" className="w-full p-2 rounded-lg bg-[var(--bg)] border focus:outline-none" style={{ borderColor: 'var(--border)' }} value={editingProject.repoUrlLabel || ''} onChange={e => setEditingProject({...editingProject, repoUrlLabel: e.target.value})} placeholder={lang === 'es' ? 'Texto del botón (ej. GitHub Front)' : 'Button text (e.g. GitHub Front)'} />
                </div>
                <div>
                  <label className="block text-sm mb-1 mt-4">Repo URL 2 (optional)</label>
                  <input type="text" className="w-full p-2 rounded-lg bg-[var(--bg)] border focus:outline-none mb-2" style={{ borderColor: 'var(--border)' }} value={editingProject.repoUrl2 || ''} onChange={e => setEditingProject({...editingProject, repoUrl2: e.target.value})} placeholder="https://github.com/..." />
                  <input type="text" className="w-full p-2 rounded-lg bg-[var(--bg)] border focus:outline-none" style={{ borderColor: 'var(--border)' }} value={editingProject.repoUrl2Label || ''} onChange={e => setEditingProject({...editingProject, repoUrl2Label: e.target.value})} placeholder={lang === 'es' ? 'Texto del botón (ej. GitHub Back)' : 'Button text (e.g. GitHub Back)'} />
                </div>
                <div>
                  <label className="block text-sm mb-1 mt-4">Video URL (optional)</label>
                  <input type="text" className="w-full p-2 rounded-lg bg-[var(--bg)] border focus:outline-none" style={{ borderColor: 'var(--border)' }} value={editingProject.videoUrl || ''} onChange={e => setEditingProject({...editingProject, videoUrl: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm mb-1 mt-4">{lang === 'es' ? 'Orden (Display Order)' : 'Display Order'}</label>
                  <input required type="number" className="w-full p-2 rounded-lg bg-[var(--bg)] border focus:outline-none" style={{ borderColor: 'var(--border)' }} value={editingProject.order} onChange={e => setEditingProject({...editingProject, order: e.target.value === '' ? '' : parseInt(e.target.value)})} />
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button type="submit" disabled={isSaving} className="btn-accent px-8">{isSaving ? (lang === 'es' ? 'Guardando...' : 'Saving...') : (lang === 'es' ? 'Guardar Proyecto' : 'Save Project')}</button>
                <button type="button" onClick={() => setEditingProject(null)} className="btn-ghost" style={{ border: '1px solid var(--border)' }}>{lang === 'es' ? 'Cancelar' : 'Cancel'}</button>
              </div>
            </form>
          </div>
        ) : (
          <>
            <div className="flex gap-4 mb-8">
              <button 
                onClick={() => setEditingProject({ id: '', title: '', type_es: '', type_en: '', desc_es: '', desc_en: '', longDesc_es: [], longDesc_en: [], tags: [], gradient: 'linear-gradient(135deg, #000 0%, #333 100%)', isFeatured: false, order: projects.length + 1 })}
                className="btn-accent"
              >
                + {lang === 'es' ? 'Nuevo Proyecto' : 'New Project'}
              </button>
            </div>

            {loadingData ? (
              <p>{lang === 'es' ? 'Cargando proyectos...' : 'Loading projects...'}</p>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {projects.map(p => (
                  <div key={p.id} className="p-4 rounded-xl flex items-center justify-between" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden" style={{ background: p.gradient }}>
                        {p.logoUrl ? <img src={p.logoUrl} alt="Logo" className="w-full h-full object-cover" /> : <div className="text-white font-bold">{p.title[0]}</div>}
                      </div>
                      <div className="flex flex-col gap-2">
                        <h3 className="font-bold text-lg">{p.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-[var(--text-muted)]">
                          <span>ID: {p.id}</span>
                          <label className="flex items-center gap-1 cursor-pointer" title={lang === 'es' ? 'Orden (Menor a Mayor)' : 'Order (Low to High)'}>
                            {lang === 'es' ? 'Orden:' : 'Order:'} 
                            <input type="number" className="w-16 p-1 bg-[var(--bg)] border rounded focus:outline-none text-center ml-1" style={{ borderColor: 'var(--border)' }} value={p.order} onChange={(e) => handleInlineUpdate(p, 'order', parseInt(e.target.value) || 0)} />
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer ml-4">
                            <button type="button" onClick={() => handleInlineUpdate(p, 'isFeatured', !p.isFeatured)} className="flex items-center justify-center p-1 rounded-full hover:bg-[var(--surface-alt)] transition-colors">
                              <HeartIcon solid={!!p.isFeatured} />
                            </button>
                            <span onClick={() => handleInlineUpdate(p, 'isFeatured', !p.isFeatured)}>{lang === 'es' ? 'Destacado' : 'Featured'}</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingProject(p)} className="btn-ghost text-xs" style={{ border: '1px solid var(--border)' }}>{lang === 'es' ? 'Editar' : 'Edit'}</button>
                      <button onClick={() => handleDelete(p.id)} className="btn-ghost text-xs text-red-500" style={{ border: '1px solid var(--border)' }}>{lang === 'es' ? 'Borrar' : 'Delete'}</button>
                    </div>
                  </div>
                ))}
                {projects.length === 0 && <p className="text-[var(--text-muted)]">{lang === 'es' ? 'No se encontraron proyectos.' : 'No projects found in Firestore.'}</p>}
              </div>
            )}
          </>
        )}
      </div>

      {/* Custom Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowLogoutModal(false)} />
          <div className="relative z-10 w-full max-w-sm rounded-3xl p-8 shadow-2xl reveal visible" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </div>
            <h3 className="text-2xl font-display font-bold text-center mb-2 text-white">Cerrar Sesión</h3>
            <p className="text-center mb-8" style={{ color: 'var(--text-muted)' }}>¿Estás seguro de que quieres salir del panel de administración?</p>
            <div className="flex gap-4">
              <button onClick={() => setShowLogoutModal(false)} className="flex-1 py-3 px-4 rounded-xl font-bold transition-all hover:bg-white/5" style={{ border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
                Cancelar
              </button>
              <button onClick={confirmLogout} className="flex-1 py-3 px-4 rounded-xl font-bold text-white transition-all hover:opacity-90" style={{ background: '#EF4444' }}>
                Salir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
