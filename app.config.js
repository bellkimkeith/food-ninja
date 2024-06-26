export default {
  expo: {
    name: "Food Ninja",
    slug: "food-ninja",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./src/assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "light",
    splash: {
      image: "./src/assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./src/assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.bellkimkeith.foodninja",
      versionCode: 1,
      googleServicesFile: process.env.FOOD_NINJA_GOOGLE_SERVICES,
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_ANDROID_MAP_API_KEY,
        },
      },
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./src/assets/images/favicon.png",
    },
    plugins: ["expo-router", "expo-secure-store"],
    experiments: {
      typedRoutes: true,
      tsconfigPaths: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: "a9b8ee8d-730d-4b10-aa30-c35fe0c1b6d5",
      },
    },
  },
};
