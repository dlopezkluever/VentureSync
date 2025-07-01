import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import NavBarGeneral from "../../../components/general/navbar";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { saveUserProfileImage, updateUserProfile } from "../../../services/user";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { RootState } from "../../../redux/store";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/main";
import { WorkExperience, Education } from "../../../../types";
import { Picker } from '@react-native-picker/picker';

export default function EditProfileScreen() {
  const auth = useSelector((state: RootState) => state.auth);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Initialize form state with current user data
  const [formData, setFormData] = useState({
    displayName: auth.currentUser?.displayName || "",
    designation: auth.currentUser?.designation || "Talent",
    specialty: auth.currentUser?.specialty || "",
    bio: auth.currentUser?.bio || "",
    topSkills: auth.currentUser?.topSkills || [],
    externalURLs: auth.currentUser?.externalURLs || [],
    workExperience: auth.currentUser?.workExperience || [],
    education: auth.currentUser?.education || []
  });

  const [skillInput, setSkillInput] = useState("");
  const [urlInput, setUrlInput] = useState("");

  // Work Experience Form State
  const [workExpForm, setWorkExpForm] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    description: ""
  });
  const [showWorkExpForm, setShowWorkExpForm] = useState(false);

  // Education Form State
  const [educationForm, setEducationForm] = useState({
    institution: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: "",
    description: ""
  });
  const [showEducationForm, setShowEducationForm] = useState(false);

  const chooseImage = async () => {
    Alert.alert(
      "Select Profile Picture",
      "Choose how you'd like to select your profile picture",
      [
        {
          text: "Camera",
          onPress: takePhoto,
        },
        {
          text: "Photo Library",
          onPress: selectFromGallery,
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  const takePhoto = async () => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    if (cameraPermission.status !== 'granted') {
      Alert.alert("Permission Required", "We need access to your camera. Please enable it in your device settings.");
      return;
    }

    try {
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets) {
        Alert.alert("Uploading...", "Please wait while we update your profile picture.");
        await saveUserProfileImage(result.assets[0].uri);
        Alert.alert("Success", "Profile picture updated!");
      }
    } catch (error) {
      console.error("Error taking photo:", error);
      Alert.alert("Error", "Failed to take photo. Please try again.");
    }
  };

  const selectFromGallery = async () => {
    const libraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (libraryPermission.status !== 'granted') {
      Alert.alert("Permission Required", "We need access to your photo library. Please enable it in your device settings.");
      return;
    }
    
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets) {
        Alert.alert("Uploading...", "Please wait while we update your profile picture.");
        await saveUserProfileImage(result.assets[0].uri);
        Alert.alert("Success", "Profile picture updated!");
      }
    } catch (error) {
      console.error("Error selecting image:", error);
      Alert.alert("Error", "Failed to select image. Please try again.");
    }
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.topSkills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        topSkills: [...prev.topSkills, skillInput.trim()]
      }));
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      topSkills: prev.topSkills.filter(s => s !== skill)
    }));
  };

  const addURL = () => {
    if (urlInput.trim()) {
      setFormData(prev => ({
        ...prev,
        externalURLs: [...prev.externalURLs, urlInput.trim()]
      }));
      setUrlInput("");
    }
  };

  const removeURL = (url: string) => {
    setFormData(prev => ({
      ...prev,
      externalURLs: prev.externalURLs.filter(u => u !== url)
    }));
  };

  const addWorkExperience = () => {
    if (workExpForm.company.trim() && workExpForm.position.trim()) {
      const newWorkExp: WorkExperience = {
        id: Date.now().toString(),
        company: workExpForm.company.trim(),
        position: workExpForm.position.trim(),
        startDate: workExpForm.startDate,
        endDate: workExpForm.endDate || undefined,
        description: workExpForm.description.trim()
      };
      
      setFormData(prev => ({
        ...prev,
        workExperience: [...prev.workExperience, newWorkExp]
      }));
      
      // Reset form
      setWorkExpForm({
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: ""
      });
      setShowWorkExpForm(false);
    }
  };

  const removeWorkExperience = (id: string) => {
    setFormData(prev => ({
      ...prev,
      workExperience: prev.workExperience.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = () => {
    if (educationForm.institution.trim() && educationForm.degree.trim()) {
      const newEducation: Education = {
        id: Date.now().toString(),
        institution: educationForm.institution.trim(),
        degree: educationForm.degree.trim(),
        field: educationForm.field.trim(),
        startDate: educationForm.startDate,
        endDate: educationForm.endDate || undefined,
        description: educationForm.description.trim()
      };
      
      setFormData(prev => ({
        ...prev,
        education: [...prev.education, newEducation]
      }));
      
      // Reset form
      setEducationForm({
        institution: "",
        degree: "",
        field: "",
        startDate: "",
        endDate: "",
        description: ""
      });
      setShowEducationForm(false);
    }
  };

  const removeEducation = (id: string) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const saveProfile = async () => {
    try {
      await updateUserProfile({
        designation: formData.designation as "Investor" | "Visionary" | "Talent",
        specialty: formData.specialty,
        bio: formData.bio,
        topSkills: formData.topSkills,
        externalURLs: formData.externalURLs,
        workExperience: formData.workExperience,
        education: formData.education
      });
      
      // Also update display name if changed
      if (formData.displayName !== auth.currentUser?.displayName) {
        // You might want to create a separate function for this
        // For now, we'll skip display name update to focus on VentureSync fields
      }
      
      Alert.alert("Success", "Profile updated successfully!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to update profile. Please try again.");
      console.error("Profile update error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavBarGeneral 
        title="Edit Profile" 
        rightButton={{ 
          display: true, 
          name: "save", 
          action: saveProfile 
        }}
      />
      
      <ScrollView style={styles.scrollContainer}>
        {/* Profile Image Section */}
        <View style={styles.imageContainer}>
          <TouchableOpacity
            style={styles.imageViewContainer}
            onPress={() => chooseImage()}
          >
            {auth.currentUser && auth.currentUser.photoURL ? (
              <Image
                style={styles.image}
                source={{ uri: auth.currentUser.photoURL }}
              />
            ) : (
              <Feather name="user" size={40} color="white" />
            )}
            <View style={styles.imageOverlay} />
            <Feather name="camera" size={26} color="white" />
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <View style={styles.fieldsContainer}>
          
          {/* Display Name */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Display Name</Text>
            <TextInput
              style={styles.textInput}
              value={formData.displayName}
              onChangeText={(text) => setFormData(prev => ({ ...prev, displayName: text }))}
              placeholder="Your display name"
            />
          </View>

          {/* Designation Picker */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Designation</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.designation}
                onValueChange={(itemValue) => setFormData(prev => ({ ...prev, designation: itemValue }))}
                style={styles.picker}
              >
                <Picker.Item label="Talent" value="Talent" />
                <Picker.Item label="Visionary" value="Visionary" />
                <Picker.Item label="Investor" value="Investor" />
              </Picker>
            </View>
          </View>

          {/* Specialty */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Specialty</Text>
            <TextInput
              style={styles.textInput}
              value={formData.specialty}
              onChangeText={(text) => setFormData(prev => ({ ...prev, specialty: text }))}
              placeholder="e.g., Full Stack Developer, AI Researcher, Fintech"
            />
          </View>

          {/* Bio */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Bio</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={formData.bio}
              onChangeText={(text) => setFormData(prev => ({ ...prev, bio: text }))}
              placeholder="Tell others about yourself and your professional journey..."
              multiline
              numberOfLines={4}
            />
          </View>

          {/* Top Skills */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Top Skills</Text>
            <View style={styles.skillsContainer}>
              <View style={styles.addItemContainer}>
                <TextInput
                  style={[styles.textInput, { flex: 1 }]}
                  value={skillInput}
                  onChangeText={setSkillInput}
                  placeholder="Add a skill"
                  onSubmitEditing={addSkill}
                />
                <TouchableOpacity onPress={addSkill} style={styles.addButton}>
                  <Feather name="plus" size={20} color="white" />
                </TouchableOpacity>
              </View>
              <View style={styles.tagsContainer}>
                {formData.topSkills.map((skill, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{skill}</Text>
                    <TouchableOpacity onPress={() => removeSkill(skill)}>
                      <Feather name="x" size={16} color="#666" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* External URLs */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>External Links</Text>
            <Text style={styles.fieldDescription}>Portfolio, GitHub, LinkedIn, etc.</Text>
            <View style={styles.urlsContainer}>
              <View style={styles.addItemContainer}>
                <TextInput
                  style={[styles.textInput, { flex: 1 }]}
                  value={urlInput}
                  onChangeText={setUrlInput}
                  placeholder="https://your-portfolio.com"
                  onSubmitEditing={addURL}
                  autoCapitalize="none"
                  keyboardType="url"
                />
                <TouchableOpacity onPress={addURL} style={styles.addButton}>
                  <Feather name="plus" size={20} color="white" />
                </TouchableOpacity>
              </View>
              {formData.externalURLs.map((url, index) => (
                <View key={index} style={styles.urlItem}>
                  <Text style={styles.urlText} numberOfLines={1}>{url}</Text>
                  <TouchableOpacity onPress={() => removeURL(url)}>
                    <Feather name="x" size={16} color="#666" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          {/* Work Experience Section */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Work Experience</Text>
            
            {/* Existing Work Experience */}
            {formData.workExperience.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.experienceTitle}>{exp.position}</Text>
                    <Text style={styles.experienceSubtitle}>{exp.company}</Text>
                    <Text style={styles.experienceDate}>
                      {exp.startDate} - {exp.endDate || "Present"}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => removeWorkExperience(exp.id)}>
                    <Feather name="trash-2" size={18} color="#e74c3c" />
                  </TouchableOpacity>
                </View>
                {exp.description && (
                  <Text style={styles.experienceDescription} numberOfLines={2}>
                    {exp.description}
                  </Text>
                )}
              </View>
            ))}

            {/* Add Work Experience Form */}
            {showWorkExpForm ? (
              <View style={styles.formContainer}>
                <TextInput
                  style={styles.textInput}
                  value={workExpForm.position}
                  onChangeText={(text) => setWorkExpForm(prev => ({ ...prev, position: text }))}
                  placeholder="Job Title / Position"
                />
                <TextInput
                  style={styles.textInput}
                  value={workExpForm.company}
                  onChangeText={(text) => setWorkExpForm(prev => ({ ...prev, company: text }))}
                  placeholder="Company Name"
                />
                <View style={styles.dateContainer}>
                  <TextInput
                    style={[styles.textInput, { flex: 1, marginRight: 8 }]}
                    value={workExpForm.startDate}
                    onChangeText={(text) => setWorkExpForm(prev => ({ ...prev, startDate: text }))}
                    placeholder="Start Date (e.g., Jan 2023)"
                  />
                  <TextInput
                    style={[styles.textInput, { flex: 1 }]}
                    value={workExpForm.endDate}
                    onChangeText={(text) => setWorkExpForm(prev => ({ ...prev, endDate: text }))}
                    placeholder="End Date (or leave empty)"
                  />
                </View>
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  value={workExpForm.description}
                  onChangeText={(text) => setWorkExpForm(prev => ({ ...prev, description: text }))}
                  placeholder="Brief description of your role and achievements..."
                  multiline
                  numberOfLines={3}
                />
                <View style={styles.formButtons}>
                  <TouchableOpacity 
                    style={styles.cancelButton} 
                    onPress={() => setShowWorkExpForm(false)}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.saveButton} onPress={addWorkExperience}>
                    <Text style={styles.saveButtonText}>Add Experience</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <TouchableOpacity 
                style={styles.addItemButton} 
                onPress={() => setShowWorkExpForm(true)}
              >
                <Feather name="plus" size={20} color="#0080C6" />
                <Text style={styles.addItemButtonText}>Add Work Experience</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Education Section */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Education</Text>
            
            {/* Existing Education */}
            {formData.education.map((edu) => (
              <View key={edu.id} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.experienceTitle}>{edu.degree}</Text>
                    <Text style={styles.experienceSubtitle}>{edu.field} • {edu.institution}</Text>
                    <Text style={styles.experienceDate}>
                      {edu.startDate} - {edu.endDate || "Present"}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => removeEducation(edu.id)}>
                    <Feather name="trash-2" size={18} color="#e74c3c" />
                  </TouchableOpacity>
                </View>
                {edu.description && (
                  <Text style={styles.experienceDescription} numberOfLines={2}>
                    {edu.description}
                  </Text>
                )}
              </View>
            ))}

            {/* Add Education Form */}
            {showEducationForm ? (
              <View style={styles.formContainer}>
                <TextInput
                  style={styles.textInput}
                  value={educationForm.degree}
                  onChangeText={(text) => setEducationForm(prev => ({ ...prev, degree: text }))}
                  placeholder="Degree (e.g., Bachelor of Science)"
                />
                <TextInput
                  style={styles.textInput}
                  value={educationForm.field}
                  onChangeText={(text) => setEducationForm(prev => ({ ...prev, field: text }))}
                  placeholder="Field of Study (e.g., Computer Science)"
                />
                <TextInput
                  style={styles.textInput}
                  value={educationForm.institution}
                  onChangeText={(text) => setEducationForm(prev => ({ ...prev, institution: text }))}
                  placeholder="Institution Name"
                />
                <View style={styles.dateContainer}>
                  <TextInput
                    style={[styles.textInput, { flex: 1, marginRight: 8 }]}
                    value={educationForm.startDate}
                    onChangeText={(text) => setEducationForm(prev => ({ ...prev, startDate: text }))}
                    placeholder="Start Date (e.g., Aug 2019)"
                  />
                  <TextInput
                    style={[styles.textInput, { flex: 1 }]}
                    value={educationForm.endDate}
                    onChangeText={(text) => setEducationForm(prev => ({ ...prev, endDate: text }))}
                    placeholder="End Date (or leave empty)"
                  />
                </View>
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  value={educationForm.description}
                  onChangeText={(text) => setEducationForm(prev => ({ ...prev, description: text }))}
                  placeholder="Notable achievements, projects, or honors (optional)..."
                  multiline
                  numberOfLines={3}
                />
                <View style={styles.formButtons}>
                  <TouchableOpacity 
                    style={styles.cancelButton} 
                    onPress={() => setShowEducationForm(false)}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.saveButton} onPress={addEducation}>
                    <Text style={styles.saveButtonText}>Add Education</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <TouchableOpacity 
                style={styles.addItemButton} 
                onPress={() => setShowEducationForm(true)}
              >
                <Feather name="book" size={20} color="#0080C6" />
                <Text style={styles.addItemButtonText}>Add Education</Text>
              </TouchableOpacity>
            )}
          </View>

        </View>

        {/* Bottom padding for scrolling */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
