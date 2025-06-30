# Firebase Database Structure for SnapConnect

## Firestore Collections

### **users** Collection
```javascript
users/{userId} {
  uid: string,
  email: string,
  username: string (unique),
  displayName: string,
  bio: string,
  profilePictureUrl: string,
  createdAt: timestamp,
  lastSeen: timestamp,
  friends: array<userId>, // Friend user IDs
  friendRequests: {
    sent: array<userId>,
    received: array<userId>
  }
}
```

### **stories** Collection
```javascript
stories/{storyId} {
  userId: string, // Story creator
  mediaUrl: string, // Firebase Storage URL
  mediaType: 'photo' | 'video',
  caption: string,
  createdAt: timestamp,
  expiresAt: timestamp, // 24 hours from creation
  viewedBy: array<userId> // Users who viewed this story
}
```

### **chats** Collection
```javascript
chats/{chatId} {
  participants: array<userId>, // For 1-on-1: [userId1, userId2]
  lastMessage: {
    text: string,
    senderId: string,
    timestamp: timestamp,
    type: 'text' | 'snap_photo' | 'snap_video'
  },
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### **messages** Subcollection
```javascript
chats/{chatId}/messages/{messageId} {
  senderId: string,
  text: string,
  mediaUrl: string, // If snap
  mediaType: 'photo' | 'video' | null,
  timestamp: timestamp,
  isEphemeral: boolean,
  viewedBy: array<userId>,
  savedBy: array<userId>,
  replayedBy: array<userId>, // Max 1 entry per user
  expiresAt: timestamp // For ephemeral messages
}
```

### **friendships** Collection
```javascript
friendships/{friendshipId} {
  user1: string,
  user2: string,
  status: 'pending' | 'accepted',
  createdAt: timestamp,
  acceptedAt: timestamp
}
```

## Realtime Database Structure (for real-time features)

### **presence** 
```javascript
presence/{userId} {
  online: boolean,
  lastSeen: timestamp,
  typing: {
    chatId: string,
    isTyping: boolean
  }
}
```

### **story_views** (for real-time story view tracking)
```javascript
story_views/{storyId} {
  viewCount: number,
  viewers: {
    userId1: timestamp,
    userId2: timestamp
  }
}
```

## Firebase Storage Structure

### **Profile Pictures**
```
users/{userId}/profile.jpg
```

### **Story Media**
```
stories/{userId}/{storyId}.jpg
stories/{userId}/{storyId}.mp4
```

### **Chat Media (Ephemeral)**
```
chats/{chatId}/snaps/{messageId}.jpg
chats/{chatId}/snaps/{messageId}.mp4
```

### **Saved Chat Media**
```
chats/{chatId}/saved/{messageId}.jpg
chats/{chatId}/saved/{messageId}.mp4
``` 