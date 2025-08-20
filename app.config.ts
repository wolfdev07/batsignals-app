import 'dotenv/config';
import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "batsignals-app",
  slug: "batsignals-app",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  newArchEnabled: true,
  splash: {
    image: "./assets/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  ios: {
    supportsTablet: true
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff"
    },
    edgeToEdgeEnabled: true
  },
  web: {
    favicon: "./assets/favicon.png"
  },
  extra: {
    wso2ClientId: process.env.WSO2_CLIENT_ID,
    wso2ClientSecret: process.env.WSO2_CLIENT_SECRET,
    wso2GatewayUrl: process.env.WSO2_GATEWAY_URL,
    wso2GatewayWss: process.env.WSO2_GATEWAY_WSS,
  }
});
