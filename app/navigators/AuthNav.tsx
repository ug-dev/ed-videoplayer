import CreateAccountScreen from '@app/screens/Auth/scenes/CreateAccountScreen';
import ForgotPasswordScreen from '@app/screens/Auth/scenes/ForgotPasswordScreen';
import LoginScreen from '@app/screens/Auth/scenes/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

export type AuthNavigatorParamList = {
    Login: undefined;
    ForgotPassword: undefined;
    CreateAccount: undefined;
};

const Stack = createNativeStackNavigator<AuthNavigatorParamList>();

export const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="Login"
        >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
        </Stack.Navigator>
    );
};
