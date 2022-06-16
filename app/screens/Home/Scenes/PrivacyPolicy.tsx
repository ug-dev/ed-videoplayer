import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AuthHeader from '@app/screens/Auth/Components/AuthHeader';
import { FONTS } from '@app/theme';

const PrivacyPolicy = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={{ paddingHorizontal: 16 }}>
                <AuthHeader />
                <Text style={[FONTS.h3, { marginVertical: 16 }]}>Privacy Policy</Text>
                <Text style={FONTS.body6}>
                    • We receive & store information about you such as your name, email address, payment methods,
                    telephone number, name of the school etc. {`\n`}• We collect this information in a number of ways
                    when you login and fill the form. {`\n`}• Purpose of collection and usage of personal information To
                    process your registration To enable you to use and receive the services offered and content provided
                    by App. {`\n`}• To contact you with regard to your account and in connection with any services or
                    content subscribed. {`\n`}• To study traffic patterns in order to improve website and App
                    performance, to customize the user experience and to provide you the best. {`\n`}• To assist in
                    identifying possible fraudulent activities.
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({});
