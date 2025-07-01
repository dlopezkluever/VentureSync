# Firebase Configuration Requirements for VentureSync Messaging

## Required Firestore Security Rules

The following security rules need to be added to your Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Existing user rules...
    
    // Chat Security Rules
    match /chats/{chatId} {
      allow read, write: if request.auth != null && 
        request.auth.uid in resource.data.members;
      allow create: if request.auth != null && 
        request.auth.uid in request.resource.data.members;
      
      // Messages subcollection
      match /messages/{messageId} {
        allow read, write: if request.auth != null && 
          request.auth.uid in get(/databases/$(database)/documents/chats/$(chatId)).data.members;
        allow create: if request.auth != null && 
          request.auth.uid in get(/databases/$(database)/documents/chats/$(chatId)).data.members &&
          request.auth.uid == request.resource.data.creator;
      }
    }
  }
}
```

## Required Firebase Storage Security Rules

The following security rules need to be added to your Firebase Storage:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Direct Messages Media Upload Rules
    match /direct_messages/{chatId}/{fileName} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        request.auth.uid in firestore.get(/databases/(default)/documents/chats/$(chatId)).data.members;
    }
  }
}
```

## Required Firestore Composite Indexes

The following composite indexes need to be created in the Firestore console:

### 1. Chats Collection Index
- **Collection**: `chats`
- **Fields**: 
  - `members` (Array)
  - `lastUpdate` (Descending)
- **Query Scope**: Collection

### 2. Messages Subcollection Index
- **Collection**: `chats/{chatId}/messages`
- **Fields**:
  - `creation` (Descending)
- **Query Scope**: Collection group

## How to Apply These Rules

### Firestore Security Rules:
1. Go to Firebase Console → Project Settings → Firestore → Rules
2. Add the chat and messages rules to your existing rules
3. Click "Publish"

### Storage Security Rules:
1. Go to Firebase Console → Project Settings → Storage → Rules
2. Add the direct_messages rules to your existing rules
3. Click "Publish"

### Firestore Indexes:
1. Go to Firebase Console → Project Settings → Firestore → Indexes
2. Click "Add Index"
3. Create the indexes as specified above
4. Wait for the indexes to build (this may take a few minutes)

## Alternative: Automatic Index Creation

The indexes will also be automatically suggested by Firebase when you first run queries that require them. You can accept the suggested indexes when they appear in the Firebase Console.

## Testing Security Rules

After applying the rules, test the following scenarios:
1. ✅ Users can only read/write chats they are members of
2. ✅ Users can only create messages in chats they belong to
3. ✅ Users can only upload media to chats they are members of
4. ❌ Users cannot access chats they are not members of
5. ❌ Unauthenticated users cannot access any chat data 