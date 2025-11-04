import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence, GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

/**
 * Firebase Configuration - USER AUTH ONLY
 * This is ONLY for user login/signup/session management
 */

const firebaseConfig = {
  apiKey: "AIzaSyDNsO_LnQ7t3L_KWejjCuUQxxkI3r0iRxM",
  authDomain: "ignite-strategies-313c0.firebaseapp.com",
  projectId: "ignite-strategies-313c0",
  storageBucket: "ignite-strategies-313c0.firebasestorage.app",
  messagingSenderId: "252461468255",
  appId: "1:252461468255:web:0d62b1a63e3e8da77329ea",
  measurementId: "G-J2YCGRF1ZJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Auth
export const auth = getAuth(app);

// Set persistence to keep user logged in
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error('Failed to set auth persistence:', error);
});

// Google Provider for USER LOGIN
const googleProvider = new GoogleAuthProvider();

/**
 * Sign in with Google - USER LOGIN ONLY
 * Use this for signup/signin pages
 */
export async function signInWithGoogle() {
  try {
    console.log("🔐 Firebase: Signing in user with Google...");
    
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    console.log("✅ Firebase: User signed in");
    console.log("📧 Email:", user.email);
    console.log("🆔 UID:", user.uid);
    
    return {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      photoURL: user.photoURL
    };
  } catch (error) {
    console.error("❌ Firebase: Sign-in error:", error);
    throw error;
  }
}

/**
 * Sign out user
 */
export async function signOutUser() {
  try {
    await signOut(auth);
    console.log("✅ Firebase: User signed out");
  } catch (error) {
    console.error("❌ Firebase: Sign out error:", error);
    throw error;
  }
}

/**
 * Sign up with email and password
 */
export async function signUpWithEmail(email, password, displayName) {
  try {
    console.log("🔐 Firebase: Signing up with email...");
    
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;
    
    // Update display name
    if (displayName) {
      await user.updateProfile({ displayName });
    }
    
    console.log("✅ Firebase: User signed up with email");
    console.log("📧 Email:", user.email);
    console.log("🆔 UID:", user.uid);
    
    return {
      uid: user.uid,
      email: user.email,
      name: user.displayName || displayName,
      photoURL: user.photoURL
    };
  } catch (error) {
    console.error("❌ Firebase: Email sign-up error:", error);
    throw error;
  }
}

/**
 * Sign in with email and password
 */
export async function signInWithEmail(email, password) {
  try {
    console.log("🔐 Firebase: Signing in with email...");
    
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;
    
    console.log("✅ Firebase: User signed in with email");
    console.log("📧 Email:", user.email);
    console.log("🆔 UID:", user.uid);
    
    return {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      photoURL: user.photoURL
    };
  } catch (error) {
    console.error("❌ Firebase: Email sign-in error:", error);
    throw error;
  }
}

/**
 * Get current user
 */
export function getCurrentUser() {
  return auth.currentUser;
}

export { app, analytics };
