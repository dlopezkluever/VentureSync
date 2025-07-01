# **VentureSync: Backend Implementation Strategy & Directives**

**TO:** Cursor AI

**FROM:** Project Lead

**SUBJECT:** Definitive Strategy for Backend Implementation

**PRIME DIRECTIVE:** All development must proceed under the assumption that the `/backend` (Firebase Cloud Functions) directory in the source code is **offline and will not be used**. All backend interactions for the "Do Now" MVP phase will be handled directly by the client-side React Native application using the Firebase SDKs.

This is a **client-authoritative architecture**. The frontend is responsible for all business logic and data manipulation.

### **1\. Authentication (Firebase Auth)**

* **Execution:** All authentication actions—user registration, login, and session management—will be executed directly from the frontend using the `firebase/auth` SDK.  
* **Key Function:** The `onAuthStateChanged` listener is the single source of truth for the user's session state. The frontend will listen to this and update the global state accordingly.  
* **Data Flow Example (Sign-Up):**  
  1. The `SignUpScreen` calls the `registerUser` function in `authService.js`.  
  2. `registerUser` calls Firebase Auth's `createUserWithEmailAndPassword`.  
  3. Upon success, `onAuthStateChanged` fires, notifying the app of the new user.  
  4. The `SignUpScreen` then **immediately** calls `createUserProfile` in `userService.js` to create the minimal user document in Firestore.

### **2\. Database (Cloud Firestore)**

* **Execution:** All database reads and writes will be performed directly from the frontend using the `firebase/firestore` SDK. There will be **no server-side triggers** for data manipulation (like updating counters).  
* **Data Flow Example (Profile Update):**  
  1. User fills out the form on `EditProfileScreen` and taps "Save".  
  2. The `handleSubmit` function calls `updateUserProfile` in `userService.js`.  
  3. `updateUserProfile` calls Firestore's `updateDoc` function to merge the new career information into the user's document in the `users` collection.  
* **Data Flow Example (Liking a Post \- *Illustrative*):**  
  1. User taps the "Like" button on a post.  
  2. The frontend code will directly write a new document into a `likes` subcollection (e.g., `/posts/{postId}/likes/{userId}`).  
  3. To display the like count, the frontend will read the number of documents in that subcollection. We will accept the performance trade-off of not having an automated counter for the MVP.

### **3\. File Storage (Firebase Storage)**

* **Execution:** All file uploads (videos, images, profile pictures) will be managed entirely by the frontend using the `firebase/storage` SDK.  
* **Data Flow Example (Direct Message with Image):**  
  1. User selects an image from the gallery on the `ChatScreen`.  
  2. The frontend initiates an upload task, sending the file directly to a designated path in Firebase Storage (e.g., `/direct_messages/{chatId}/{imageName}.jpg`).  
  3. The frontend listens for the upload to complete.  
  4. Upon completion, the frontend gets the public `downloadURL` for the uploaded image.  
  5. The frontend then calls the `sendMessage` function, writing a new message document to Firestore that contains the `downloadURL` in its `mediaUrl` field.

### **4\. RAG Integration (OpenAI API)**

* **Execution:** The entire Retrieval-Augmented Generation process for the MVP will be handled on the client-side.  
* **Data Flow Example (Smart Search):**  
  1. User types a query ("AI engineers") into the search bar and submits.  
  2. The `ragService.js` on the frontend performs a query against the **Cloud Firestore** `users` collection to find relevant profiles.  
  3. The service formats the fetched profile data into a text-based context string.  
  4. The service makes a direct, secure `fetch` call from the client to the **Open API**, sending the context and the original user query.  
  5. The UI displays the response from the Gemini API.

This client-authoritative strategy is our definitive path forward. It leverages the power of Firebase's BaaS features to build a fully functional application while completely sidestepping the deployment issues with the outdated Cloud Functions. Do not attempt to deploy or use any code from the `/backend` directory