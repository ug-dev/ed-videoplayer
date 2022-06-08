import { loadString, remove } from '@app/utils/storage';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Platform, useColorScheme, View } from 'react-native';
import { AuthStack } from './AuthNav';
import { HomeNavigator } from './HomeNavigator';
import { navigationRef } from './navigation-utilities';
import { PlayerNav } from './PlayerNav';
import Logo1 from '@app/assets/logo/logo1.svg';
import { useGetUserMutation, useIsEmailVerifiedMutation } from '@app/services/redux/api/auth';
import EmailVerification from '@app/screens/Auth/Scenes/EmailVerification';
import SplashScreen from 'react-native-splash-screen';
import { ProfileNav } from './ProfileNav';

export type NavigatorParamList = {
    AuthStack: undefined;
    HomeNavigator: undefined;
    PlayerNav: undefined;
    EmailVerification: undefined;
    ProfileNav: undefined;
};

const Stack = createNativeStackNavigator<NavigatorParamList>();

const { width, height } = Dimensions.get('window');
// const SplashScreen = () => {
//     return (
//         <View style={{ width: width, justifyContent: 'center', alignItems: 'center', flex: 1 }}>
//             <Logo1 width={width * 0.8} />
//         </View>
//     );
// };

const AppStack = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [initialRoute, setInitialRoute] = useState<'AuthStack' | 'HomeNavigator' | 'EmailVerification'>(null);
    const [getUser, { data: userData, isLoading: isUserLoading, error }] = useGetUserMutation();
    const [getIsEmailVerified, { data: isEmailVerified }] = useIsEmailVerifiedMutation();

    const fetchAuth = async () => {
        // await remove('accessToken');
        const accessToken = await loadString('accessToken');
        if (accessToken) {
            // console.log({ accessToken: accessToken });
            getUser();
            // setInitialRoute('HomeNavigator');

            // setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        if (userData) {
            if (userData?.data.email_verified_at) {
                console.log('hello');

                setInitialRoute('HomeNavigator');
                setIsLoading(false);
            } else {
                setInitialRoute('EmailVerification');
                setIsLoading(false);
            }
        }
    }, [userData, isUserLoading]);

    useEffect(() => {
        if (error) {
            if (error.status === 401) {
                setInitialRoute('AuthStack');
                setIsLoading(false);
            }
        }
    }, [error]);

    useEffect(() => {
        fetchAuth();
    }, []);

    useEffect(() => {
        console.log('🚀🚀🚀🚀🚀 ~ file: Appnavigator.tsx ~ line 81 ~ useEffect ~ initialRoute', initialRoute);
        if (!isLoading || !isUserLoading) {
            if (Platform.OS === 'android') {
                SplashScreen.hide();
                console.log('🚀🚀🚀🚀🚀🚀🚀🚀 ~ file: Appnavigator.tsx ~ line 84 ~ useEffect ~ SplashScreen.hide();');
            }
        }
    }, [isLoading, isUserLoading]);

    if (isLoading || isUserLoading) {
        return null;
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
            <Stack.Screen name="EmailVerification" component={EmailVerification} />
            <Stack.Screen name="ProfileNav" component={ProfileNav} />
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
