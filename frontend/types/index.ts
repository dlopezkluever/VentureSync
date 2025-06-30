export interface Post {
  id: string;
  creator: string;
  media: string[];
  description: string;
  likesCount: number;
  commentsCount: number;
  creation: string;
}

export interface Comment {
  id: string;
  creator: string;
  comment: string;
}

// VentureSync Professional User Interface
export interface User {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL?: string;
  
  // VentureSync Professional Fields
  designation: "Investor" | "Visionary" | "Talent";
  specialty: string;
  bio: string;
  workExperience: WorkExperience[];
  education: Education[];
  topSkills: string[];
  externalURLs: string[];
  
  // VentureSync Network Counts
  circleCount: number;    // Inner circle (mutual connections)
  networkCount: number;   // Followers
  watchingCount: number;  // Following
  
  // Legacy fields (keep for backward compatibility during transition)
  followingCount?: number;
  followersCount?: number;
  likesCount?: number;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string; // Optional for current positions
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string; // Optional for ongoing education
  description?: string;
}

export interface SearchUser extends User {
  id: string;
}

export interface Chat {
  id: string;
  members: string[];
  lastMessage: string;
  lastUpdate?: {
    seconds?: number;
    nanoseconds?: number;
  };
  messages: Message[];
}

export interface Message {
  id: string;
  creator: string;
  message: string;
}
