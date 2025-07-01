\# Project & Codebase Rules

This document outlines the global rules, conventions, and architectural standards for the \*\*VentureSync\*\* project. We are building codebase into a professional networking platform. The primary goal is to create an \*\*AI-first codebase\*\*: one that is modular, scalable, highly navigable, and easy for both human developers and modern AI tools to understand and modify. Adherence to these rules is mandatory.

\---

## \*\*Project Overview & Development Strategy\*\*

\*\*Current State:\*\* We have inherited a functional TikTok clone built with React Native + Expo + Firebase. We are systematically converting it into VentureSync, a professional networking platform.

\*\*Development Approach:\*\*
1. \*\*Phase 1 (Current):\*\* Get the frontend working with VentureSync features, using direct Firestore queries
2. \*\*Phase 2 (Future):\*\* Rebuild Firebase Cloud Functions with proper VentureSync data models
3. \*\*Phase 3 (Future):\*\* Add advanced features (RAG messaging, AI recommendations, etc.)

\---

### \*\*1. General Principles\*\*

\-   \*\*Modularity:\*\* Code must be organized into small, single-responsibility modules (components, functions, hooks). This enhances reusability and makes the code easier to test and reason about.  
\-   \*\*Readability:\*\* Code should be self-documenting where possible, with clear naming and logical flow. Complex sections must be accompanied by comments.  
\-   \*\*File Size Limit:\*\* To maximize compatibility with AI tools and encourage modularity, no single file should exceed \*\*500 lines of code\*\*. If a file is approaching this limit, it is a strong indicator that it needs to be refactored into smaller modules.
\-   \*\*Backend-First Debugging:\*\* When encountering issues, always investigate backend data integrity and structure before examining frontend code.

\---

### \*\*2. Current Tech Stack\*\*

\*\*Frontend:\*\*
- \*\*React Native\*\* v0.72.4 + \*\*Expo SDK\*\* v49
- \*\*TypeScript\*\* throughout (all files use .tsx/.ts extensions)
- \*\*Redux Toolkit\*\* + \*\*React Query\*\* for state management
- \*\*React Navigation v6\*\* for screen navigation
- \*\*React Native Paper\*\* for UI components
- \*\*NativeWind/Tailwind\*\* for styling (when applicable)

\*\*Backend:\*\*
- \*\*Firebase Authentication\*\* v10.3.0
- \*\*Firestore Database\*\* (NoSQL document database)
- \*\*Firebase Storage\*\* (file/media storage)
- \*\*Firebase Cloud Functions\*\* (Node.js 22, TypeScript) - \*Currently non-functional, needs rebuild\*

\*\*Development Environment:\*\*
- \*\*Node.js\*\* v22.16.0
- \*\*Firebase CLI\*\* v14.8.0
- \*\*Android Studio\*\* + \*\*Pixel_7 Emulator\*\*

\---

### \*\*3. Current Directory Structure\*\*

Our project follows the existing TikTok clone structure, which we're gradually converting:

```
/
├── backend/                    # Firebase backend configuration
│   ├── functions/             # Cloud Functions (needs rebuild for VentureSync)
│   ├── firebase.json          # Firebase deployment config
│   └── .firebaserc           # Firebase project config
├── frontend/                  # React Native + Expo application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── screens/          # Screen-level components
│   │   │   ├── auth/         # Authentication screens
│   │   │   ├── feed/         # Main feed screens
│   │   │   ├── profile/      # User profile screens
│   │   │   ├── messages/     # Direct messaging screens
│   │   │   └── camera/       # Content creation screens
│   │   ├── navigation/       # React Navigation configuration
│   │   │   ├── main/         # Main navigation stack
│   │   │   └── feed/         # Feed-specific navigation
│   │   ├── redux/           # Redux Toolkit state management
│   │   │   ├── store.ts     # Redux store configuration
│   │   │   └── slices/      # Redux slices
│   │   └── utils/           # Utility functions
│   ├── types/               # TypeScript type definitions
│   ├── firebaseConfig.ts    # Firebase client configuration
│   ├── App.tsx             # Root component
│   └── package.json        # Dependencies and scripts
├── quotes.csv              # Motivational quotes data
└── ._docs/                 # Project documentation
    ├── project-rules-02.md # This file
    └── other-docs.md       # Additional documentation
```

\---

### \*\*4. File Naming Conventions\*\*

Consistent naming is critical for codebase navigability.

\-   \*\*React Components:\*\* \`PascalCase.tsx\` (e.g., \`PostCard.tsx\`, \`UserProfileHeader.tsx\`).  
\-   \*\*Screen Components:\*\* \`index.tsx\` within feature directories (e.g., \`screens/auth/index.tsx\`).  
\-   \*\*React Hooks:\*\* \`useCamelCase.ts\` (e.g., \`useAuth.ts\`, \`useUserFeed.ts\`).  
\-   \*\*Redux Slices:\*\* \`camelCaseSlice.ts\` (e.g., \`authSlice.ts\`, \`feedSlice.ts\`).  
\-   \*\*Type Definitions:\*\* \`index.ts\` in \`/types\` directory.  
\-   \*\*Firebase Config:\*\* \`firebaseConfig.ts\`.  
\-   \*\*Utility Files:\*\* \`camelCaseUtils.ts\` (e.g., \`dateUtils.ts\`, \`validationUtils.ts\`).  
\-   \*\*Documentation:\*\* \`kebab-case.md\` (e.g., \`project-rules-02.md\`, \`user-flow.md\`).

\---

### \*\*5. Code & Function Documentation Standards\*\*

Every file and function must be documented to explain its purpose. We use \*\*TSDoc\*\* for all TypeScript files.

\-   \*\*File Header Comment:\*\* Every \`.tsx/.ts\` file must begin with a block comment explaining its purpose.  
    \`\`\`typescript  
    /**  
     \* @file HomeFeedScreen.tsx  
     \* @description This file defines the main discovery feed screen for VentureSync,  
     \* displaying a professional networking feed with role-based content filtering.  
     \*/  
    \`\`\`

\-   \*\*Function Documentation:\*\* All functions, especially React components, must have a TSDoc block describing their purpose, parameters, and return values.  
    \`\`\`typescript  
    /**  
     \* A reusable component to display a professional post in the VentureSync feed.  
     \* @param props - The component props  
     \* @param props.post - The post data object containing professional content  
     \* @param props.post.content - The main content of the post  
     \* @param props.post.author - The author's professional profile data  
     \* @param props.onOpenProfile - Callback function when author profile is tapped  
     \* @returns The rendered professional post card component  
     \*/  
    const ProfessionalPostCard = ({ post, onOpenProfile }: Props): React.ReactElement => {  
      // ... component logic  
    };  
    \`\`\`

\-   \*\*Inline Comments:\*\* Use inline \`//\` comments to explain complex, tricky, or business logic specific to VentureSync.

\---

### \*\*6. VentureSync-Specific Development Rules\*\*

\*\*Data Model Conversion:\*\*
- \*\*Current (TikTok Clone):\*\* \`user\`, \`post\`, \`likes\`, \`comments\`, \`following\`
- \*\*Target (VentureSync):\*\* \`users\`, \`posts\`, \`updates\`, \`networks\`, \`circles\`, \`bookmarks\`, \`messages\`

\*\*User Roles & Professional Context:\*\*
- All user-facing features must account for the three user roles: \*\*Visionary\*\*, \*\*Talent\*\*, \*\*Investor\*\*
- Content and interactions should be professional in nature
- Maintain role-specific UI patterns and messaging

\*\*Firebase Configuration:\*\*
- \*\*Current Status:\*\* Authentication ✅, Firestore ✅, Storage ✅, Functions ❌
- \*\*Immediate Goal:\*\* Get frontend working with direct Firestore queries
- \*\*Future Goal:\*\* Rebuild Cloud Functions with VentureSync data models

\---

### \*\*7. Development Workflow\*\*

\*\*Current Phase - Frontend Focus:\*\*
1. Fix immediate issues (AsyncStorage, dependency versions)
2. Convert Snapchat clone screens to VentureSync equivalents
3. Implement VentureSync onboarding flow
4. Update navigation for professional networking context
5. Test core user journeys without Cloud Functions

\*\*Phase 2 - Backend Rebuild:\*\*
1. Design proper VentureSync data models
2. Rewrite Cloud Functions for professional networking features
3. Implement message caps and premium features
4. Add advanced networking algorithms

\*\*Testing Strategy:\*\*
- \*\*Manual Testing:\*\* Use Android emulator (Pixel_7) with Expo Go
- \*\*Focus Areas:\*\* Authentication flow, navigation, core user interactions
- \*\*Firebase Rules:\*\* Use test mode for development, implement proper security rules before production

\---

### \*\*8. Git & Version Control\*\*

\*\*Current Status:\*\* Fresh repository (git history removed)

\*\*Branching Strategy:\*\*
- \*\*`main`:\*\* Production-ready, stable code
- \*\*`develop`:\*\* Primary development branch where features are merged
- \*\*`feat/<feature-name>`:\*\* Branches for new features (e.g., \`feat/venturesync-onboarding\`)
- \*\*`fix/<bug-name>`:\*\* Branches for bug fixes (e.g., \`fix/asyncstorage-persistence\`)

\*\*Commit Messages:\*\* Follow \*\*Conventional Commits\*\* specification:
- \*\*`feat:`:\*\* (A new feature)
- \*\*`fix:`:\*\* (A bug fix) 
- \*\*`docs:`:\*\* (Changes to documentation)
- \*\*`refactor:`:\*\* (Code changes that neither fix bugs nor add features)
- \*\*`chore:`:\*\* (Maintenance tasks, dependency updates)
\*\*Examples:\*\* 
  - \*\*`feat: add VentureSync user role selection screen`\*\*
  - \*\*`fix: resolve Firebase Auth AsyncStorage persistence issue`\*\*
  - \*\*`refactor: convert TikTok feed components to professional posts`\*\*

\---

### \*\*9. Priority Order for VentureSync Conversion\*\*

\*\*Immediate (Next 15 Hours):\*\*
1. ✅ Fix AsyncStorage authentication persistence
2. ✅ Resolve dependency version mismatches  
3. ✅ Implement VentureSync onboarding flow
4. ✅ Convert navigation for professional context
5. ✅ Create basic user profile structure

\*\*Short-term (1-2 weeks):\*\*
1. Convert feed components to professional networking context
2. Implement role-based content filtering
3. Add professional messaging features
4. Create network/connection management
5. Add content creation for professional posts

\*\*Long-term (1+ months):\*\*
1. Rebuild Firebase Cloud Functions for VentureSync
2. Implement RAG-assisted communication
3. Add advanced networking features
4. Implement premium tier restrictions
5. Add AI-powered recommendations

\---

### \*\*10. Code Quality & AI Compatibility\*\*

\*\*TypeScript Standards:\*\*
- Use strict TypeScript configuration
- Define interfaces for all data structures
- Prefer type safety over \`any\` types
- Use proper generic types for reusable components

\*\*Component Architecture:\*\*
- Favor functional components over class components
- Use custom hooks for stateful logic
- Keep components focused on single responsibilities
- Extract complex logic into separate utility functions

\*\*State Management:\*\*
- Use Redux Toolkit for global state
- Use React Query for server state and caching
- Prefer local state (\`useState\`) for component-specific state
- Document state structure and update patterns

This document serves as our living guide for converting the boilerplate into a professional networking platform while maintaining code quality and AI-tool compatibility.
