import ForgotPassword from '@app/screens/Auth/Scenes/ForgotPassword';
import Login from '@app/screens/Auth/Scenes/Login';
import PaymentSucessPage from '@app/screens/Auth/Scenes/PaymentSucessPage';
import SignUp from '@app/screens/Auth/Scenes/SignUp';
import Subscription from '@app/screens/Auth/Scenes/Subscription';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

export type AuthNavigatorParamList = {
    Login: undefined;
    ForgotPassword: undefined;
    SignUp: undefined;
    Subscription: undefined;
    SubscriptionSucess: undefined;
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
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="Subscription" component={Subscription} />
            <Stack.Screen name="SubscriptionSucess" component={PaymentSucessPage} />
        </Stack.Navigator>
    );
};
