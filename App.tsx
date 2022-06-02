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

const API_KEY = "q6sd75ec9awk";
const client = StreamChat.getInstance(API_KEY);

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [isReady, setIsReady] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState(null);

  const connectUser = async () => {
    // Create a new user object
    await client.connectUser(
      {
        id: "kevin",
        name: "Kevin",
        image:
          "https://pbs.twimg.com/profile_images/1490533817416925189/oDKK6UFj_400x400.jpg",
      },
      client.devToken("kevin")
    );
    setIsReady(true);

    // Create a channel
    // const channel = client.channel("team", "help", {
    //     name: "Help",
    // });
    // await channel.create();
  };

  useEffect(() => {
    connectUser();
  }, []);

  const onChannelSelect = (channel) => {
    setSelectedChannel(channel);
  };

  if (!isLoadingComplete || !isReady) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <OverlayProvider>
          <Chat client={client}>
            {/* <Navigation colorScheme={colorScheme} /> */}
            {!selectedChannel ? (
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
            )}
          </Chat>
        </OverlayProvider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
