import { goBack } from '@app/navigators';
import React from 'react';
import { Pressable, SafeAreaView, View } from 'react-native';
import AuthHeader from '../Components/AuthHeader';
import InputBox from '../Components/InputBox';
import PrimaryButton from '../Components/PrimaryButton';
import STYLES from '../Styles/ForgotPassword.style';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ForgotPasswordProps {}

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
    return (
        <SafeAreaView>
            <View style={STYLES.container}>
                <Pressable onPress={() => goBack()}>
                    <AuthHeader Title="Login Here" />
                </Pressable>
                <View style={STYLES.inputContainer}>
                    <InputBox InputString="Email Address" />
                </View>
                <PrimaryButton InputText={'Continue'} />
            </View>
        </SafeAreaView>
    );
};

export default ForgotPassword;
