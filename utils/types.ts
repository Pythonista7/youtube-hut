import colors from "./colors";

export interface User {
  authenticated: boolean;
  name: string;
  color: colors;
}

export const ChuckNorrisCategories = [
  "animal",
  "career",
  "celebrity",
  "dev",
  "explicit",
  "fashion",
  "food",
  "history",
  "money",
  "movie",
  "music",
  "political",
  "religion",
  "science",
  "sport",
  "travel",
];
