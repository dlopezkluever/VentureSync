# **VentureSync MVP \- User Flow Document**

*This document describes the updated user journey for the VentureSync MVP. It aligns with the "Do Now" phases of the master checklist and incorporates the revised authentication flow, which removes mandatory onboarding in favor of a fast sign-up and subsequent profile completion.*

---

## **1\. New User First-Time Experience**

**Goal:** Get a new user from sign-up to the main app feed as quickly and reliably as possible, with no initial friction.

1. A new user opens the app and is presented with the **Login Screen**.  
2. The user taps the "Sign Up" button and is navigated to the **Sign Up Screen**.  
3. The user enters their email and password and taps "Sign Up".  
4. **Backend & App Logic (Instant Authentication):**  
   * A function creates a new user in **Firebase Auth**.  
   * Immediately afterward, a **minimal profile document** is created in Firestore. This document contains only the user's `uid`, `email`, and a default `displayName` (e.g., "user12345678").  
5. **Navigation Logic:**  
   * The app's global authentication listener detects the new user.  
   * It successfully finds the minimal profile that was just created.  
   * The app's state is set to authenticated, and the user is immediately navigated into the main application.  
6. **Final Result:** The user lands directly on the **Home Feed Screen**. There is no intermediate onboarding form or profile setup required.

## **2\. Profile Completion Flow (The New "Onboarding")**

**Goal:** Allow users to complete their professional profile using a simple, always-accessible edit profile system.

1. A new user, now inside the app, navigates to their own **Profile Screen**.  
2. The screen displays their basic information (default username, email, empty fields, etc.).  
3. An **"Edit Profile"** button is **always visible** when viewing your own profile (and never appears when viewing others' profiles).  
4. The user taps the **"Edit Profile"** button and is navigated to the **Edit Profile Screen**.  
5. On this screen, the user can fill out their VentureSync professional information:
   - **Display name, designation, specialty, and bio**
   - **Top skills** (with easy add/remove interface)
   - **External URLs** (LinkedIn, GitHub, portfolio, etc.)
   - **Profile picture** (with Camera/Photo Library choice dialog)
   - **Placeholders** for work experience and education (coming soon)
6. After filling out the form, the user taps "Save".  
7. The `updateUserProfile` function saves all the new information to their Firestore document.  
8. The user is navigated back to their Profile Screen, which now displays their complete professional information.

## **3\. Returning User Experience**

**Goal:** Ensure a seamless and fast return for existing users.

1. A returning user who is still logged in opens the app.  
2. The app's state is rehydrated using persisted data from `AsyncStorage`, and Firebase Auth confirms the valid session.  
3. The `getUserProfile` function is called and finds their complete (or incomplete) profile in Firestore.  
4. The user lands directly on the **Home Feed**.

## **4\. Core App Navigation (Swipe-Based)**

The app uses a full-screen, swipe-based navigation model.

* **Home Feed:** The central screen.  
* **Swipe Right from Home Feed → Messages Screen:** Access direct messages.  
* **Swipe Left from Home Feed → Network Page:** Access search, network content, and creation tools.  
* **Swipe Left from Network Page → Your Profile Screen:** Access your own profile.

## **5\. Core Feed & Network Experience**

**A. Viewing Content**

1. The user interacts with a full-screen, vertical, swipe-based feed on the **Home Feed** screen.  
2. Posts from other users are displayed. If a user has not yet completed their profile, their post will show their default username (e.g., "user12345678").

**B. Network Page & RAG Search**

1. Accessed by swiping left from the Home Feed.  
2. Features a **"Smart Search"** bar at the top.  
3. When a user types a query, the RAG service searches the `users` collection in Firestore and uses the Gemini API to return a list of relevant user profiles.

## **6\. User Profile System**

**A. Viewing Another User's Profile**

1. Accessed by tapping a user's profile picture from a post or search result.  
2. The screen displays all the professional data the user has entered, including their bio, designation, specialities, and tappable external links.  
3. It features an **Expandable Details Section** to show detailed `workExperience`, `education`, and `topSkills`.

**B. Viewing Your Own Profile**

1. Accessed by swiping left from the Network Page.  
2. If the profile is incomplete, it will display the **"Complete Your Profile"** prompt as described in Section 2\.  
3. If the profile is complete, it will display all the user's professional information just as it appears to others.

## **7\. Direct Messaging & Content Creation**

**A. Direct Messaging**

1. Users can initiate a conversation by tapping the **"Message"** button on another user's profile.  
2. The **Chat Screen** allows for sending text and media (images/video) which is uploaded via `expo-image-picker`.

**B. Content Creation**

1. The user taps the `+` floating action button on the **Network Page**.  
2. The user can record or upload media and add a caption before posting to the feed.

