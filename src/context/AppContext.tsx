
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { doc, getDoc, setDoc, serverTimestamp, getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import type { ChatMessage } from '@/lib/types';

interface AppUser {
  email: string;
  username: string;
}

interface NotificationSettings {
    enabled: boolean;
    priorityOnly: boolean;
}

interface AppContextType {
  user: AppUser | null;
  isGuest: boolean;
  isLoading: boolean;
  unreadCount: number;
  notificationSettings: NotificationSettings;
  setNotificationSettings: (settings: NotificationSettings) => void;
  login: (user: AppUser) => void;
  logout: () => void;
  enterGuestMode: () => void;
  exitGuestMode: () => void;
  updateLastReadTimestamp: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const { firestore } = initializeFirebase();
const chatMessagesCollection = collection(firestore, 'chat_messages');

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lastReadTimestamp, setLastReadTimestamp] = useState<number | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notificationSettings, setNotificationSettingsState] = useState<NotificationSettings>({ enabled: false, priorityOnly: false });

  // Load initial state from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('appUser');
      const guestStatus = localStorage.getItem('isGuest') === 'true';
      const storedTimestamp = localStorage.getItem('lastReadTimestamp');
      const storedNotifSettings = localStorage.getItem('notificationSettings');

      if (storedUser) setUser(JSON.parse(storedUser));
      else if (guestStatus) setIsGuest(true);
      
      if (storedTimestamp) setLastReadTimestamp(JSON.parse(storedTimestamp));
      else setLastReadTimestamp(Date.now());

      if (storedNotifSettings) setNotificationSettingsState(JSON.parse(storedNotifSettings));

    } catch (error) {
        console.error("Error reading from localStorage", error);
        localStorage.clear();
    }
    setIsLoading(false);
  }, []);

  const setNotificationSettings = (settings: NotificationSettings) => {
      localStorage.setItem('notificationSettings', JSON.stringify(settings));
      setNotificationSettingsState(settings);
      if(settings.enabled) {
          if (Notification.permission !== 'granted') {
              Notification.requestPermission();
          }
      }
  }

  const updateLastReadTimestamp = useCallback(() => {
    const now = Date.now();
    localStorage.setItem('lastReadTimestamp', JSON.stringify(now));
    setLastReadTimestamp(now);
    setUnreadCount(0);
  }, []);


  // Real-time listener for chat messages
  useEffect(() => {
    if (isGuest || !user) {
        setUnreadCount(0);
        return;
    };

    const q = query(chatMessagesCollection, where('timestamp', '>', new Date(lastReadTimestamp || Date.now())));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
        const newMessages = snapshot.docs.map(doc => doc.data() as ChatMessage);
        
        // Update unread count for badge
        const count = newMessages.length;
        setUnreadCount(count);

        // Handle notifications
        if (snapshot.docChanges().some(change => change.type === 'added')) {
            const latestMessage = newMessages[newMessages.length - 1];
            if (latestMessage && latestMessage.userId !== user.email && document.visibilityState === 'hidden') {
                if(notificationSettings.enabled) {
                    if (!notificationSettings.priorityOnly || (notificationSettings.priorityOnly && latestMessage.role === 'admin')) {
                       new Notification(`Nuevo mensaje de ${latestMessage.userName}`, {
                          body: latestMessage.text,
                          icon: '/icons/icon-192x192.png',
                          badge: '/icons/icon-192x192.png'
                       });
                    }
                }
            }
        }
    }, (error) => {
        console.error("Error in chat snapshot listener:", error);
    });

    return () => unsubscribe();
  }, [user, isGuest, lastReadTimestamp, notificationSettings]);

  const login = (appUser: AppUser) => {
    localStorage.setItem('appUser', JSON.stringify(appUser));
    localStorage.removeItem('isGuest');
    setUser(appUser);
    setIsGuest(false);
  };

  const logout = () => {
    localStorage.clear(); // Clear all app data on logout
    setUser(null);
    setIsGuest(false);
  };
  
  const enterGuestMode = () => {
      localStorage.setItem('isGuest', 'true');
      localStorage.removeItem('appUser');
      setIsGuest(true);
      setUser(null);
  };
  
  const exitGuestMode = () => {
      localStorage.removeItem('isGuest');
      setIsGuest(false);
  }

  return (
    <AppContext.Provider value={{ user, isGuest, isLoading, unreadCount, notificationSettings, setNotificationSettings, login, logout, enterGuestMode, exitGuestMode, updateLastReadTimestamp }}>
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
const appUsersCollectionName = 'app_users';

export const findAppUserByEmail = async (email: string): Promise<any | null> => {
  try {
    const userDocRef = doc(firestore, appUsersCollectionName, email);
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
  await setDoc(doc(firestore, appUsersCollectionName, email), {
    ...newUser,
    pin,
    createdAt: serverTimestamp(),
  });
  return newUser;
};
