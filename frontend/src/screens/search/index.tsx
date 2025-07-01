import React, { useEffect, useState } from "react";
import { TextInput, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchUserItem from "../../components/search/userItem";
import { searchUsers } from "../../services/user";
import styles from "./styles";
import { SearchUser } from "../../../types";

export default function SearchScreen() {
  const [textInput, setTextInput] = useState("");
  const [searchResults, setSearchResults] = useState<SearchUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (textInput.trim() === "") {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    
    // Debounce search to avoid too many requests
    const timeoutId = setTimeout(() => {
      searchUsers(textInput)
        .then((users) => {
          setSearchResults(users);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Search error:", error);
          setSearchResults([]);
          setIsLoading(false);
        });
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [textInput]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Discover Professionals</Text>
        <Text style={styles.headerSubtitle}>
          Find Visionaries, Talent, and Investors on VentureSync
        </Text>
      </View>

      <TextInput
        onChangeText={setTextInput}
        value={textInput}
        style={styles.searchInput}
        placeholder="Search users..."
        placeholderTextColor="#8f8f8f"
        autoCapitalize="none"
        autoCorrect={false}
      />
      
      {isLoading && textInput.trim() !== "" && (
        <View style={styles.messageContainer}>
          <Text style={styles.loadingText}>Discovering professionals...</Text>
        </View>
      )}
      
      {!isLoading && textInput.trim() !== "" && searchResults.length === 0 && (
        <View style={styles.messageContainer}>
          <Text style={styles.noResultsText}>No professionals found</Text>
          <Text style={styles.noResultsSubtext}>
            Try searching with different keywords or check the spelling
          </Text>
        </View>
      )}

      {textInput.trim() === "" && (
        <View style={styles.messageContainer}>
          <Text style={styles.placeholderText}>
            Start typing to discover amazing professionals, entrepreneurs, and investors on VentureSync
          </Text>
        </View>
      )}

      <FlatList
        data={searchResults}
        renderItem={({ item }) => <SearchUserItem item={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        style={styles.resultsList}
      />
    </SafeAreaView>
  );
}
