import { navigate, navigateAndSimpleReset } from '@app/navigators';
import React from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import AuthHeader from '../Components/AuthHeader';
import InputBox from '../Components/InputBox';
import PrimaryButton from '../Components/PrimaryButton';
import STYLES from '../Styles/Login.style';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
    return (
        <SafeAreaView>
            <View style={STYLES.loginContainer}>
                <View>
                    <AuthHeader Title="Login Here" />
                    <Text style={STYLES.loginTopText}>
                        Get Cources of any Standard, Engineer, Etc. 1 month free, then $10/Month
                    </Text>
                    <View style={STYLES.inputBoxContainer}>
                        <InputBox InputString="Email Address" />
                        <InputBox InputString="Password" />
                    </View>
                    <Pressable onPress={() => navigate('ForgotPassword')}>
                        <Text style={STYLES.forgotPasswordText}>Forgot Password?</Text>
                    </Pressable>

                    <PrimaryButton InputText={'Login'} OnPress={() => navigateAndSimpleReset('HomeNavigator')} />
                </View>
                <Pressable onPress={() => navigate('SignUp')}>
                    <Text style={STYLES.lowerText}>
                        Don't have any? <Text style={STYLES.signUpText}>Create One.</Text>
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

export default Login;
