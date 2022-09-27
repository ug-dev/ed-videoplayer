import { navigate, navigateAndSimpleReset } from '@app/navigators';
import { useLoginMutation } from '@app/services/redux/api/auth';
import { saveString } from '@app/utils/storage';
import { validation } from '@app/utils/validation';
import React, { useEffect } from 'react';
import { Keyboard, Pressable, SafeAreaView, Text, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Snackbar from 'react-native-snackbar';
import * as Yup from 'yup';
import AuthHeader from '../Components/AuthHeader';
import InputBox from '../Components/InputBox';
import PrimaryButton from '../Components/PrimaryButton';
import STYLES from '../Styles/Login.style';

import { ILoginFormData } from '@app/utils/Entities';
import { Formik, FormikProps } from 'formik';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface LoginProps {}
Yup.setLocale(validation);

const validationSchema = Yup.object().shape({
    email: Yup.string().email().required().nullable(),
    password: Yup.string().required().nullable(),
});
const initialValues: ILoginFormData = {
    email: '',
    password: '',
};

const Login: React.FC<LoginProps> = () => {
    const [login, { isLoading, isSuccess, isError, data, error }] = useLoginMutation();

    useEffect(() => {
        // console.log({ isLoading, isSuccess, isError, data });
        if (isSuccess && data) {
            const { access_token: accessToken, data: Data } = data;
            console.log('hii', Data);

            saveString('accessToken', accessToken);
            if (Data?.email_verified_at) {
                navigateAndSimpleReset('HomeNavigator');
            } else {
                navigateAndSimpleReset('EmailVerification');
            }
        }
        if (isError) {
            console.log({ error });
            Snackbar.show({ text: error?.data?.errors[0], backgroundColor: '#000' });
        }
    }, [isLoading, isSuccess, isError, data]);

    const handleLogin = async ({ email, password }) => {
        Keyboard.dismiss();
        const deviceId = await DeviceInfo.getAndroidId();
        console.log({ deviceId });

        login({ email, password, device_id: deviceId });
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <Pressable onPress={() => Keyboard.dismiss()} style={STYLES.loginContainer}>
                <View>
                    <AuthHeader />
                    <Formik
                        enableReinitialize={true}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        validateOnChange={false}
                        onSubmit={(e) => handleLogin({ email: e.email, password: e.password })}
                    >
                        {(formikProps: FormikProps<ILoginFormData>) => (
                            <>
                                <View>
                                    <InputBox
                                        keyboardType="email-address"
                                        formikProps={formikProps}
                                        name="email"
                                        InputString="Email Address"
                                    />
                                    <InputBox
                                        secureTextEntry={true}
                                        formikProps={formikProps}
                                        name="password"
                                        InputString="Password"
                                    />
                                </View>
                                <Pressable onPress={() => navigate('ForgotPassword')}>
                                    <Text style={STYLES.forgotPasswordText}>Forgot Password?</Text>
                                </Pressable>

                                <PrimaryButton
                                    isLoading={isLoading}
                                    InputText={'Login'}
                                    OnPress={() => formikProps.handleSubmit()}
                                />

                                <Pressable onPress={() => navigate('SignUp')}>
                                    <Text style={STYLES.lowerText}>Or</Text>
                                </Pressable>
                                <PrimaryButton
                                    styles={{ marginTop: 0 }}
                                    isLoading={false}
                                    InputText={'Sign Up'}
                                    OnPress={() => navigate('SignUp')}
                                />
                            </>
                        )}
                    </Formik>
                </View>
            </Pressable>
        </SafeAreaView>
    );
};

export default Login;
