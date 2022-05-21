/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useColorScheme } from 'react-native';
import { AuthStack } from './AuthNav';
import { HomeNavigator } from './HomeNavigator';
import { navigationRef } from './navigation-utilities';
import { PlayerNav } from './PlayerNav';

export type NavigatorParamList = {
    AuthStack: undefined;
    HomeNavigator: undefined;
    PlayerNav: undefined;
};

const Stack = createNativeStackNavigator<NavigatorParamList>();

const AppStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="AuthStack"
        >
            <Stack.Screen name="AuthStack" component={AuthStack} />
            <Stack.Screen name="HomeNavigator" component={HomeNavigator} />
            <Stack.Screen name="PlayerNav" component={PlayerNav} />
        </Stack.Navigator>
    );
};

type NavigationProps = Partial<React.ComponentProps<typeof NavigationContainer>>;

export const AppNavigator = (props: NavigationProps) => {
    const colorScheme = useColorScheme();
    return (
        <NavigationContainer ref={navigationRef} theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme} {...props}>
            <AppStack />
        </NavigationContainer>
    );
};

AppNavigator.displayName = 'AppNavigator';

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ['welcome'];
export const canExit = (routeName: string) => exitRoutes.includes(routeName);
