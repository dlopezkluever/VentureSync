import { useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FeedScreen from "../../screens/feed";
import ProfileScreen from "../../screens/profile";
import { CurrentUserProfileItemInViewContext } from "../../contexts/feed-context";

export type FeedStackParamList = {
  feedList: {
    creator: string;
    profile: boolean;
  };
  feedProfile: { initialUserId: string };
};

const { Screen, Navigator } =
  createMaterialTopTabNavigator<FeedStackParamList>();

const FeedNavigation = () => {
  const [currentUserProfileItemInView, setCurrentUserProfileItemInView] =
    useState<string | null>(null);

  return (
    <CurrentUserProfileItemInViewContext.Provider
      value={{
        currentUserProfileItemInView,
        setCurrentUserProfileItemInView,
      }}
    >
      <Navigator initialRouteName="feedList" tabBar={() => <></>}>
        <Screen
          name="feedList"
          component={FeedScreen}
          initialParams={{ profile: false }}
        />
        <Screen
          name="feedProfile"
          component={ProfileScreen}
          initialParams={{ initialUserId: "" }}
        />
      </Navigator>
    </CurrentUserProfileItemInViewContext.Provider>
  );
};

export default FeedNavigation;
