import AboutUs from '@app/screens/Home/Scenes/AboutUs';
import PrivacyPolicy from '@app/screens/Home/Scenes/PrivacyPolicy';
import TermsAndCondition from '@app/screens/Home/Scenes/TermsAndCondition';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

export type ProfileNavParamList = {
    AboutUS: undefined;
    PrivacyPolicy: undefined;
    TermsAndCondition: undefined;
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
            <Stack.Screen name="TermsAndCondition" component={TermsAndCondition} />
        </Stack.Navigator>
    );
};
