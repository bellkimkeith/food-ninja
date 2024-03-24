import { registerForPushNotificationsAsync } from "@/lib/notifications";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import { useAuth } from "./AuthContextProvider";
import { supabase } from "@/lib/supabase";

const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>();
  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  const { profile, session } = useAuth();

  const saveExpoPushToken = (token: string | undefined) => {
    setExpoPushToken(token);
    if (!token) return;
    insertExpoPushToken();
  };

  const insertExpoPushToken = async () => {
    await supabase
      .from("profiles")
      .update({ expo_push_token: expoPushToken })
      .eq("id", profile?.id ? profile.id : "");
  };

  useEffect(() => {
    insertExpoPushToken();
  }, [profile, session]);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      saveExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return <>{children}</>;
};

export default NotificationProvider;
