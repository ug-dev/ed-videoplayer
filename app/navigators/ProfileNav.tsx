import AboutUs from '@app/screens/Home/Scenes/AboutUs';
import PrivacyPolicy from '@app/screens/Home/Scenes/PrivacyPolicy';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

export type ProfileNavParamList = {
    AboutUS: undefined;
    PrivacyPolicy: undefined;
};

const Stack = createNativeStackNavigator<ProfileNavParamList>();

export const ProfileNav = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="AboutUS"
        >
            <Stack.Screen name="AboutUS" component={AboutUs} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        </Stack.Navigator>
    );
};
