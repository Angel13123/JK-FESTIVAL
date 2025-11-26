
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { doc, getDoc, setDoc, serverTimestamp, getFirestore } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';

interface AppUser {
  email: string;
  username: string;
}

interface AppContextType {
  user: AppUser | null;
  isLoading: boolean;
  login: (user: AppUser) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const { firestore } = initializeFirebase();

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('appUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (appUser: AppUser) => {
    localStorage.setItem('appUser', JSON.stringify(appUser));
    setUser(appUser);
  };

  const logout = () => {
    localStorage.removeItem('appUser');
    setUser(null);
  };

  return (
    <AppContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Firestore service functions for app_users
const appUsersCollection = 'app_users';

export const findAppUserByEmail = async (email: string): Promise<any | null> => {
  try {
    const userDocRef = doc(firestore, appUsersCollection, email);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() };
    }
    return null;
  } catch (error) {
    console.error("Error finding user:", error);
    return null;
  }
};

export const createAppUser = async (email: string, username: string, pin: string): Promise<AppUser> => {
  const newUser: AppUser = { email, username };
  await setDoc(doc(firestore, appUsersCollection, email), {
    ...newUser,
    pin, // Storing PIN directly, as requested. For a real app, this should be hashed.
    createdAt: serverTimestamp(),
  });
  return newUser;
};
