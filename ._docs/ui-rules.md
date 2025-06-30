# **UI & Design Principles**

This document outlines the core design principles and UI rules for the SnapConnect application. These rules ensure a consistent, intuitive, and engaging user experience that aligns with the project's fast-paced, content-first nature.

### **1\. Gesture-First, Chrome-Free Navigation**

* **Principle:** The primary method of navigation is through gestures (swiping), not traditional buttons or tab bars. The UI should be "chrome-free," maximizing space for content.  
* **Rule:** The three core screens (Camera, Stories Feed, Inbox) must always be navigable via a left/right swipe from the central Stories Feed.  
* **Rule:** Vertical swipes are reserved for navigating between stories in the feed.  
* **Rule:** To aid discovery for new users, subtle visual cues (e.g., static text labels like `< Camera` and `Messages >` on the Stories Feed) should be present on the first few app launches.

### **2\. Content is the Interface**

* **Principle:** The user's content (photos, videos) and their friends' content is the most important element on the screen. UI elements should complement the content, not contain it.  
* **Rule:** On the Camera and Stories Feed screens, UI elements like usernames, timers, and action buttons must be overlaid directly onto the content.  
* **Rule:** Overlays must have sufficient contrast to be legible but should not fully obstruct the underlying content. Use subtle gradients or semi-transparent backgrounds where necessary.

### **3\. Clear & Immediate Visual Feedback**

* **Principle:** The app must communicate status changes instantly and clearly. Users should never be left wondering if their action was successful.  
* **Rule:** All interactive elements must have a clear "pressed" state (e.g., a momentary change in opacity or scale).  
* **Rule:** The colored ring indicating a new Story must be visually distinct (`#ED1C24` red). Upon viewing, it must immediately transition to a "seen" state (e.g., dark grey).  
* **Rule:** Sending, saving, or replaying a snap must trigger immediate feedback, such as a brief on-screen confirmation message ("Saved\!") or a subtle haptic response.

### **4\. Consistent Visual Hierarchy**

* **Principle:** The visual design must guide the user's attention to the most important actions and information.  
* **Rule:** Primary actions (e.g., "Send", Camera Shutter) will use the primary accent color (`#ED1C24` red) and be prominently placed.  
* **Rule:** Secondary actions (e.g., "Add Friend", "Replay") will use the secondary accent colors (`#009A4E` green, `#FFF200` yellow).  
* **Rule:** The size and weight of typography will be used to differentiate between headers, user-generated text, and system labels.

