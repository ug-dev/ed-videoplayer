import { navigate } from '@app/navigators';
import React from 'react';
import { SafeAreaView, View } from 'react-native';
import AuthHeader from '../Components/AuthHeader';
import InputBox from '../Components/InputBox';
import PrimaryButton from '../Components/PrimaryButton';
import STYLES from '../Styles/SignUp.style';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SignUpProps {}

const SignUp: React.FC<SignUpProps> = () => {
    return (
        <SafeAreaView>
            <View style={STYLES.container}>
                <AuthHeader Title="Create Account" />
                <View style={STYLES.inputContainer}>
                    <InputBox InputString="Full Name" />
                    <InputBox InputString="Email Address" />
                    <InputBox InputString="Password" />
                </View>
                <PrimaryButton InputText={'SignUp'} OnPress={() => navigate('Subscription')} />
                {/* <Text style={{ color: '#828282', fontSize: 14, lineHeight: 20, marginTop: 24 }}>
                    Desclaimer: you can only use this account in this device
                </Text> */}
            </View>
        </SafeAreaView>
    );
};

export default SignUp;
