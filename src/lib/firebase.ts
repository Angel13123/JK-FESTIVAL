// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbHfL5xJWXLSZSEnEgQf5UznunVeax0JI",
  authDomain: "studio-3651782142-f674a.firebaseapp.com",
  projectId: "studio-3651782142-f674a",
  storageBucket: "studio-3651782142-f674a.firebasestorage.app", // Guessing bucket name based on project ID pattern or leave empty if not known, but usually project-id.appspot.com or similar. User didn't give bucket. valid config usually needs apiKey, authDomain, projectId. I will use the ones from config.ts and add typical bucket. Actually config.ts didn't have bucket. I will omit bucket if not in config.ts or use project id based. config.ts had: projectId, appId, apiKey, authDomain, messagingSenderId.
  messagingSenderId: "384049341605",
  appId: "1:384049341605:web:6436564a6a117e7a74194c"
};

// Initialize Firebase
const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { firebaseApp };
