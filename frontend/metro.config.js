// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("@expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

// Add support for .cjs files (existing)
defaultConfig.resolver.sourceExts.push("cjs");

// Firebase v11 ESM module support
defaultConfig.resolver.sourceExts.push("mjs");

// Ensure proper module resolution for Firebase v11
defaultConfig.resolver.resolverMainFields = ["react-native", "browser", "main"];

// Handle Firebase's ESM exports properly
defaultConfig.resolver.platforms = ["ios", "android", "native", "web"];

module.exports = defaultConfig;
