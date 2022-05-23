import { loadString, remove } from '@app/utils/storage';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, useColorScheme } from 'react-native';
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
    const [isLoading, setIsLoading] = useState(true);
    const [initialRoute, setInitialRoute] = useState<'AuthStack' | 'HomeNavigator'>('AuthStack');

    const fetchAuth = async () => {
        // await remove('accessToken');
        const accessToken = await loadString('accessToken');
        if (accessToken) {
            console.log({ accessToken: accessToken });
            setInitialRoute('HomeNavigator');

            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAuth();
    }, []);

    if (isLoading) {
        return <ActivityIndicator />;
    }
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName={initialRoute}
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
