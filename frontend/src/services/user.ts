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
 * fetches the doc corresponding to the id of a user.
 *
 * @param {String} id of the user we want to fetch
 * @returns {Promise<User>} user object if successful.
 */
export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const docSnapshot = await getDoc(doc(FIREBASE_DB, "user", id));
    if (docSnapshot.exists()) {
      return docSnapshot.data() as User;
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
