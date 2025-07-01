// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Firebase v11 ESM module support
config.resolver.sourceExts.push('mjs');

module.exports = config;
