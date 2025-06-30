# Firebase Security Rules for SnapConnect

## Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Stories are readable by friends, writable by owner
    match /stories/{storyId} {
      allow read: if request.auth != null && 
        (resource.data.userId == request.auth.uid || 
         request.auth.uid in get(/databases/$(database)/documents/users/$(resource.data.userId)).data.friends);
      allow write: if request.auth != null && resource.data.userId == request.auth.uid;
    }
    
    // Chats are accessible by participants only
    match /chats/{chatId} {
      allow read, write: if request.auth != null && 
        request.auth.uid in resource.data.participants;
        
      // Messages within chats
      match /messages/{messageId} {
        allow read, write: if request.auth != null && 
          request.auth.uid in get(/databases/$(database)/documents/chats/$(chatId)).data.participants;
      }
    }
    
    // Friendships can be read by either user involved
    match /friendships/{friendshipId} {
      allow read: if request.auth != null && 
        (request.auth.uid == resource.data.user1 || request.auth.uid == resource.data.user2);
      allow write: if request.auth != null && 
        (request.auth.uid == resource.data.user1 || request.auth.uid == resource.data.user2);
    }
  }
}
```

## Firebase Storage Security Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // User profile pictures
    match /users/{userId}/profile.jpg {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Story media - readable by friends
    match /stories/{userId}/{storyId}.{extension} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Chat media - accessible by chat participants
    match /chats/{chatId}/{type}/{messageId}.{extension} {
      allow read, write: if request.auth != null;
      // TODO: Add check for chat participants when we implement chat creation
    }
  }
}
```

## Realtime Database Security Rules

```javascript
{
  "rules": {
    "presence": {
      "$userId": {
        ".read": true,
        ".write": "$userId === auth.uid"
      }
    },
    "story_views": {
      "$storyId": {
        ".read": true,
        ".write": "auth != null"
      }
    }
  }
}
``` 