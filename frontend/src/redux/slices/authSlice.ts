import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../../firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { getPostsByUser } from "./postSlice";
import { User } from "../../../types";
import { createVentureSyncUserProfile } from "../../services/user";

export const userAuthStateListener = createAsyncThunk(
  "auth/userAuthStateListener",
  async (_, { dispatch }) => {
    FIREBASE_AUTH.onAuthStateChanged((user) => {
      if (user) {
        dispatch(getCurrentUserData());
        dispatch(getPostsByUser(user.uid));
      } else {
        dispatch(setUserState({ currentUser: null, loaded: true }));
      }
    });
  },
);

export const getCurrentUserData = createAsyncThunk(
  "auth/getCurrentUserData",
  async (_, { dispatch }) => {
    if (FIREBASE_AUTH.currentUser) {
      const unsub = onSnapshot(
        doc(FIREBASE_DB, "user", FIREBASE_AUTH.currentUser.uid),
        (res) => {
          if (res.exists()) {
            dispatch(setUserState({ currentUser: res.data(), loaded: true }));
          } else {
            // Handle case where user document doesn't exist
            console.log("User document not found, creating minimal profile...");
            // Create a minimal profile if it doesn't exist
            createVentureSyncUserProfile({
              uid: FIREBASE_AUTH.currentUser!.uid,
              email: FIREBASE_AUTH.currentUser!.email || "unknown@email.com",
              displayName: `user${Math.floor(10000000 + Math.random() * 90000000)}`,
              designation: "Talent",
              specialty: "General",
              bio: "",
            }).catch((error) => {
              console.error("Failed to create user profile:", error);
              // Even if creation fails, set loaded to true to prevent infinite loading
              dispatch(setUserState({ currentUser: null, loaded: true }));
            });
          }
        },
        (error) => {
          console.error("Error listening to user document:", error);
          dispatch(setUserState({ currentUser: null, loaded: true }));
        }
      );
    } else {
      console.log("No user is signed in.");
      dispatch(setUserState({ currentUser: null, loaded: true }));
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async (payload: { email: string; password: string }) => {
    const { email, password } = payload;
    await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
  },
);

export const register = createAsyncThunk(
  "auth/register",
  async (payload: { email: string; password: string }) => {
    const { email, password } = payload;
    
    // Create Firebase Auth account
    const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
    const user = userCredential.user;
    
    // Generate default username with 8 random digits
    const generateDefaultUsername = () => {
      const randomDigits = Math.floor(10000000 + Math.random() * 90000000);
      return `user${randomDigits}`;
    };
    
    // Create VentureSync user profile in Firestore
    // Using temporary default values - these will be updated in the profile completion flow
    await createVentureSyncUserProfile({
      uid: user.uid,
      email: user.email || email,
      displayName: generateDefaultUsername(),
      designation: "Talent", // Default - will be updated in profile completion
      specialty: "General", // Default - will be updated in profile completion
      bio: "", // Will be updated in profile completion
    });
  },
);

interface AuthState {
  currentUser: User | null;
  loaded: boolean;
}

const initialState: AuthState = {
  currentUser: null,
  loaded: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserState: (state, action) => {
      state.currentUser = action.payload.currentUser;
      state.loaded = action.payload.loaded;
    },
  },
  extraReducers: (builder) => {
    // Handle additional cases for async actions if needed
  },
});

export const { setUserState } = authSlice.actions;
export default authSlice.reducer;
