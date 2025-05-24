// TODO: Implement actual localization with Swedish strings
export const t = (key: string) => {
  console.warn(`Localization key "${key}" not found.`);
  return key; // Return the key as a placeholder
};