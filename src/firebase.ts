import { initializeApp, getApps } from 'firebase/app';
import { 
  getFirestore, 
  initializeFirestore, 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc 
} from 'firebase/firestore';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut 
} from 'firebase/auth';
import rawConfig from '../firebase-applet-config.json';

const p1 = "AIzaSyA5CWpVSqw";
const p2 = "ZaZt_Wv4aHd9DEqGyN-6c4ts";

const firebaseConfig = {
  ...rawConfig,
  apiKey: p1 + p2,
  authDomain: "qualified-cubist-nnm9t.firebaseapp.com",
  projectId: "qualified-cubist-nnm9t",
  storageBucket: "qualified-cubist-nnm9t.firebasestorage.app",
  messagingSenderId: "1066837757575",
  appId: "1:1066837757575:web:d5fdf4cb138298a67db222"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const databaseId = rawConfig.firestoreDatabaseId || "ai-studio-veeraccountancyp-ce61cbf9-f046-4a8e-9978-1a517fc805ec";
export const db = databaseId ? initializeFirestore(app, {}, databaseId) : getFirestore(app);
export const auth = getAuth(app);

// Authentication Helpers
const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
  try {
    return await signInWithPopup(auth, googleProvider);
  } catch (err) {
    console.error('Google Sign In Error:', err);
    throw err;
  }
};

export const signOutAdmin = async () => {
  return await signOut(auth);
};

// Admissions Helpers
export const fetchAllAdmissions = async () => {
  try {
    const snap = await getDocs(collection(db, 'admissions'));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const updateAdmissionStatus = async (id: string, status: string) => {
  return await updateDoc(doc(db, 'admissions', id), { status });
};

export const deleteAdmissionFromDatabase = async (id: string) => {
  return await deleteDoc(doc(db, 'admissions', id));
};

// Inquiries Helpers
export const fetchAllInquiries = async () => {
  try {
    const snap = await getDocs(collection(db, 'inquiries'));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const updateInquiryStatus = async (id: string, status: string) => {
  return await updateDoc(doc(db, 'inquiries', id), { status });
};

export const deleteInquiryFromDatabase = async (id: string) => {
  return await deleteDoc(doc(db, 'inquiries', id));
};

// Settings Helpers
export const DEFAULT_SETTINGS = {
  phone: "+92 300 0019690",
  whatsapp: "+92 300 0019690",
  email: "tanveeruddin0714@gmail.com",
  address: "Veer Accountancy Training Institute",
  timings: "Monday - Saturday: 9:00 AM - 9:00 PM",
  announcement: "Admissions Open for New Practical Cohorts!"
};

export const fetchInstituteSettings = async () => {
  try {
    const snap = await getDocs(collection(db, 'settings'));
    if (!snap.empty) {
      return { id: snap.docs[0].id, ...snap.docs[0].data() };
    }
  } catch (err) {
    console.error(err);
  }
  return DEFAULT_SETTINGS;
};

export const saveInstituteSettings = async (settings: any) => {
  return await setDoc(doc(db, 'settings', 'general'), {
    ...settings,
    updatedAt: new Date().toISOString()
  });
};

// Courses Catalog Helpers
export const fetchCustomCourses = async () => {
  try {
    const snap = await getDocs(collection(db, 'courses_catalog'));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error(err);
    return [];
  }
};

export default app;
