import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme from "./src/hooks/useColorScheme";
import Navigation from "./src/navigation";

import { StreamChat } from "stream-chat";
import { useEffect, useState } from "react";
import {
  OverlayProvider,
  Chat,
  ChannelList,
  Channel,
  MessageList,
  MessageInput,
} from "stream-chat-expo";
import { Text } from "react-native";
import AuthContext from "./src/contexts/AuthContext";

const API_KEY = "q6sd75ec9awk";
const client = StreamChat.getInstance(API_KEY);

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  useEffect(() => {
    // when component mounts

    return () => {
      // when component unmounts
      client.disconnectUser();
    };
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthContext>
          <OverlayProvider>
            <Chat client={client}>
              <Navigation colorScheme={colorScheme} />
              {/* {!selectedChannel ? (
                <ChannelList onSelect={onChannelSelect} />
              ) : (
                <>
                  <Channel channel={selectedChannel}>
                    <Text
                      style={{ margin: 50 }}
                      onPress={() => setSelectedChannel(null)}
                    >
                      Go Back
                    </Text>
                      <MessageList />
                      <MessageInput /> 
                  </Channel>
                </>
              )} */}
            </Chat>
          </OverlayProvider>
        </AuthContext>
        <StatusBar style="light" />
      </SafeAreaProvider>
    );
  }
}
