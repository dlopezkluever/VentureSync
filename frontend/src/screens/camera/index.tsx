import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import {
  CameraView,
  CameraType,
  FlashMode,
  useCameraPermissions,
  useMicrophonePermissions,
  Camera,
} from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import Constants from "expo-constants";
import * as VideoThumbnails from "expo-video-thumbnails";
import { useIsFocused } from "@react-navigation/core";
import { Feather } from "@expo/vector-icons";

import styles from "./styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/main";

/**
 * Function that renders a component responsible showing
 * a view with the camera preview, recording videos, controling the camera and
 * letting the user pick a video from the gallery
 * @returns Functional Component
 */
export default function CameraScreen() {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [microphonePermission, requestMicrophonePermission] = useMicrophonePermissions();
  const [hasCameraPermissions, setHasCameraPermissions] = useState(false);
  const [hasGalleryPermissions, setHasGalleryPermissions] = useState(false);

  const [galleryItems, setGalleryItems] = useState<MediaLibrary.Asset[]>([]);

  const cameraRef = useRef<CameraView>(null);
  const [cameraType, setCameraType] = useState<CameraType>('back');
  const [cameraFlash, setCameraFlash] = useState<FlashMode>('off');

  const [isCameraReady, setIsCameraReady] = useState(false);
  const isFocused = useIsFocused();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const requestAllPermissions = async () => {
      try {
        // 1. Camera permissions first
        const cameraResult = await Camera.requestCameraPermissionsAsync();
        console.log("📸 Camera permission:", cameraResult);
        
        // 2. Microphone permissions
        const micResult = await Camera.requestMicrophonePermissionsAsync();
        console.log("🎤 Microphone permission:", micResult);
        
        // 3. Set camera permissions
        setHasCameraPermissions(cameraResult.status === "granted");
        
        // 4. Check if running in Expo Go (which has MediaLibrary limitations)
        const isExpoGo = Constants.appOwnership === 'expo';
        console.log("🔍 ENVIRONMENT CHECK:");
        console.log("Constants.appOwnership:", Constants.appOwnership);
        console.log("Constants.executionEnvironment:", Constants.executionEnvironment);
        console.log("Running in Expo Go:", isExpoGo);
        console.log("__DEV__:", __DEV__);
        
        if (isExpoGo) {
          // In Expo Go, use ImagePicker for basic gallery access
          console.log("🚫 EXPO GO DETECTED - MediaLibrary access limited due to Android restrictions");
          console.log("💡 This is normal behavior - to test full functionality, create a development build");
          const imagePickerResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
          setHasGalleryPermissions(imagePickerResult.status === "granted");
          
          // Skip MediaLibrary.getAssetsAsync in Expo Go to avoid errors
          setGalleryItems([]); // Empty gallery items in Expo Go
          
        } else {
          // 📱 REAL BUILD - Full MediaLibrary access
          console.log("📱 Development/Production build - Full MediaLibrary access enabled");
          
          try {
            const mediaResult = await MediaLibrary.requestPermissionsAsync(true);
            console.log("📚 Media library permission:", mediaResult);
            setHasGalleryPermissions(mediaResult.status === "granted");
            
            if (mediaResult.status === "granted") {
              try {
                const assets = await MediaLibrary.getAssetsAsync({
                  first: 20,
                  mediaType: [MediaLibrary.MediaType.video, MediaLibrary.MediaType.photo],
                  sortBy: [[MediaLibrary.SortBy.creationTime, false]]
                });
                setGalleryItems(assets.assets);
                console.log("✅ Gallery items loaded:", assets.assets.length);
              } catch (mediaError) {
                // Handle Expo Go MediaLibrary limitation gracefully
                console.log("🚫 MediaLibrary.getAssetsAsync failed (likely Expo Go):", mediaError);
                setGalleryItems([]);
                // Don't show error to user - this is expected in Expo Go
              }
            }
          } catch (mediaError) {
            console.error("❌ MediaLibrary error:", mediaError);
            setHasGalleryPermissions(false);
            setGalleryItems([]);
          }
        }
        
      } catch (error) {
        console.error("❌ Permission setup error:", error);
        // Only show alert for non-Expo Go environments
        const isExpoGo = Constants.appOwnership === 'expo';
        if (!isExpoGo) {
          Alert.alert("Permission Error", `Failed to get permissions: ${String(error)}`);
        } else {
          console.log("🚫 Suppressing error alert in Expo Go");
        }
      }
    };
    
    requestAllPermissions();
  }, []);

  const recordVideo = async () => {
    if (cameraRef.current) {
      try {
        const data = await cameraRef.current.recordAsync({
          maxDuration: 60,
        });
        if (data) {
          const source = data.uri;
          let sourceThumb = await generateThumbnail(source);
          if (sourceThumb) {
            navigation.navigate("savePost", { source, sourceThumb });
          }
        }
      } catch (error) {
        console.warn(error);
        Alert.alert("Error", "Failed to record video. Please try again.");
      }
    }
  };

  const stopVideo = async () => {
    if (cameraRef.current) {
      try {
        cameraRef.current.stopRecording();
      } catch (error) {
        console.warn("Error stopping recording:", error);
      }
    }
  };

  const pickFromGallery = async () => {
    try {
      // Check and request gallery permissions if needed
      if (!hasGalleryPermissions) {
        const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (galleryStatus.status !== "granted") {
          Alert.alert(
            "Permission Required", 
            "We need access to your photo library to select videos."
          );
          return;
        }
        setHasGalleryPermissions(true);
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 1,
      });
      
      if (!result.canceled) {
        const sourceThumb = await generateThumbnail(result.assets[0].uri);
        if (sourceThumb) {
          navigation.navigate("savePost", {
            source: result.assets[0].uri,
            sourceThumb,
          });
        }
      }
    } catch (error) {
      console.error("Error picking from gallery:", error);
      Alert.alert("Error", "Failed to select video from gallery. Please try again.");
    }
  };

  const generateThumbnail = async (source: string) => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(source, {
        time: 5000,
      });
      return uri;
    } catch (e) {
      console.warn(e);
    }
  };

  if (!hasCameraPermissions) {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 18, marginBottom: 20 }}>
            Camera and microphone permissions are required
          </Text>
          <TouchableOpacity 
            style={styles.recordButton}
            onPress={async () => {
              const cameraResult = await Camera.requestCameraPermissionsAsync();
              const micResult = await Camera.requestMicrophonePermissionsAsync();
              setHasCameraPermissions(cameraResult.status === "granted");
            }}
          >
            <Text style={{ color: 'white' }}>Grant Permissions</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isFocused ? (
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing={cameraType}
          flash={cameraFlash}
          onCameraReady={() => setIsCameraReady(true)}
        />
      ) : null}

      <View style={styles.sideBarContainer}>
        <TouchableOpacity
          style={styles.sideBarButton}
          onPress={() =>
            setCameraType(
              cameraType === 'back' ? 'front' : 'back',
            )
          }
        >
          <Feather name="refresh-ccw" size={24} color={"white"} />
          <Text style={styles.iconText}>Flip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sideBarButton}
          onPress={() =>
            setCameraFlash(
              cameraFlash === 'off' ? 'on' : 'off',
            )
          }
        >
          <Feather name="zap" size={24} color={"white"} />
          <Text style={styles.iconText}>Flash</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomBarContainer}>
        <View style={{ flex: 1 }}></View>
        <View style={styles.recordButtonContainer}>
          <TouchableOpacity
            disabled={!isCameraReady}
            onLongPress={() => recordVideo()}
            onPressOut={() => stopVideo()}
            style={styles.recordButton}
          />
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => pickFromGallery()}
            style={styles.galleryButton}
          >
            {galleryItems.length > 0 && galleryItems[galleryItems.length - 1] ? (
              <Image
                style={styles.galleryButtonImage}
                source={{ uri: galleryItems[galleryItems.length - 1].uri }}
              />
            ) : (
              <Feather name="image" size={24} color="white" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
