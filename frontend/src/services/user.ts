import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebaseConfig";
import { updateProfile } from "firebase/auth";
import {
  getFirestore,
  doc,
  updateDoc,
  query,
  collection,
  where,
  getDocs,
  getDoc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { saveMediaToStorage } from "./utils";
import { SearchUser, User, WorkExperience, Education } from "../../types";

export const saveUserProfileImage = (image: string) =>
  new Promise<void>(async (resolve, reject) => {
    try {
      if (FIREBASE_AUTH.currentUser) {
        const downloadURL = await saveMediaToStorage(
          image,
          `profileImage/${FIREBASE_AUTH.currentUser.uid}`,
        );

        const db = getFirestore();
        const userDoc = doc(db, "user", FIREBASE_AUTH.currentUser.uid);

        await updateDoc(userDoc, {
          photoURL: downloadURL,
        });

        // Also update the user profile in Firebase Auth if needed
        await updateProfile(FIREBASE_AUTH.currentUser, {
          photoURL: downloadURL,
        });

        resolve();
      }
    } catch (error) {
      console.error("Failed to save user profile image: ", error);
      reject(error);
    }
  });

export const saveUserField = (field: string, value: string) =>
  new Promise<void>(async (resolve, reject) => {
    try {
      if (FIREBASE_AUTH.currentUser) {
        const userDoc = doc(FIREBASE_DB, "user", FIREBASE_AUTH.currentUser.uid);

        let obj: { [key: string]: string } = {};
        obj[field] = value;

        await updateDoc(userDoc, obj);
        resolve();
      }
    } catch (error) {
      console.error("Failed to save user field: ", error);
      reject(error);
    }
  });

export const queryUsersByEmail = (email: string): Promise<SearchUser[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      if (email === "") {
        resolve([]);
        return;
      }

      const q = query(
        collection(FIREBASE_DB, "user"),
        where("email", ">=", email),
        where("email", "<=", email + "\uf8ff"),
      );

      const querySnapshot = await getDocs(q);
      const users = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data } as SearchUser;
      });

      resolve(users);
    } catch (error) {
      console.error("Failed to query users: ", error);
      reject(error);
    }
  });
};

/**
 * Searches users by displayName or email with real-time query functionality
 * @param searchText - The text to search for in displayName or email
 * @returns Promise<SearchUser[]> - Array of matching users
 */
export const searchUsers = (searchText: string): Promise<SearchUser[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      if (searchText.trim() === "") {
        resolve([]);
        return;
      }

      const searchTerm = searchText.toLowerCase().trim();
      
      // Get all users and filter client-side for now
      // Note: Firestore doesn't support full-text search, so we'll do client-side filtering
      // For production, consider using Algolia or similar service for better search
      const usersQuery = query(collection(FIREBASE_DB, "user"));
      const querySnapshot = await getDocs(usersQuery);
      
      const allUsers = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data } as SearchUser;
      });

      // Filter users based on displayName or email containing the search term
      const filteredUsers = allUsers.filter((user) => {
        const displayName = (user.displayName || "").toLowerCase();
        const email = (user.email || "").toLowerCase();
        return displayName.includes(searchTerm) || email.includes(searchTerm);
      });

      resolve(filteredUsers);
    } catch (error) {
      console.error("Failed to search users: ", error);
      reject(error);
    }
  });
};

/**
 * fetches the doc corresponding to the id of a user.
 *
 * @param {String} id of the user we want to fetch
 * @returns {Promise<User>} user object if successful.
 */
export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const docSnapshot = await getDoc(doc(FIREBASE_DB, "user", id));
    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      return { uid: id, ...userData } as User;
    } else {
      return null;
    }
  } catch (error) {
    throw new Error(String(error));
  }
};

/**
 * Checks if a user is following another by seeing if a follow doc exists.
 *
 * @param {String} userId of the user we want to see if it's following another
 * @param {String} otherUserId the id of the user that we want to check if it's being followed by another.
 * @returns {Boolean} if true means the user is indeed following the other User
 */
export const getIsFollowing = async (userId: string, otherUserId: string) => {
  const userDocRef = doc(FIREBASE_DB, "user", userId, "following", otherUserId);

  try {
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking following status: ", error);
    return false;
  }
};

/**
 * Changes the follow state of two users depending on the current
 * follow state.
 *
 * @param {Object} props object containing the relevant info
 * @param {Boolean} isFollowing current follow state
 * @param {String} otherUserId the id of the user that we want to check if it's being followed by another.
 * @returns
 */
export const changeFollowState = async ({
  otherUserId,
  isFollowing,
}: {
  otherUserId: string;
  isFollowing: boolean;
}) => {
  const currentUserUid = FIREBASE_AUTH.currentUser
    ? FIREBASE_AUTH.currentUser.uid
    : null;

  if (!currentUserUid) {
    console.error("No current user");
    return false;
  }

  const followingDocRef = doc(
    FIREBASE_DB,
    "user",
    currentUserUid,
    "following",
    otherUserId,
  );

  try {
    if (isFollowing) {
      await deleteDoc(followingDocRef);
      return true;
    } else {
      await setDoc(followingDocRef, {});
      return true;
    }
  } catch (error) {
    console.error("Error changing follow state: ", error);
    return false;
  }
};

/**
 * Creates a new VentureSync user profile in Firestore with professional fields
 * @param userData - The user data to create
 * @returns Promise<void>
 */
export const createVentureSyncUserProfile = (userData: {
  uid: string;
  email: string;
  displayName: string;
  designation: "Investor" | "Visionary" | "Talent";
  specialty: string;
  bio?: string;
}) => 
  new Promise<void>(async (resolve, reject) => {
    try {
      const userDoc = doc(FIREBASE_DB, "user", userData.uid);
      
      const defaultUserProfile: Omit<User, 'uid'> = {
        email: userData.email,
        displayName: userData.displayName,
        photoURL: "",
        designation: userData.designation,
        specialty: userData.specialty,
        bio: userData.bio || "",
        workExperience: [],
        education: [],
        topSkills: [],
        externalURLs: [],
        circleCount: 0,
        networkCount: 0,
        watchingCount: 0,
        // Legacy fields for backward compatibility
        followingCount: 0,
        followersCount: 0,
        likesCount: 0,
      };

      await setDoc(userDoc, defaultUserProfile);
      resolve();
    } catch (error) {
      console.error("Failed to create VentureSync user profile: ", error);
      reject(error);
    }
  });

/**
 * Updates user profile with VentureSync professional fields
 * @param profileData - Object containing the fields to update
 * @returns Promise<void>
 */
export const updateUserProfile = (profileData: {
  designation?: "Investor" | "Visionary" | "Talent";
  specialty?: string;
  bio?: string;
  workExperience?: WorkExperience[];
  education?: Education[];
  topSkills?: string[];
  externalURLs?: string[];
}) =>
  new Promise<void>(async (resolve, reject) => {
    try {
      if (FIREBASE_AUTH.currentUser) {
        const userDoc = doc(FIREBASE_DB, "user", FIREBASE_AUTH.currentUser.uid);
        await updateDoc(userDoc, profileData);
        resolve();
      }
    } catch (error) {
      console.error("Failed to update user profile: ", error);
      reject(error);
    }
  });

/**
 * Checks if the current user is watching another user
 * @param watchedUserId - The ID of the user being watched
 * @returns Promise<boolean> - True if watching, false otherwise
 */
export const getIsWatching = async (watchedUserId: string): Promise<boolean> => {
  try {
    const currentUserId = FIREBASE_AUTH.currentUser?.uid;
    if (!currentUserId) return false;

    const watchDocRef = doc(
      FIREBASE_DB,
      "user",
      currentUserId,
      "watching",
      watchedUserId
    );

    const docSnap = await getDoc(watchDocRef);
    return docSnap.exists();
  } catch (error) {
    console.error("Error checking watching status: ", error);
    return false;
  }
};

/**
 * Toggles the watch state between the current user and another user
 * @param watchedUserId - The ID of the user to watch/unwatch
 * @param isCurrentlyWatching - Current watching state
 * @returns Promise<boolean> - True if operation successful, false otherwise
 */
export const toggleWatchState = async (
  watchedUserId: string,
  isCurrentlyWatching: boolean
): Promise<boolean> => {
  try {
    const currentUserId = FIREBASE_AUTH.currentUser?.uid;
    if (!currentUserId) {
      console.error("No current user");
      return false;
    }

    const watchDocRef = doc(
      FIREBASE_DB,
      "user",
      currentUserId,
      "watching",
      watchedUserId
    );

    if (isCurrentlyWatching) {
      // Unwatch: remove the document
      await deleteDoc(watchDocRef);
    } else {
      // Watch: create the document with timestamp
      await setDoc(watchDocRef, {
        watchedAt: new Date().toISOString(),
        watchedUserId: watchedUserId,
      });
    }

    return true;
  } catch (error) {
    console.error("Error toggling watch state: ", error);
    return false;
  }
};

/**
 * Gets the list of users that the current user is watching
 * @returns Promise<SearchUser[]> - Array of users being watched
 */
export const getWatchingUsers = async (): Promise<SearchUser[]> => {
  try {
    const currentUserId = FIREBASE_AUTH.currentUser?.uid;
    if (!currentUserId) return [];

    // Get all watching documents
    const watchingQuery = query(
      collection(FIREBASE_DB, "user", currentUserId, "watching")
    );
    const watchingSnapshot = await getDocs(watchingQuery);

    // Extract watched user IDs
    const watchedUserIds = watchingSnapshot.docs.map((doc) => doc.id);

    if (watchedUserIds.length === 0) return [];

    // Get user details for each watched user
    const watchedUsers: SearchUser[] = [];
    for (const userId of watchedUserIds) {
      const userDoc = await getDoc(doc(FIREBASE_DB, "user", userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        watchedUsers.push({ id: userId, ...userData } as SearchUser);
      }
    }

    return watchedUsers;
  } catch (error) {
    console.error("Error getting watching users: ", error);
    return [];
  }
};
