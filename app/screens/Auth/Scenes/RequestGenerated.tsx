import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AuthHeader from '../Components/AuthHeader';
import LottieView from 'lottie-react-native';
import { SIZES } from '@app/theme/fonts';
import { FONTS } from '@app/theme';
import PrimaryButton from '../Components/PrimaryButton';
import { navigate, navigateAndSimpleReset } from '@app/navigators';

const RequestGenerated = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <AuthHeader />
            <View style={{ flex: 1, alignItems: 'center' }}>
                <LottieView
                    style={{ width: SIZES.width * 0.7 }}
                    source={require('../../../assets/succesfull-payment.json')}
                    autoPlay
                    loop
                />
                <View style={{ padding: 12, alignItems: 'center' }}>
                    <Text style={{ ...FONTS.h3 }}>Hello, Student</Text>
                    <Text style={{ ...FONTS.body6, textAlign: 'center', paddingTop: 12 }}>
                        Please Complete the payment process with admin to start your subscription
                    </Text>
                </View>
                <View style={{ paddingHorizontal: 24, alignItems: 'center', width: '100%' }}>
                    <PrimaryButton
                        InputText="continue"
                        OnPress={() => {
                            navigateAndSimpleReset('HomeNavigator');
                        }}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default RequestGenerated;

const styles = StyleSheet.create({});
