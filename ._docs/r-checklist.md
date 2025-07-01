# **VentureSync: The Definitive Master Checklist**

**Mission Objective:** Execute a focused, high-velocity sprint to build and deliver a functional, impressive VentureSync MVP that meets the immediate deadline.

**Prime Directive:** We will build on the stable clone foundation. Each phase is a self-contained block of work. We will not move to the next phase until the current one is complete and verified. No more half-measures.

## **Part 1: Do Now \- The MVP Sprint**

**Goal:** To build and stabilize the core, demonstrable features of VentureSync. This is our entire focus until the deadline.

### **Phase 0: System Stabilization (Prerequisite)**

**Objective:** To fix the critical warnings in the current clone codebase and establish a truly stable foundation.

* **\[ X] Task 1: Fix Dependency Mismatches**  
  * **Action:** In the `frontend` directory, run the command `npx expo install --fix`. This will analyze the `package.json` and install the correct, compatible versions for all Expo-related packages, resolving version conflicts.  
* **\[ X] Task 2: Implement Authentication Persistence**  
  * **Action:** In the `frontend` directory, run `npx expo install @react-native-async-storage/async-storage`.  
  * **Action (Cursor):** Modify `frontend/firebaseConfig.ts`. We will import `initializeAuth`, `getReactNativePersistence`, and `ReactNativeAsyncStorage`. We will then replace the simple `getAuth(app)` call with the full initialization object that includes persistence, as specified in the Firebase warning logs.  
  * **Verification:** After this change, the `You are initializing Firebase Auth... without providing AsyncStorage` warning must be gone.  
* **\[ X] Task 3: Resolve Navigation Warnings**  
  * **Action (Cursor):** Refactor the imports in `src/navigation/feed/index.tsx`, `src/screens/feed/index.tsx`, and `src/screens/profile/index.tsx` to break the "require cycle" warnings. This will involve ensuring screens do not import their parent navigators directly, and instead receive the `navigation` prop.

### **Phase 1: The Dynamic Resume & Core Social UI**

**Objective:** Transform the basic user profile into a rich, professional summary and build out the essential social interaction UIs.

* **\[ X] Task 1: Data Model Expansion**  
  * **Action (Us):** Define the new fields to be added to the `users` collection in Firestore. This must include: `designation` (string),  `speciality`(string) `bio` (string) `workExperience` (array of objects), `education` (array of objects), `topSkills` (array of strings), `externalURLs` (array of strings).  
    * Note: designation is either “Investor” “Visionary” or “Talent”  
    * Note: External links : To personal website, github, linkedin, youtube, etc.  
  * **Action (Cursor):** Update the `updateUserProfile` function in the user service file to accept an object containing these new fields and merge them into the user's Firestore document.  
* **\[ \] Task 2: Build the "Edit Profile" Experience**  
  * **Action (Cursor):** Create a new file: `src/screens/profile/EditProfileScreen.js`.  
  * **Action (Cursor):** This screen will be a `<ScrollView>` containing a form with `<TextInput>` components for every new field defined in Task 1\.  
  * **Action (Cursor):** Add a "Save" button in the header of this screen. On press, it will call the updated `updateUserProfile` function and then navigate back to the `UserProfileScreen`.  
  * **Action (Cursor):** Add an "Edit Profile" button to the `UserProfileScreen` that navigates to this new screen.  
* **\[ \] Task 3: Implement the Enhanced Profile View**  
  * **Action (Cursor):** Heavily modify `UserProfileScreen.js` to display all the new career data.  
  * **Action (Cursor):** Build the "Expandable Details Section". When expanded, it will map over the `workExperience`, `education`, and `topSkills` arrays from the user's profile and render them. Links must be tappable via `Linking.openURL()`.  
  * **Action (Cursor):** Build the **User List Pop-up Modal**. Implement the functionality where tapping the "Network," "Circle," or "Watching" labels on a profile opens a modal displaying a list of users. For now, this can be populated with dummy data.  

  XX SKIP XX
* **\[ \] Task 4: Implement Bookmarks Button**  
  * **Action (Cursor):** In the `PostCard.js` component (or its equivalent in the clone), add the "Bookmark" icon button to the vertical stack of interaction buttons.  
  * **Functionality:** For this phase, tapping the button will simply toggle a local state, change the icon's color to indicate selection, and log `"Post bookmarked"` to the console.

### **Phase 2: The Core Experience (Feed & Network UI)**

**Objective:** To build the UI skeletons for the main content consumption screens, populated with dummy data.

* **\[ \] Task 1: Build the `HomeFeedScreen.js` UI**  
  * **Action (Cursor):** The screen's root will be a `<FlatList>` configured with `pagingEnabled={true}` and `showsVerticalScrollIndicator={false}` to create the TikTok-style vertical swipe feed.  
  * **Action (Cursor):** Implement the `onViewableItemsChanged` prop on the `<FlatList>` to track which post is currently visible, which will be used to control video playback.  


* **\[ \] Task 2: Build the `PostCard.js` Component**  
  * **Action (Cursor):** This component will receive a `post` object and an `isCurrentlyVisible` boolean as props.  
  * **Action (Cursor):** It will conditionally render either a `<Video>` component (from `expo-av`) or a simple `<Image>` based on the `post.type`. The video's `shouldPlay` prop must be tied to `isCurrentlyVisible`.  
  * **Action (Cursor):** Build the UI overlay, including the username, caption, and all interaction buttons (Like, Dislike, Bookmark, Share, Message, SLOP).

  XX Skip XX -- instead make it just so the search works
* **\[ \] Task 3: Build the `NetworkPageScreen.js` UI Skeleton**  
  * **Action (Cursor):** At the top of the screen, add the "Smart Search" `TextInput` placeholder.  
  * **Action (Cursor):** Below search, add a `ScrollView` containing placeholders for the "Updates" (Stories) reel and "The Latest" (Posts) grid.  
  * **Action (Cursor):** Add the `+` floating action button in the bottom-right corner.

### **Phase 3: The Communication Channel (Direct Media Messaging)**

**Objective:** Build a functional system for one-to-one media sharing.

* **\[ \] Task 1: Implement Core Messaging UI**  
  * **Action (Cursor):** Add a "Message" button to other users' profiles.  
  * **Action (Cursor):** This button will navigate to a dedicated `ChatScreen.js`. We will build this screen with an inverted `<FlatList>`, a `MessageBubble` component, and a `TextInput` bar.

* **\[ \] Task 2: Implement DM Media Upload**  
  * **Action (Cursor):** Add an "Upload" icon inside the `ChatScreen.js` text input bar. Tapping it will open the device's image/video library using `expo-image-picker`.  
  * **Action (Cursor):** Implement the logic to upload the selected file to `/direct_messages/{chatId}/{fileName}` in Firebase Storage.  
* **\[ \] Task 3: Implement the Messaging Service**  
  * **Action (Cursor):** Implement a `chatService.js` with `sendMessage` and `listenToMessages` functions to interact with Firestore.

### **Phase 4: The AI Core (MVP RAG Integration)**

**Objective:** To implement the key differentiator that makes VentureSync unique.

* **\[ \] Task 1: Implement Client-Side RAG Service**  
  * **Action (Cursor):** Create a `ragService.js` file.  
  * **Action (Cursor):** Implement a function `queryVentureSync(prompt)` that takes search text, performs a keyword-based query against the Firestore `users` collection, formats the results into a context, and makes a `fetch` call to the Gemini API.  
* **\[ \] Task 2: Integrate RAG into the UI**  
  * **Action (Cursor):** Connect the "Smart Search" bar on the `NetworkPageScreen` to the new `ragService.js`.  
  * **Action (Cursor):** Build the UI to display the list of user profiles returned by the service.

## **Part 2: Do Later \- Post-Deadline Enhancements**

**Goal:** To transform the functional MVP into a full-featured, production-ready application.

### **Phase 5: Advanced Content & Feed Features**

* **\[ \] Full Content Creation Suite:** Implement the complete Snapchat-style creation interface (`CameraScreen`, `PreviewAndEditScreen`, `PublishingOptionsScreen`) with text overlays.  
* **\[ \] Algorithmic Feed Curation:** Implement the intelligent algorithm for the `HomeFeedScreen`.  
* **\[ \] "Updates" (Stories):** Build the ephemeral, 24-hour content system.  
* **\[ \] Pinned Posts:** Add the ability for users to pin up to 6 posts to the top of their profile grid.  
* **\[ \] Advanced Media Handling:**  
  * Implement the auto-cycling carousel with pause-on-tap and swipe override.  
  * Implement the seamless profile-scroll-to-feed animation.

### **Phase 6: Advanced Social & Moderation**

* **\[ \] Network Feed:** Build the `NetworkFeedScreen` that is shown when tapping content from the `NetworkPageScreen`, which cycles through network-only posts.  
* **\[ \] Full Notification System:** Build the notification center (bell icon) and the underlying services to show alerts for new followers, circle requests, etc.  
* **\[ \] "SLOP" Content Reporting:** Implement the backend logic (Cloud Functions) and moderation tools for the user-driven quality control system.  
* **\[ \] Bookmarks Screen:** Build the dedicated `BookmarksScreen` and the feed that cycles through bookmarked items.  
* **\[ \] Vanishing Messages:** Implement the 30-day auto-delete feature for unread messages.  
* **\[ \] RAG-Assisted Replies:** Build the "suggested reply" feature within the chat UI.  
* **\[ \] In-Chat Management:** Implement the "Star," "Delete," and "Report & Block" features within chat threads.

### **Phase 7: Monetization & Growth Features**

* **\[ \] Content Boosting System:** Build the UI and backend logic for paid post boosts.  
* **\[ \] Message Credits System:** Implement the full system for a weekly message credit allowance and the in-app purchase flow.  
* **\[ \] Automated Profile Imports:** Build the feature to import data from LinkedIn.  
* **\[ \] Verified Credentials:** Integrate systems for ID verification and adding verified CCAT scores to profiles.  
* **\[ \] Analytics Screen:** Build the `AnalyticsScreen` with visualizations for profile performance.

