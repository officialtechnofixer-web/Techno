import { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  GithubAuthProvider,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

// Import from your firebase.ts file
import { auth, db } from '../firebase';

interface AuthContextType {
  currentUser: User | null;
  isAdmin: boolean;
  loading: boolean;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Use ref to prevent infinite navigation loops
  const hasNavigated = useRef(false);

  // Check if user is admin
  const checkAdminStatus = async (uid: string) => {
    if (!db) return;
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setIsAdmin(userData?.role === 'admin');
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    }
  };

  // Create or update user document
  const createOrUpdateUserDoc = async (user: User) => {
    if (!db) return;
    try {
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: 'user',
          createdAt: serverTimestamp(),
          lastLoginAt: serverTimestamp(),
        });
        console.log('New user document created');
      } else {
        // Update last login
        await setDoc(userDocRef, {
          lastLoginAt: serverTimestamp(),
        }, { merge: true });
        console.log('User last login updated');
      }
    } catch (error) {
      console.error('Error creating/updating user doc:', error);
    }
  };

  // Sign up with email/password
  const signUp = async (email: string, password: string, displayName: string) => {
    if (!auth || !db) throw new Error("Firebase not initialized");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: displayName,
        role: 'user',
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
      });

      console.log('User signed up successfully');
      // Navigation will be handled by onAuthStateChanged
    } catch (error: any) {
      console.error('Sign up error:', error);
      throw new Error(error.message || 'Failed to create account');
    }
  };

  // Sign in with email/password
  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in successfully');
      // Navigation will be handled by onAuthStateChanged
    } catch (error: any) {
      console.error('Sign in error:', error);
      throw new Error(error.message || 'Failed to sign in');
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });

      console.log('Initiating Google sign-in redirect...');
      await signInWithRedirect(auth, provider);
    } catch (error: any) {
      console.error('Google sign in error:', error);
      throw new Error(error.message || 'Failed to sign in with Google');
    }
  };

  // Sign in with GitHub
  const signInWithGithub = async () => {
    try {
      const provider = new GithubAuthProvider();
      provider.setCustomParameters({
        allow_signup: 'true'
      });

      console.log('Initiating GitHub sign-in redirect...');
      await signInWithRedirect(auth, provider);
    } catch (error: any) {
      console.error('GitHub sign in error:', error);
      throw new Error(error.message || 'Failed to sign in with GitHub');
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setIsAdmin(false);
      hasNavigated.current = false; // Reset navigation flag
      console.log('User signed out');
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  // Handle OAuth redirect result - runs once on mount
  useEffect(() => {
    let isMounted = true;

    const handleRedirect = async () => {
      try {
        console.log('Checking for redirect result...');
        const result = await getRedirectResult(auth);

        if (result && isMounted) {
          console.log('OAuth redirect successful!', result.user.email);
          await createOrUpdateUserDoc(result.user);
        } else {
          console.log('No redirect result found');
        }
      } catch (error: any) {
        if (isMounted) {
          console.error('Redirect error:', error);
          if (error.code && !error.code.includes('no-auth-event')) {
            console.error('OAuth error:', error.message);
          }
        }
      }
    };

    const timer = setTimeout(() => {
      handleRedirect();
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []); // Only run once on mount

  // Listen to auth state changes - also runs only once
  useEffect(() => {
    console.log('Setting up auth state listener...');

    if (!auth) {
      console.warn("Auth not initialized, skipping listener");
      setLoading(false);
      return;
    }

    // Add a timeout to prevent infinite loading if Firebase fails to initialize
    const loadingTimeout = setTimeout(() => {
      console.warn('Auth initialization timeout - forcing loading to false');
      setLoading(false);
    }, 3000); // 3 second timeout

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('Auth state changed:', user ? user.email : 'No user');

      clearTimeout(loadingTimeout); // Clear timeout if auth state changes
      setCurrentUser(user);

      if (user) {
        await checkAdminStatus(user.uid);

        // Only navigate once per session
        if (!hasNavigated.current) {
          const currentPath = window.location.pathname;
          const isAuthPage = currentPath.includes('/auth/') ||
            currentPath === '/login' ||
            currentPath === '/signup';

          if (isAuthPage) {
            console.log('User is logged in, redirecting from auth page...');
            hasNavigated.current = true; // Set flag to prevent re-navigation
            navigate('/', { replace: true });
          }
        }
      } else {
        setIsAdmin(false);
        hasNavigated.current = false; // Reset when logged out
      }

      setLoading(false);
    });

    return () => {
      console.log('Cleaning up auth listener');
      clearTimeout(loadingTimeout);
      unsubscribe();
    };
  }, []); // Empty dependency array - only run once

  const value: AuthContextType = {
    currentUser,
    isAdmin,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signInWithGithub,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};