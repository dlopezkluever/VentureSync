import {
  DocumentData,
  QuerySnapshot,
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FIREBASE_AUTH, FIREBASE_DB, FIREBASE_STORAGE } from "../../firebaseConfig";

export const chatsListener = (
  listener: (snapshot: QuerySnapshot<DocumentData>) => void,
) => {
  if (FIREBASE_AUTH.currentUser === null) {
    return;
  }

  const chatsQuery = query(
    collection(FIREBASE_DB, "chats"),
    where("members", "array-contains", FIREBASE_AUTH.currentUser.uid),
    orderBy("lastUpdate", "desc"),
  );

  const unsubscribe = onSnapshot(chatsQuery, listener);

  return unsubscribe;
};

export const messagesListener = (
  listener: (snapshot: QuerySnapshot<DocumentData>) => void,
  chatId: string,
) => {
  const messagesQuery = query(
    collection(doc(collection(FIREBASE_DB, "chats"), chatId), "messages"),
    orderBy("creation", "desc"),
  );

  const unsubscribe = onSnapshot(messagesQuery, listener);

  return unsubscribe;
};

export const sendMessage = async (chatId: string, message: string) => {
  if (FIREBASE_AUTH.currentUser === null) {
    return;
  }

  const messagesCollection = collection(
    doc(collection(FIREBASE_DB, "chats"), chatId),
    "messages",
  );
  await addDoc(messagesCollection, {
    creator: FIREBASE_AUTH.currentUser.uid,
    message,
    creation: serverTimestamp(),
  });

  const chatDocRef = doc(collection(FIREBASE_DB, "chats"), chatId);
  await updateDoc(chatDocRef, {
    lastUpdate: serverTimestamp(),
    lastMessage: message,
  });
};

export const sendMediaMessage = async (chatId: string, mediaUri: string, mediaType: string) => {
  try {
    if (FIREBASE_AUTH.currentUser === null) {
      throw new Error("User is not authenticated");
    }

    // Create a unique filename for the media
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const storageRef = ref(FIREBASE_STORAGE, `direct_messages/${chatId}/${fileName}`);

    // Convert URI to blob for upload
    const response = await fetch(mediaUri);
    const blob = await response.blob();

    // Upload file to Firebase Storage
    const snapshot = await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(snapshot.ref);

    // Send message with media URL
    const messagesCollection = collection(
      doc(collection(FIREBASE_DB, "chats"), chatId),
      "messages",
    );
    
    await addDoc(messagesCollection, {
      creator: FIREBASE_AUTH.currentUser.uid,
      message: downloadURL,
      mediaType: mediaType,
      isMedia: true,
      creation: serverTimestamp(),
    });

    // Update chat with last message info
    const chatDocRef = doc(collection(FIREBASE_DB, "chats"), chatId);
    await updateDoc(chatDocRef, {
      lastUpdate: serverTimestamp(),
      lastMessage: mediaType === 'video' ? '📹 Video' : '📷 Photo',
    });

    return downloadURL;
  } catch (error) {
    console.error("Error sending media message: ", error);
    throw error;
  }
};

export const createChat = async (contactId: string) => {
  try {
    if (FIREBASE_AUTH.currentUser === null) {
      throw new Error("User is not authenticated");
    }

    const chatDocRef = await addDoc(collection(FIREBASE_DB, "chats"), {
      lastUpdate: serverTimestamp(),
      lastMessage: "Send a first message",
      members: [contactId, FIREBASE_AUTH.currentUser.uid],
    });

    return chatDocRef;
  } catch (error) {
    console.error("Error creating chat: ", error);
    throw error;
  }
};
