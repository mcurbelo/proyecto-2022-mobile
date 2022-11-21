import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import messaging from "@react-native-firebase/messaging";
import { Alert } from "react-native";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { useEffect } from "react";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  useEffect(() => {
    checkPermissionDenied().then((result) => {
      if (result) requestPermissions();
    });
  }, []);

  const checkPermissionDenied = async (): Promise<boolean> => {
    return check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
      .then((result) => {
        switch (result) {
          case RESULTS.GRANTED:
            return false;
          default:
            return true;
        }
      })
      .catch((error) => true);
  };
  const requestPermissions = async () => {
    let result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS, {
      title: "Se necesitan permisos de Push Notification",
      message: "Necesitamos PN para una mejor experiencia",
      buttonPositive: "OK!",
      buttonNegative: "NO",
    });
  };
  messaging().onMessage(async (message) => {
    Alert.alert(
      message.notification?.title ?? "Nueva Notificacion",
      message.notification?.body
    );
  });

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
