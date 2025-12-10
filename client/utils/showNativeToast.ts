import { ToastAndroid, Platform } from "react-native";

export const showNativeToast = (message: string) => {
  if (Platform.OS === "android") {
    // Muestra el mensaje nativo de Android
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    // Fallback para iOS
    alert(message);
  }
};
