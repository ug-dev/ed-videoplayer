import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { FONTS } from '@app/theme';
import AuthHeader from '@app/screens/Auth/Components/AuthHeader';

const TermsAndCondition = () => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                width: '100%',
                // height: SIZES.height * 0.5,
                backgroundColor: '#fff',
                alignItems: 'center',
                // flex: 1,
                // justifyContent: 'center',
                // borderRadius: 12,

                // padding: 24,
            }}
        >
            <AuthHeader />
            <View
                style={{
                    flex: 1,
                    padding: 20,
                }}
            >
                <Text style={{ ...FONTS.h5, marginBottom: 12 }}>Terms and Conditions</Text>
                <Text style={FONTS.body6}>
                    • Content of the application are subject to Copyright.{'\n'}• Clarity of video is Hd. still it is
                    dependent on your internet service. {'\n'}• Videos are not downloadable and sharable. Screenshot and
                    screen recording will not be allowed. {'\n'}• Once log in with one id in a particular device, same
                    id will not work for another device. once subscribed anyhow it is not refundable. {'\n'}• Due to any
                    reason if you want to change device then need to inform us about to change device. Once in a 12
                    months will be allowed to change. second time anyhow change in device will not be allowed
                    subscription time period is 12 months starting from May to April. {'\n'}• subscription will be ended
                    in the month month of April irrespective of the date of your subscription taken.
                </Text>
            </View>

            {/* <PrimaryButton isLoading={isOrderLoading} OnPress={() => handleNext()} InputText="Accept" /> */}
        </SafeAreaView>
    );
};

export default TermsAndCondition;

const styles = StyleSheet.create({});
