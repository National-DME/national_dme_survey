import React from 'react';
import Drawer from 'expo-router/drawer';
import {
	DrawerContentScrollView,
	DrawerItem,
	DrawerItemList,
} from '@react-navigation/drawer';
import { theme } from '../../../styles/theme';
import { useAuth } from '../../../context/AuthContext';
import { AntDesign } from '@expo/vector-icons';
import useGlobalStyles from '../../../styles/globalStyles';
import { View, Text } from 'react-native';

export default function HomeLayout() {
    const { logout } = useAuth();
    const globalStyles = useGlobalStyles();

    const DrawerButton = (props: any) => {
        return (
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem
                    label='Logout'
                    style={{
                        backgroundColor: theme.card,
                    }}
                    labelStyle={globalStyles.drawerHeaderTitle}
                    onPress={() => logout()}
                    icon={() => (
                        <AntDesign name='logout' color={theme.text} size={24} />
                    )}
                />
                <View
                    style={{
                        padding: 16,
                        backgroundColor: theme.background,
                    }}>
                    <Text style={globalStyles.subtitle}>v1.0.0</Text>
                </View>
            </DrawerContentScrollView>
        );
    }

    return (
        <Drawer
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.background
                },
                headerShadowVisible: false,
                headerTintColor: theme.text,
                headerTitleStyle: globalStyles.drawerHeaderTitle,
                drawerActiveBackgroundColor: theme.secondary,
                drawerActiveTintColor: theme.text,
                drawerInactiveBackgroundColor: theme.card,
                drawerInactiveTintColor: theme.text,
                drawerLabelStyle: {
                    fontFamily: 'Nunito',
                    fontSize: 20,
                },
                drawerStyle: { 
                    backgroundColor: theme.background,
                },
                drawerContentContainerStyle: {
                    marginVertical: 10
                },
                drawerContentStyle: {
                    padding: 20
                }
            }}
            drawerContent={(props) => <DrawerButton {...props} />}
        >
            <Drawer.Screen 
                name='index'
                options={{
                    drawerLabel: 'Home',
                    title: 'Home',
                    drawerIcon: () => (
                        <AntDesign 
                            size={24}
                            name='home'
                            color={theme.text}
                        />
                    )
                }}
            />
        </Drawer>
    );
}