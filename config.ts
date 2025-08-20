import Constants from 'expo-constants';

const { wso2ClientId, wso2ClientSecret, wso2GatewayUrl, wso2GatewayWss } = Constants.expoConfig?.extra ?? {};

console.log(wso2ClientId);