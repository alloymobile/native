module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      // Expo preset, but tell it we’re using NativeWind so JSX can use className
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      // NativeWind’s own transform
      "nativewind/babel",
    ],
  };
};
