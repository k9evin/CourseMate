import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from "@react-navigation/drawer";
import TabOneScreen from "../screens/TabOneScreen";
import { Text, StyleSheet } from "react-native";
import { ChannelList } from "stream-chat-expo";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator drawerContent={CustomDrawerContent}>
            <Drawer.Screen name="Test" component={TabOneScreen} />
            <Drawer.Screen name="Test2" component={TabOneScreen} />
        </Drawer.Navigator>
    );
};

const CustomDrawerContent = (props) => {
    const onChannelSelect = (channel) => {
        // navigate to channel
    };

    return (
        <DrawerContentScrollView {...props}>
            <Text style={styles.title}>CourseMate</Text>
            <ChannelList onSelect={onChannelSelect} />
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    title: {
        color: "white",
        fontWeight: "bold",
        alignSelf: "center",
        fontSize: 16,
        margin: 10,
    }
});

export default DrawerNavigator;
