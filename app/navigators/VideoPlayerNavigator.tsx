import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import Home from '@app/screens/Home/Home';
import { VPFavourites, VPHome, VPPlayer, VPSettings } from '@app/screens/Home/Assets/Icons';
import Videos from '@app/screens/Home/Videos';
import Favourites from '@app/screens/Home/Favourites';
import Settings from '@app/screens/Home/Settings';

export type HomeNavigatorParamList = {
    Home: undefined;
    Player: undefined;
    Favourites: undefined;
    Settings: undefined;
};
const Tab = createBottomTabNavigator<HomeNavigatorParamList>();

export const VideoPlayerNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={() => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: Platform.OS === 'android' ? 70 : 80,
                    borderTopColor: 'transparent',
                    backgroundColor: '#fff',
                },
                tabBarItemStyle: {
                    height: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
            })}
            initialRouteName="Home"
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <VPHome style={[{ opacity: 0.6 }, focused && { opacity: 1 }]} width={26} height={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Player"
                component={Videos}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <VPPlayer style={[{ opacity: 0.6 }, focused && { opacity: 1 }]} width={26} height={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Favourites"
                component={Favourites}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <VPFavourites style={[{ opacity: 0.6 }, focused && { opacity: 1 }]} width={30} height={30} />
                    ),
                }}
            />
            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <VPSettings style={[{ opacity: 0.6 }, focused && { opacity: 1 }]} width={22} height={22} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};
