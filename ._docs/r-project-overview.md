# **Project Name**

VentureSync

## **Project Description**

VentureSync is a mobile-first, professional social networking platform engineered to revolutionize the hiring, networking, and venture capital landscape. It fundamentally merges the engaging, short-form video discovery feed of TikTok with the direct, streamlined communication of Snapchat. The core purpose is to create a "slop-free" ecosystem where talent acquisition and investment opportunities are based on provable results and visual demonstration ("Show, Don't Tell"), rather than traditional, text-heavy resumes and applications. By creating an intuitive, video-centric, and professional environment, VentureSync aims to connect "Visionaries" (entrepreneurs), "Talent" (skilled professionals), and "Investors" more efficiently and effectively than current platforms like LinkedIn or Indeed.

## **Target Audience**

* **Visionaries:** Entrepreneurs, startup founders, CEOs, CTOs, and team leads who are seeking investment, looking to hire skilled talent, or wishing to showcase their projects and progress. They need a platform to pitch their ideas dynamically and discover talent based on demonstrated skills.  
* **Talent:** Skilled professionals, freelancers, and recent graduates looking for opportunities. This includes developers, engineers, designers, artists, marketers, and more. They need a platform to "audition" themselves by showcasing their projects, portfolios, and capabilities in a visually compelling format, allowing their work to attract employers and collaborators.  
* **Investors:** Angel investors, venture capitalists, and investment firms seeking to discover and fund innovative, up-and-coming ventures. They require a streamlined way to passively or actively discover new startups, watch demos, and initiate direct contact with founders they are genuinely interested in.

## **Desired Features**

### **User Onboarding & Profile Management**

* \[ \] **Account Creation & Login**  
  * \[ \] User can sign up using an email and password.  
  * \[ \] Existing users can log in, which takes them directly to the Home Feed. 
  # \[ \] New Users will also be taken to the home feed apon creation of thier account.

### **User Profile**

* \[ \] **Profile Structure & Content**  
  * \[ \] A user's profile is their resume.  
  * \[ \] **Top Section:**  
    * \[ \] Profile Picture (PFP).  
    * \[ \] Name, Username, User Role (e.g., "Visionary").  
    * \[ \] Short Bio.  
    * \[ \] **Network Metrics:**  
      * \[ \] **Circle:** A list of direct collaborators.  
        * \[ \] **Connection Flow:** Once two users mutually follow each other (are in each other's "Network"), a button to "Invite to Circle" will appear on their respective profiles. The invitation must be accepted by the other party to establish the "Circle" connection.  
      * \[ \] **Network:** A list of all users they are synced with (followers).  
      * \[ \] **Watching:** A list of users they follow who do not follow them back (no number displayed).  
      * \[ \] **Network List Pop-ups:**  
        * \[ \] Tapping on the "Watching", "Network", or "Circle" text labels on a user's profile will open a pop-up window.  
        * \[ \] This window will display a scrollable list of all users within that specific category for the viewed profile.  
        * \[ \] Each item in the list will show the user's profile picture and username.  
        * \[ \] Tapping on any user in this list will navigate to their respective profile page.  
    * \[ \] **Watcher Visualization:** A colored ring around the PFP indicates follower count (e.g., White \<100, Yellow 1k-5k, etc.).  
  * \[ \] **Expandable Details Section:**  
    * \[ \] An interactive dropdown arrow ("v") below the bio.  
    * \[ \] When tapped, this section slides down to cover \~90% of the screen.  
    * \[ \] This view contains scrollable, resume-like information:  
      * \[ \] Important Links (Portfolio, GitHub, Resume).  
      * \[ \] Work Experience & Education.  
      * \[ \] Top Skills & Credentials.  
      * \[ \] **For Investors:** Investment Record/Info.  
      * \[ \] **For Visionaries:** Startup Summary (Executive Summary).  
      * \[ \] Ability to attach a verified CCAT score (future consideration).  
      * \[ \] Allow for hyperlinks for more of the Profile’s user’s work (GitHub, YouTube, Personal Portfolio Website, etc.)  
  * \[ \] **Content Grid:**  
    * \[ \] Below the main info, all of the user's permanent "Posts" are displayed in a grid, similar to Instagram.  
    * \[ \] When a user scrolls down, the user’s info will disappear and the grid becomes fully scrollable. When an item is pressed, the profile becomes its own sort of feed.  
    * \[ \] Users can pin up to 6 posts to the top of their grid.  
    * \[ \] Posts can be sorted by Most Recent, Most Viewed, and Oldest.

### **Core Navigation & Feeds (Swipe-Based)**

* \[ \] **Home Feed (Primary View)**  
  * \[ \] The first screen upon opening the app (for logged-in users).  
  * \[ \] A full-screen, vertical, swipe-up/down video feed (TikTok-style).  
  * \[ \] **Algorithmic Curation:** The feed displays posts from *all* users on the platform, tailored to the viewer's role and interests.  
    * \[ \] e.g., A Visionary seeking a developer will primarily see posts from Talent in the software engineering niche.  
* \[ \] **Messages (Swipe Right from Home Feed)**  
  * \[ \] A dedicated section to view and manage past and pending message threads.  
* \[ \] **Network Page (Swipe Left from Home Feed)**  
  * \[ \] A central hub for content from the user's established network.  
  * \[ \] **Search Bar:** At the top, to find and connect with new users.  
  * \[ \] **"Updates" Section (Stories):**  
    * \[ \] Horizontally scrolling array of PFPs for stories posted in the last 24 hours.  
    * \[ \] Content can be announcements, behind-the-scenes, etc.  
    * \[ \] **Definition:** Updates are ephemeral posts that disappear after 24 hours and do not appear on a user's permanent profile content grid.  
  * \[ \] **"The Latest" Section (Posts):**  
    * \[ \] Horizontally scrolling grid (2x2) of rectangular previews of the latest permanent posts from users in the network; i.e. people they are following, or “watching”.  
  * \[ \] **"Create / Upload" Button:** A prominent button at the bottom.  
* \[ \] **Network Feed (Entered from Network Page)**  
  * \[ \] Tapping an "Update" or "Latest" post opens a TikTok-style feed.  
  * \[ \] **Content Flow:** If an "Update" is clicked, the feed will first cycle through all available "Updates" from the network. Once complete, it will automatically transition into a feed of the "Latest" permanent posts from the network. If a "Latest" post is clicked, it will begin the feed with that post and cycle through other network posts. Basically, it should cycle through the latest posts of people they are “watching”.  
* \[ \] **Your Profile (Swipe Left from Network Page)**  
  * \[ \] The user's own editable profile page.  
* \[ \] **Bookmarks, Analytics, Account Info (Swipe Left from Your Profile)**  
  * \[ \] A page to view bookmarked posts.  
  * \[ \] A section for post analytics (likes, bookmarks, follower growth).  
  * \[ \] A section for account info (email, username, sign out).  
* \[ \] **Bookmarks Page**  
  * \[ \] Displays all bookmarked posts in a grid format (like the profile content grid).  
  * \[ \] Tapping a post opens a feed that cycles only through the user's bookmarked content.

### **Content Creation & Interaction**

* \[ \] **Upload/Create Interface**  
  * \[ \] Accessible from the Network Page.  
  * \[ \] Allows users to record video/take photos directly in-app or upload from their device to create either a permanent "Post" or a 24-hour "Update".  
  * \[ \] Option to add text, captions, and other enhancements.  
  * \[ \] RAG (Retrieval-Augmented Generation) can be used to assist in creating/enhancing post content (e.g., scripts, descriptions).  
* \[ \] **Post Formats**  
  * \[ \] **Videos:**  
    * \[ \] Can be up to 5 minutes in length.  
    * \[ \] Can include an optional external link (e.g., to YouTube for the full video).  
    * \[ \] The link will be displayed and clickable in the bottom-left corner of the screen during playback.  
  * \[ \] **Photos (Carousel Post):**  
    * \[ \] Can include up to 8 photos in a single post.  
    * \[ \] In the feed, the photos will automatically cycle at a rate of 6 seconds per photo. The feed will advance to the next post upon completion.  
    * \[ \] Tapping the screen will pause the automatic cycling.  
    * \[ \] Once paused, a user can use small horizontal swipes to manually navigate forward and backward through the photos.  
    * \[ \] A large vertical swipe (covering \>70% of the screen) will override the photo navigation and move to the next/previous post in the main feed.  
* \[ \] **Post Interaction Buttons (Vertically Stacked on Right Side of Posts)**  
  * \[ \] **Profile Picture:** Tapping it navigates to the poster's profile.  
  * \[ \] **Message User:** Initiates a direct message.  
  * \[ \] **Share:** Allows sharing the post with others.  
  * \[ \] **Bookmark:** Saves the post to the user's private Bookmarks page.  
  * \[ \] **Thumbs Up:** A "like" button. Signals to the algorithm to show more similar content.  
  * \[ \] **Thumbs Down:** A "dislike" button. Signals to the algorithm to show less similar content. This is private and not visible to the poster.  
  * \[ \] **"SLOP" Button:** Flags the content as low-effort, spam, clickbait, or generally poor quality. This heavily penalizes the post in the algorithm and reports it for moderation.  
* \[ \] **Comments**  
  * \[ \] Users can write and view comments on posts.

### **Messaging System**

* \[ \] **Direct Messaging (DM)**  
  * \[ \] Users can initiate 1-on-1 conversations.  
* \[ \] **Vanishing Messages**  
  * \[ \] Messages that are unread/un-actioned will disappear after 30 days to keep inboxes clean.  
* \[ \] **Message Cap System (Monetization)**  
  * \[ \] **Free Tier:** All users receive 10 message credits per week to initiate conversations with *new* users (not already in their network).  
  * \[ \] **Paid Tiers:** Users can purchase higher weekly message caps (e.g., 15, 20, 30).  
* \[ \] **RAG-Assisted Communication**  
  * \[ \] **Data Ingestion:** RAG processes a user's professional documents (resume, cover letters), message history, and profile info to create a personalized communication style vector.  
  * \[ \] **Message Curation (Talent):** When messaging a Visionary, RAG can help draft a personalized outreach message.  
  * \[ \] **Automated Responses (Visionary):** When receiving messages, RAG can suggest three relevant, automated responses to choose from.  
    * \[ \] **User Experience:** Within the message composition box, a small button (e.g., "Suggest Reply") will be available. Tapping this button will generate and display the three suggested responses for the user to select or ignore.  
* \[ \] **In-Chat Management**  
  * \[ \] Under each chat thread, users have options to:  
    * \[ \] **Star:** Mark the conversation as important.  
    * \[ \] **Bin:** Delete the conversation.  
    * \[ \] **Slop:** Report the sender. Multiple reports lead to a ban.

### **Notifications & Lists**

* \[ \] **Notification System**  
  * \[ \] A bell icon will be displayed in the top-left corner of the **Messages** screen and the **Network Page**.  
  * \[ \] The bell icon will feature a circular red banner displaying the count of unread notifications.  
  * \[ \] Tapping the bell icon opens a **Notification Window** which displays a chronological list of recent notifications.  
  * \[ \] **Notification Types:**  
    * \[ \] `[Username]` liked your post.  
    * \[ \] `[Username]` is now watching you.  
    * \[ \] `[Username]` has requested to join your Inner Circle.

### **Moderation & Quality Control**

* \[ \] **Core Philosophy: NO SLOP**  
  * \[ \] The platform is exclusively for professional use (projects, skills, startups). No status updates, humble brags, or personal life posts.  
* \[ \] **User-Driven Moderation**  
  * \[ \] The "SLOP" button is the primary tool for community policing of content quality.  
* \[ \] **Automated Penalties**  
  * \[ \] Content flagged as "Slop" is heavily down-ranked by the algorithm.  
  * \[ \] Users who repeatedly post "slop" or are reported via the message "slop" button will be permanently banned.

### **Business Model**

* \[ \] **No Ads:** The platform will be ad-free.  
* \[ \] **Revenue Streams:**  
  * \[ \] **Content Boosting:** Visionaries and Talent can pay to boost their posts for wider visibility.  
  * \[ \] **Message Credits:** Users can pay for additional weekly message credits to initiate new conversations.  
  * \[ \] **Priority Messaging:** Investors and Visionaries can pay for "Top Priority" placement, ensuring their messages appear at the top of a recipient's inbox.

## **Design Requests**

* \[ \] **Aesthetic:** A clean, modern, intuitive UI that feels professional yet engaging and dynamic. Avoid the sterile, corporate feel of LinkedIn.  
* \[ \] **User Experience (UX):** The experience should be immersive and mobile-first, heavily reliant on a fluid, swipe-based navigation system as outlined in the user flow diagram.  
* \[ \] **Inspiration:** The core navigation and feed consumption should feel like TikTok, while the page structure (Feed \-\> Messages \-\> Profile) should draw inspiration from Snapchat and Instagram.

## **Other Notes**

* **Core Principle \- Quality over Quantity:** The platform should not incentivize users to produce a high volume of low-quality posts. The goal is for users to create a few excellent posts that effectively showcase their value.  
* **Core Principle \- Show, Don't Tell:** The platform's value is in allowing users to demonstrate their capabilities through video and projects, not just describe them.  
* **Key Technical Challenge:** The recommendation algorithm is the most critical component for success. It must intelligently synthesize multiple signals (user roles, keywords, interests, likes, dislikes, "slop" flags) to deliver a highly relevant and valuable feed for each user type.  
* **Future Considerations:**  
  * \[ \] Integration of a verified Cognitive Cognitive Aptitude Test (CCAT) score on profiles.  
  * \[ \] An ID verification system to enhance user legitimacy and trust.  
  * \[ \] Automated profile population by importing data from platforms like LinkedIn or Indeed.

## **Tech Stack**

* **Frontend Framework:** React Native with Expo  
* **Build Tool:** Expo for React Native  
* **Styling:** NativeWind/Tailwind CSS  
* **State Management:** Zustand  
* **Real-time Backend:** Firebase  
  * **Authentication:** Firebase Auth  
  * **Database:** Firestore  
  * **Serverless Functions:** Cloud Functions (for RAG processing)  
  * **Storage:** Firebase Storage  
  * **Hosting:** Firebase Hosting

