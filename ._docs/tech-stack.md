# **Current Base Functionality App - User Flow Document**

*This document describes the user journeys for the app as it currently exists at it's base functionality with video sharing, social features, and messaging.*

---

## **1. Authentication & Onboarding Flow**

**A. New User (First-Time Launch)**

1. User opens the app for the first time
2. The app displays a **Landing/Auth Screen** with options:
   - **"Sign Up"** button
   - **"Login"** button
3. **Sign Up Flow:**
   - User taps "Sign Up"
   - User enters **Email** and **Password**
   - User submits registration form
   - Firebase creates user account
   - User is automatically logged in
   - User lands on the main **Feed Screen**

**B. Returning User (Already Logged In)**

1. User opens the app
2. Firebase Auth checks stored credentials
3. User lands directly on the **Feed Screen**

**C. Returning User (Logged Out)**

1. User opens the app
2. The app displays the **Landing/Auth Screen**
3. User taps **"Login"**
4. User enters **Email** and **Password**
5. Upon successful authentication, user lands on **Feed Screen**

---

## **2. Core App Navigation (Tab-Based)**

The app uses a **bottom tab navigation** with these main sections:

### **Main Tabs:**
- **🏠 Feed** - Main video feed
- **🔍 Search** - User search functionality  
- **📹 Camera** - Video recording/posting
- **💬 Messages** - Direct messaging
- **👤 Profile** - User profile

---

## **3. Main Feed Experience**

**A. Viewing Videos**

1. User is on the **Feed Screen** (main screen)
2. Videos auto-play in **full-screen vertical format**
3. **User Interactions:**
   - **Swipe Up/Down** - Navigate between videos
   - **Tap Screen** - Pause/play video
   - **Double Tap** - Like video (heart animation)

**B. Video Interaction Panel (Right Side Icons)**

1. **Profile Picture** (top)
   - Tap → Navigate to that user's **Profile Screen**
2. **❤️ Like Button** 
   - Tap → Like/unlike video
   - Shows current like count
3. **💬 Comment Button**
   - Tap → Open **Comments Modal**
   - Shows current comment count
4. **➤ Share Button**
   - Tap → Share video (external sharing options)
5. **🎵 Audio/Music Icon**
   - Shows audio information
   - Tap → View audio details

**C. Video Information Panel (Bottom)**

1. **Username** and **Caption**
2. **Hashtags** (if any)
3. **Audio/Music Information**

---

## **4. Comments System**

**A. Viewing Comments**

1. User taps **Comment Button** on any video
2. **Comments Modal** slides up from bottom
3. User sees:
   - List of all comments on the video
   - Comment author names and profile pictures
   - Comment text and timestamps

**B. Adding Comments**

1. In Comments Modal, user taps **text input field** at bottom
2. User types comment
3. User taps **"Send"** button
4. Comment appears in the list immediately
5. Comment count updates on main video

---

## **5. User Profile System**

**A. Viewing Your Own Profile**

1. User taps **Profile Tab** (bottom navigation)
2. **Profile Screen** displays:
   - Profile picture and name
   - **Follower/Following counts**
   - **Total likes received**
   - **Grid of user's posted videos**
   - **Edit Profile** button

**B. Viewing Other Users' Profiles**

1. User taps on **any profile picture** (from feed, comments, etc.)
2. **User Profile Screen** displays:
   - Profile picture and name
   - **Follower/Following counts** 
   - **Total likes received**
   - **Grid of that user's videos**
   - **Follow/Unfollow Button**
   - **Message Button**

**C. Following/Unfollowing Users**

1. On any user's profile, tap **"Follow"** button
2. Button changes to **"Following"**
3. User's content appears in your feed
4. Your following count increases
5. Their follower count increases

---

## **6. Content Creation Flow**

**A. Recording New Video**

1. User taps **Camera Tab** (bottom navigation)
2. **Camera Screen** opens with:
   - Camera viewfinder (full screen)
   - **Record Button** (large circular button)
   - **Flip Camera** button (front/back)
   - **Flash** toggle
3. User taps and holds **Record Button** to record
4. User releases to stop recording

**B. Video Editing & Posting**

1. After recording, **Edit Screen** appears:
   - Video preview
   - **Caption input field**
   - **Add Music** option
   - **Effects/Filters** (if available)
2. User adds caption and selects options
3. User taps **"Post"** button
4. Video uploads to Firebase Storage
5. Video metadata saves to Firestore
6. User returns to **Feed Screen**

**C. Uploading from Gallery**

1. On Camera Screen, user can select **Gallery option**
2. User selects existing video from device
3. Proceeds to **Edit Screen** (same as above)

---

## **7. Search & Discovery**

**A. User Search**

1. User taps **Search Tab** (bottom navigation)
2. **Search Screen** displays:
   - Search input field
   - Recent searches (if any)
   - Trending/suggested users
3. User types **email address** to search
4. Matching users appear in results
5. User taps on result to view **Profile Screen**

---

## **8. Direct Messaging System**

**A. Messages Overview**

1. User taps **Messages Tab** (bottom navigation) 
2. **Messages Screen** displays:
   - List of all conversation threads
   - Each thread shows: other user's name, last message, timestamp
   - **New Message** button

**B. Starting New Conversation**

1. User taps **"New Message"** button
2. User searches for recipient by email
3. User selects recipient
4. **Chat Screen** opens

**C. Chat Experience**

1. **Chat Screen** displays:
   - Conversation history (messages in chronological order)
   - **Text input field** at bottom
   - **Send button**
2. User types message and taps **Send**
3. Messages appear in real-time for both users
4. Messages sync across devices via Firestore

---

## **9. Settings & Account Management**

**A. Profile Editing**

1. From **Profile Screen**, user taps **"Edit Profile"**
2. **Edit Profile Screen** allows:
   - Change profile picture
   - Update display name
   - Modify bio/description
3. User saves changes

**B. Logout**

1. User can logout from Profile/Settings area
2. Returns to **Landing/Auth Screen**

---

## **10. Key Data Flows (Current TikTok Clone)**

### **User Data Structure:**
```typescript
User: {
  uid: string,
  email: string,
  displayName: string,
  profilePicture: string,
  followersCount: number,
  followingCount: number,
  likesCount: number
}
```

### **Post Data Structure:**
```typescript
Post: {
  id: string,
  creator: string,
  videoUrl: string,
  caption: string,
  creation: timestamp,
  likesCount: number,
  commentsCount: number
}
```

### **Social Interactions:**
- **Likes:** Stored in `post/{postId}/likes/{userId}`
- **Comments:** Stored in `post/{postId}/comments/{commentId}`
- **Following:** Stored in `user/{userId}/following/{followedUserId}`

---

## **11. Current Limitations (Without Working Cloud Functions)**

**⚠️ What Doesn't Work Properly:**
- **Counters may not update** (likes, followers, comments counts)
- **User profiles may not auto-create** on registration
- **Some real-time features** may be limited

**✅ What Still Works:**
- **Authentication** (login/logout)
- **Video posting** and viewing
- **Basic social interactions** (like/comment/follow)
- **Direct messaging**
- **Search functionality**
- **Profile viewing**

---

This represents the **current functionality** that exists in your codebase right now. The app provides a complete social video platform experience similar to TikTok, with the main limitation being the non-functional Cloud Functions for automatic counter updates.

"The way to get started is to quit talking and begin doing." - Walt Disney