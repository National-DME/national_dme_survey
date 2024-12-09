const IS_DEV = process.env.APP_VARIANT === 'development';

export default {
  "expo": {
    "name": IS_DEV ? "Survey DEV" : "Survey DME",
    "slug": "national_dme_survey",
    "version": "2.1.1",
    "scheme": "your-app-scheme",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "androidStatusBar": {
      "translucent": false,
    },
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.nationalDME.national_dme_survey"
    },
    "web": {
      "favicon": "./assets/favicon.png",
      "bundler": "metro"
    },
    "extra": {
      "eas": {
        "projectId": "505915c2-16a7-495d-a3ac-bc64be315e91"
      }
    },
    "plugins": [
      "expo-router",
      "expo-font",
      "expo-secure-store"
    ]
  }
}
