import Loading from '@app/components/Loading';
import { navigate, navigateAndSimpleReset } from '@app/navigators';
import AuthHeader from '@app/screens/Auth/Components/AuthHeader';
import PrimaryButton from '@app/screens/Auth/Components/PrimaryButton';
import { useGetUserMutation } from '@app/services/redux/api/auth';
import { FONTS } from '@app/theme';
import { remove } from '@app/utils/storage';
import React, { useEffect } from 'react';
import { Pressable, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Shadow } from 'react-native-neomorph-shadows';
import Styles from '../Styles/Setting.style';
interface SettingsProps {}

const Settings: React.FC<SettingsProps> = () => {
    const [getUser, { data: userData, isLoading: isUserLoading }] = useGetUserMutation();
    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        if (!isUserLoading && userData) {
            console.log({ userData });
        }
    }, [userData]);

    if (isUserLoading) {
        return <Loading />;
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <AuthHeader />
            <View style={Styles.screenConatiner}>
                <Shadow style={Styles.ProfileCard}>
                    <View style={Styles.ProfileImage}>
                        <Text style={FONTS.h1}>
                            {userData?.data?.firstName[0]}
                            {userData?.data?.lastName[0]}
                        </Text>
                    </View>
                    <View style={Styles.rightContainer}>
                        <Text style={FONTS.h4}>
                            {userData?.data?.firstName} {userData?.data?.lastName}
                        </Text>
                        <Text style={FONTS.body6}>{userData?.data?.email}</Text>
                    </View>
                </Shadow>
                <View>
                    <Pressable
                        onPress={() => navigate('ProfileNav', { screen: 'PrivacyPolicy' })}
                        style={Styles.menuItem}
                    >
                        <Text>Privacy Policy</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => navigate('ProfileNav', { screen: 'TermsAndCondition' })}
                        style={Styles.menuItem}
                    >
                        <Text>Terms & Conditions</Text>
                    </Pressable>
                    <Pressable onPress={() => navigate('ProfileNav', { screen: 'AboutUS' })} style={Styles.menuItem}>
                        <Text>About Us</Text>
                    </Pressable>
                </View>
                <PrimaryButton
                    isLoading={false}
                    InputText={'LogOut'}
                    OnPress={() => {
                        remove('accessToken');
                        navigateAndSimpleReset('AuthStack');
                    }}
                />
            </View>
        </SafeAreaView>
    );
};

export default Settings;
