import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import Home from '@app/screens/Home/Scenes/Home';
import { VPFavourites, VPHome, VPPlayer, VPSettings } from '@app/screens/Home/Assets/Icons';
import Favourites from '@app/screens/Home/Scenes/Favourites';
import ContinueLearn from '@app/screens/Home/Scenes/ContinueLearn';
import Subject from '@app/screens/Home/Scenes/Subject';

export type HomeNavigatorParamList = {
    Home: undefined;
    Player: undefined;
    Favourites: undefined;
    Settings: undefined;
};
const Tab = createBottomTabNavigator<HomeNavigatorParamList>();

export const HomeNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={() => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: Platform.OS === 'android' ? 70 : 80,
                    borderTopColor: 'transparent',
                    backgroundColor: '#fff',
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.32,
                    shadowRadius: 5.46,
                    elevation: 9,
                },
                tabBarItemStyle: {
                    height: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
            })}
            initialRouteName="Player"
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
                component={Subject}
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
                component={ContinueLearn}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <VPSettings style={[{ opacity: 0.6 }, focused && { opacity: 1 }]} width={22} height={22} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};
