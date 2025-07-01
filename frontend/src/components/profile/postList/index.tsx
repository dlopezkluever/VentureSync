import { View, FlatList, Text } from "react-native";
import ProfilePostListItem from "./item";
import styles from "./styles";
import { RootState } from "../../../redux/store";

export default function ProfilePostList({
  posts,
}: {
  posts: RootState["post"]["currentUserPosts"];
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>
        {posts && posts.length > 0 ? `Posts (${posts.length})` : "Posts"}
      </Text>
      
      {posts && posts.length > 0 ? (
        <FlatList
          numColumns={3}
          scrollEnabled={false}
          removeClippedSubviews
          nestedScrollEnabled
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ProfilePostListItem item={item} />}
          contentContainerStyle={styles.gridContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No posts yet</Text>
          <Text style={styles.emptySubtext}>
            Share your professional work to showcase your expertise
          </Text>
        </View>
      )}
    </View>
  );
}
