# **VentureSync MVP User Flow (No Onboarding)**

**Objective:** This document defines the simplified, definitive user journey for the VentureSync MVP. It corresponds to the "Do Now" phases of the master checklist and explicitly **removes the mandatory onboarding step** to ensure a fast, bug-free authentication experience.

### **1\. New User First-Time Experience**

**Goal:** Get a new user from sign-up to the main app feed as quickly and reliably as possible.

1. **Action:** A new user opens the app and is presented with the **Login Screen**.  
2. **Action:** The user taps the "Sign Up" button.  
3. **Result:** They are navigated to the **Sign Up Screen**.  
4. **Action:** The user enters their email and password and taps "Sign Up".  
5. **Backend & App Logic (The "One-Swipe" Auth):**  
   * The `handleSignUp` function is triggered.  
   * `registerUser` is called, creating a new user in **Firebase Auth**.  
   * **Immediately after**, `createUserProfile` is called. It creates a **minimal profile document** in Firestore with just the user's `uid`, `email`, and a default `displayName` (e.g., "user98393232") (the number being a random, unused, 8 digit number)  
6. **Navigation Logic:**  
   * The app's global `onAuthStateChanged` listener detects the new authenticated user.  
   * It then calls `getUserProfile` and **successfully finds the minimal profile** we just created.  
   * The state is set to `isAuthenticated: true` and `profileExists: true`.  
7. **Final Result:** The user is immediately navigated to the main application, landing on the **Home Feed Screen** (`AppStack`). There is no intermediate onboarding form.

### **2\. Profile Completion Flow (The New "Onboarding")**

**Goal:** Prompt a new user to complete their profile at their own convenience.

1. **Action:** A new user, now inside the main app, navigates to their own **Profile Screen**.  
2. **Result:** The profile screen renders. It detects that the user's profile data (like `workExperience`, `topSkills`, etc.) is missing or that the `displayName` is still the default value.  
3. **UI Prompt:** The screen will display a prominent "Complete Your Profile" button or banner.  
4. **Action:** The user taps the "Edit Profile" or "Complete Your Profile" button.  
5. **Result:** The user is navigated to the **Edit Profile Screen**.  
6. **Action:** The user fills out all their career information and taps "Save".  
7. **Backend:** The `updateUserProfile` function is called, and all the new information is saved to their document in Firestore.  
8. **Result:** The user is navigated back to their profile, which now displays their complete professional information.

### **3\. Returning User Experience**

**Goal:** Ensure a seamless return for existing users.

1. **Action:** A returning user who is still logged in opens the app.  
2. **App Logic:**  
   * The persisted state from `AsyncStorage` is rehydrated.  
   * The `onAuthStateChanged` listener confirms the valid session with Firebase.  
   * `getUserProfile` is called and finds their complete profile.

