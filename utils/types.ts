import colors from "./colors";

export interface User {
  verified: boolean;
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
