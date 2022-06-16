import { ActivityIndicator, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useGetUserMutation, useIsEmailVerifiedMutation, useResendEmailMutation } from '@app/services/redux/api/auth';
import { useSelector } from 'react-redux';
import Loading from '@app/components/Loading';
import { FONTS } from '@app/theme';
import LottieView from 'lottie-react-native';
import { SIZES } from '@app/theme/fonts';
import PrimaryButton from '../Components/PrimaryButton';
import { navigate, navigateAndSimpleReset } from '@app/navigators';

const styles = StyleSheet.create({
    emailContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFF',
        // paddingBottom: 60,
        padding: 18,
        // marginBottom: 40,
    },
    title: {
        marginTop: 12,
    },
    subtitle: {
        marginHorizontal: 18,
        marginTop: 12,
        textAlign: 'center',
        color: '#000',
    },
    secondaryButtonConatiner: {
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 24,
        height: 55,
        width: '100%',
        borderRadius: 18,
    },
    text: { color: '#2A368A', fontWeight: 'bold', fontSize: 18, letterSpacing: 1 },
});

const EmailVerification = () => {
    const [getUser, { data: userData, isLoading: isUserLoading }] = useGetUserMutation();
    const [resendEmail, { data: emailData, isLoading: isEmailLoading }] = useResendEmailMutation();
    const [getIsEmailVerified, { data: isEmailVerified, isLoading: isEmailVerifiedLoading }] =
        useIsEmailVerifiedMutation();

    useEffect(() => {
        getUser();
    }, []);
    useEffect(() => {
        console.log(userData);
        if (userData) {
            resendEmail();
        }
    }, [userData]);

    useEffect(() => {
        if (isEmailVerified && isEmailVerified?.status === 'verified') {
            navigateAndSimpleReset('HomeNavigator');
        }
    }, [isEmailVerified]);

    if (isUserLoading || isEmailLoading) {
        return <Loading />;
    }

    return (
        <SafeAreaView style={styles.emailContainer}>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 60,
                    // backgroundColor: '#000',
                }}
            >
                <LottieView
                    autoPlay
                    loop
                    style={{ width: SIZES.width * 0.4 }}
                    source={require('../../../assets/EmailFail.json')}
                />
            </View>
            <View style={{ width: '100%', padding: 18, alignItems: 'center' }}>
                <Text style={FONTS.h3}>Email Verification pending</Text>
                <Text style={styles.subtitle}>
                    Hey Folk, Your email verification in pending please verify your app by cliking the link sent to your
                    email {userData?.data.email}
                </Text>

                <PrimaryButton OnPress={() => resendEmail()} isLoading={isEmailLoading} InputText={'Resend Email'} />
                <Pressable onPress={() => getIsEmailVerified()} style={styles.secondaryButtonConatiner}>
                    {isEmailVerifiedLoading ? (
                        <ActivityIndicator color={'#2A368A'} />
                    ) : (
                        <Text style={styles.text}>{'Try Again'}</Text>
                    )}
                </Pressable>
                <Pressable
                    onPress={() => navigate('AuthStack', { screen: 'Login' })}
                    style={styles.secondaryButtonConatiner}
                >
                    <Text style={styles.text}>{'Login as different user'}</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

export default EmailVerification;
