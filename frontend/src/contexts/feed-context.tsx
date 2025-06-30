import { Dispatch, SetStateAction, createContext } from "react";

interface CurrentUserProfileItemInViewContextType {
  currentUserProfileItemInView: string | null;
  setCurrentUserProfileItemInView: Dispatch<SetStateAction<string | null>>;
}

export const CurrentUserProfileItemInViewContext =
  createContext<CurrentUserProfileItemInViewContextType>({
    currentUserProfileItemInView: null,
    setCurrentUserProfileItemInView: () => {},
  }); 