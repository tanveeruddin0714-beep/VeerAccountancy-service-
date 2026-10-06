import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  collection,
  getDocs,
  query,
  orderBy,
  updateDoc
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import { AdmissionFormData } from './types';

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// CRITICAL: Must pass databaseId from config
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write'
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous
    },
    operationType,
    path
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Generate simple safe alphanumeric ID
function generateId(prefix: string): string {
  const rand = Math.random().toString(36).substring(2, 10);
  const time = Date.now().toString(36);
  return `${prefix}_${time}_${rand}`;
}

/**
 * Save an admission application to the persistent Firestore database
 */
export async function saveAdmissionToDatabase(formData: AdmissionFormData): Promise<string> {
  const docId = generateId('adm');
  const docRef = doc(db, 'admissions', docId);

  const payload: Record<string, any> = {
    fullName: formData.fullName.trim(),
    fatherName: formData.fatherName.trim(),
    phone: formData.phone.trim(),
    whatsapp: formData.whatsapp.trim(),
    email: formData.email.trim(),
    city: formData.city.trim(),
    education: formData.education.trim(),
    selectedCourse: formData.selectedCourse,
    preferredTiming: formData.preferredTiming,
    learningMode: formData.learningMode,
    accountingExperience: formData.accountingExperience,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  if (formData.message && formData.message.trim().length > 0) {
    payload.message = formData.message.trim();
  }

  try {
    await setDoc(docRef, payload);
    return docId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `admissions/${docId}`);
  }
}

/**
 * Save a general contact inquiry to the persistent Firestore database
 */
export async function saveInquiryToDatabase(inquiry: {
  name: string;
  phone?: string;
  email?: string;
  message: string;
}): Promise<string> {
  const docId = generateId('inq');
  const docRef = doc(db, 'inquiries', docId);

  const payload: Record<string, any> = {
    name: inquiry.name.trim(),
    message: inquiry.message.trim(),
    status: 'new',
    createdAt: new Date().toISOString()
  };

  if (inquiry.phone && inquiry.phone.trim().length > 0) {
    payload.phone = inquiry.phone.trim();
  }
  if (inquiry.email && inquiry.email.trim().length > 0) {
    payload.email = inquiry.email.trim();
  }

  try {
    await setDoc(docRef, payload);
    return docId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `inquiries/${docId}`);
  }
}

// Authentication Helpers
export async function signInAdminWithGoogle(): Promise<User> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Sign-in error:', error);
    throw error;
  }
}

export async function signOutAdmin(): Promise<void> {
  await signOut(auth);
}

// Stored application shape
export interface StoredAdmission extends AdmissionFormData {
  id: string;
  status: 'pending' | 'contacted' | 'enrolled';
  createdAt: string;
}

export interface StoredInquiry {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  message: string;
  status: 'new' | 'responded';
  createdAt: string;
}

/**
 * Fetch all admissions for the Admin Dashboard
 */
export async function fetchAllAdmissions(): Promise<StoredAdmission[]> {
  try {
    const q = query(collection(db, 'admissions'));
    const snapshot = await getDocs(q);
    const results: StoredAdmission[] = [];
    snapshot.forEach((d) => {
      results.push({ id: d.id, ...d.data() } as StoredAdmission);
    });
    // Sort client-side by createdAt desc
    return results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'admissions');
  }
}

/**
 * Fetch all inquiries for the Admin Dashboard
 */
export async function fetchAllInquiries(): Promise<StoredInquiry[]> {
  try {
    const q = query(collection(db, 'inquiries'));
    const snapshot = await getDocs(q);
    const results: StoredInquiry[] = [];
    snapshot.forEach((d) => {
      results.push({ id: d.id, ...d.data() } as StoredInquiry);
    });
    return results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'inquiries');
  }
}

/**
 * Update admission application status
 */
export async function updateAdmissionStatus(
  id: string,
  newStatus: 'pending' | 'contacted' | 'enrolled'
): Promise<void> {
  try {
    const docRef = doc(db, 'admissions', id);
    await updateDoc(docRef, { status: newStatus });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `admissions/${id}`);
  }
}

/**
 * Update inquiry status
 */
export async function updateInquiryStatus(
  id: string,
  newStatus: 'new' | 'responded'
): Promise<void> {
  try {
    const docRef = doc(db, 'inquiries', id);
    await updateDoc(docRef, { status: newStatus });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `inquiries/${id}`);
  }
}

/**
 * Permanently delete an admission record from the database
 */
export async function deleteAdmissionFromDatabase(id: string): Promise<void> {
  try {
    const docRef = doc(db, 'admissions', id);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `admissions/${id}`);
  }
}

/**
 * Permanently delete an inquiry record from the database
 */
export async function deleteInquiryFromDatabase(id: string): Promise<void> {
  try {
    const docRef = doc(db, 'inquiries', id);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `inquiries/${id}`);
  }
}

// ==========================================
// CMS: Website Settings & Dynamic Courses
// ==========================================

export interface InstituteSettings {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  timings: string;
  announcement: string;
  updatedAt?: string;
}

export const DEFAULT_SETTINGS: InstituteSettings = {
  phone: '+92 300 00196900',
  whatsapp: '030000196900',
  email: 'tanveeruddin0714@gmail.com',
  address: 'Veer Accountancy Institute, Commercial Center, Pakistan',
  timings: 'Monday to Saturday: 9:00 AM – 9:00 PM',
  announcement: 'New Admissions Open! Limited Seats for Practical Accounting & QuickBooks Batches.'
};

/**
 * Fetch institute settings from Firestore
 */
export async function fetchInstituteSettings(): Promise<InstituteSettings> {
  try {
    const docRef = doc(db, 'settings', 'institute');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return { ...DEFAULT_SETTINGS, ...snap.data() } as InstituteSettings;
    }
    return DEFAULT_SETTINGS;
  } catch (error) {
    console.warn('Using default settings (read fallback):', error);
    return DEFAULT_SETTINGS;
  }
}

/**
 * Save / Update institute settings from Admin Backend
 */
export async function saveInstituteSettings(settings: InstituteSettings): Promise<void> {
  try {
    const docRef = doc(db, 'settings', 'institute');
    await setDoc(docRef, {
      ...settings,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'settings/institute');
  }
}

export interface CustomCourse {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  level: string;
  mode: string;
  fee?: string;
  category?: string;
  overview: string;
  topics?: string[];
  updatedAt?: string;
}

/**
 * Fetch dynamic courses catalog from Firestore
 */
export async function fetchCustomCourses(): Promise<CustomCourse[]> {
  try {
    const q = query(collection(db, 'courses_catalog'));
    const snapshot = await getDocs(q);
    const results: CustomCourse[] = [];
    snapshot.forEach((d) => {
      results.push({ id: d.id, ...d.data() } as CustomCourse);
    });
    return results;
  } catch (error) {
    console.warn('Using static courses (read fallback):', error);
    return [];
  }
}

/**
 * Save / Update course in database from Admin Backend
 */
export async function saveCustomCourse(course: CustomCourse): Promise<void> {
  try {
    const docRef = doc(db, 'courses_catalog', course.id);
    await setDoc(docRef, {
      ...course,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `courses_catalog/${course.id}`);
  }
}

/**
 * Delete a course from the database
 */
export async function deleteCustomCourse(courseId: string): Promise<void> {
  try {
    const docRef = doc(db, 'courses_catalog', courseId);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `courses_catalog/${courseId}`);
  }
}


