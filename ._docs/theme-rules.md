# **Theme Rules & Style Guide**

This document defines the specific colors, styles, and visual treatments to be used across the SnapConnect application. Adhering to this guide is mandatory to ensure a consistent and high-quality visual identity.

### **1\. Color Palette**

All colors must be implemented via the `tailwind.config.js` file to ensure consistency, using the specified semantic names.

* **Background (`background`):**  
  * `#FFFFFF` (White)  
  * **Usage:** The solid base color for primary screens like the Message Inbox, Profile Page, and modal views.  
* **Primary Text (`text-primary`):**  
  * `#002A5C` (Navy Blue)  
  * **Usage:** The standard color for all body text, labels, and captions to ensure maximum readability against the white background.  
* **Primary Accent / Action (`primary`):**  
  * `#00338D` (Royal Blue)  
  * **Usage:** Reserved for the most important interactive elements: New Story indicator rings, camera shutter button, "Send" buttons, and notification badges.  
* **Secondary Accent / Positive (`secondary-positive`):**  
  * `#0080C6` (Powder Blue)  
  * **Usage:** For positive or secondary creation actions, such as the "Add Friend" button or a "Friend Request Accepted" notification.  
* **Secondary Accent / Attention (`secondary-attention`):**  
  * `#FFC20E` (Charger Yellow)  
  * **Usage:** For actions that require user attention but are not primary. This includes the "Replay" icon/button and confirmation banners (e.g., "Snap Saved").  
* **Seen / Inactive State (`inactive`):**  
  * `#8f8f8f` (Neutral Grey)  
  * **Usage:** For indicators that have been actioned, such as the ring for a story that has already been viewed.

### **2\. Typography**

The application will use a two-font system to balance brand identity with UI legibility.

* **Brand/Display Font:** **Sprintura**  
  * **Usage:** This font is reserved exclusively for the main "SnapConnect" logo on the initial landing/login page and potentially for major marketing headlines outside the app. It should not be used for any interactive UI elements.  
* **UI Font:** **Inter**  
  * **Usage:** Inter will be used for all other text within the application to ensure maximum legibility and a clean, modern aesthetic.  
* **Hierarchy (using Inter):**  
  * **Screen Headers:** Bold weight, 24pt size.  
  * **Usernames / Display Names:** Medium weight, 16pt size.  
  * **Body Text / Chat Messages:** Regular weight, 14pt size.  
  * **Labels / Timestamps:** Regular weight, 12pt size, often with reduced opacity (e.g., 70%).

### **3\. Visual Style: Glassmorphism & Solid Colors**

The app will use a combination of solid backgrounds and selective glassmorphism to create depth and focus.

* **Glassmorphism Rules:**  
  * The "frosted glass" effect should ONLY be used for UI elements that **overlay dynamic content** (i.e., the camera view or a photo/video snap).  
  * **Implementation:** The style should be a semi-transparent white background with a prominent background blur effect.  
  * **Use Cases:**  
    * The caption input bar on the snap editing screen.  
    * The drawing/text tool palettes on the snap editing screen.  
    * Confirmation modals (e.g., "Remove Friend?").  
* **Solid Color Rules:**  
  * All primary screens that do not overlay a camera feed or snap (e.g., Message Inbox, Friends List, Profile Page) **must** use a solid `#FFFFFF` background. This ensures maximum performance and text clarity.  
  * Primary action buttons (like "Send") must use a solid accent color (`#00338D`) for a clear call to action.

