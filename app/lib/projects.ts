import { db } from './firebase';
import { collection, getDocs, doc, setDoc, deleteDoc, query, orderBy } from 'firebase/firestore';

export interface Project {
  id: string;
  title: string;
  type_es: string;
  type_en: string;
  desc_es: string;
  desc_en: string;
  tags: string[];
  gradient: string;
  emoji?: string;
  logoUrl?: string;
  mainScreenshotUrl?: string;
  uiDetail1Url?: string;
  uiDetail2Url?: string;
  liveUrl?: string;
  repoUrl?: string;
  videoUrl?: string;
  isFeatured?: boolean;
  longDesc_es?: string[];
  longDesc_en?: string[];
  order: number;
}

const COLLECTION_NAME = 'projects';

export async function getProjects(): Promise<Project[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as Project);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function saveProject(project: Project): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, project.id);
    await setDoc(docRef, project);
  } catch (error) {
    console.error("Error saving project:", error);
    throw error;
  }
}

export async function deleteProject(id: string): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
}
