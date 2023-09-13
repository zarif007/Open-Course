export const formatSelectedLevels = (selectedLevels: string[]): string[] => {
  if (selectedLevels.length === 1) return selectedLevels;
  else if (selectedLevels.length === 2) {
    if (
      selectedLevels.includes("🌱 Beginner") &&
      selectedLevels.includes("🚧 Intermediate")
    )
      return ["🌱 Beginner - 🚧 Intermediate"];
    else if (
      selectedLevels.includes("🌱 Beginner") &&
      selectedLevels.includes("🚀 Advance")
    )
      return ["🌱 Beginner - 🚀 Advance"];
    else return ["🚧 Intermediate - 🚀 Advance"];
  }
  return ["🌱 Beginner - 🚀 Advance"];
};
