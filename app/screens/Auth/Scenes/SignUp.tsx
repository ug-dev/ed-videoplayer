import { navigate, navigateAndSimpleReset } from '@app/navigators';
import { Formik, FormikProps } from 'formik';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import AuthHeader from '../Components/AuthHeader';
import InputBox from '../Components/InputBox';
import PrimaryButton from '../Components/PrimaryButton';
import STYLES from '../Styles/SignUp.style';
import * as Yup from 'yup';
import { validation } from '@app/utils/validation';
import { ICreateAccountFormData } from '@app/utils/Entities';
import { useRegisterMutation } from '@app/services/redux/api/auth';
import { saveString } from '@app/utils/storage';
import Snackbar from 'react-native-snackbar';
import DeviceInfo from 'react-native-device-info';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { SIZES } from '@app/theme/fonts';
import { FONTS } from '@app/theme';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SignUpProps {}

Yup.setLocale(validation);

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required().nullable().trim(),
    lastName: Yup.string().required().nullable().trim(),
    phone: Yup.string().required().nullable().length(10).trim(),
    email: Yup.string().email().required().nullable().trim(),
    password: Yup.string().required().nullable().trim(),
    confirmPassword: Yup.string().required().nullable().trim(),
    schoolName: Yup.string().required().nullable(),
    cityName: Yup.string().required().nullable().trim(),
    referral: Yup.string(),
});

const initialValues: ICreateAccountFormData = {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    schoolName: '',
    cityName: '',
    referral: '',
};

const SignUp: React.FC<SignUpProps> = () => {
    const [signUp, { isLoading, isSuccess, isError, data, error }] = useRegisterMutation();
    const [showTermsModel, setShowTermsModel] = useState(false);
    const [isAccepted, setIsAccepted] = useState(false);
    const handleSignUp = async (e: ICreateAccountFormData) => {
        const deviceId = await DeviceInfo.getAndroidId();
        signUp({ ...e, loggedInDeviceId: deviceId });
    };

    useEffect(() => {
        console.log({ isLoading, isSuccess, isError, data });
        if (isSuccess && data) {
            const { access_token: accessToken, data: Data } = data;
            console.log(Data);
            saveString('accessToken', accessToken);
            navigateAndSimpleReset('EmailVerification');
        }
        if (isError) {
            console.log({ error });
            Snackbar.show({ text: error?.data?.errors[0] });
        }
    }, [isLoading, isSuccess, isError, data]);
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

    const toggleModel = () => {
        setShowTermsModel(!showTermsModel);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <Modal
                transparent={true}
                style={{
                    width: SIZES.width,
                    height: SIZES.height,
                    alignItems: 'center',
                    flex: 1,
                    justifyContent: 'center',
                    backgroundColor: '#000',
                }}
                visible={showTermsModel}
            >
                <Pressable
                    onPress={toggleModel}
                    style={{
                        width: SIZES.width,
                        height: SIZES.height,
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        alignItems: 'center',
                        // flex: 1,
                        justifyContent: 'center',
                    }}
                >
                    <View
                        style={{
                            width: SIZES.width * 0.9,
                            // height: SIZES.height * 0.5,
                            backgroundColor: '#fff',
                            alignItems: 'center',
                            // flex: 1,
                            justifyContent: 'center',
                            borderRadius: 12,
                            padding: 20,
                        }}
                    >
                        <Text style={{ ...FONTS.h5, marginBottom: 12 }}>Disclaimer Terms and Conditions</Text>
                        <Text>
                            • Content of the application are subject to Copyright.{'\n'}• Clarity of video is Hd. still
                            it is dependent on your internet service. {'\n'}• Videos are not downloadable and sharable.
                            Screenshot and screen recording will not be allowed. {'\n'}• Once log in with one id in a
                            particular device, same id will not work for another device. once subscribed anyhow it is
                            not refundable. {'\n'}• Due to any reason if you want to change device then need to inform
                            us about to change device. Once in a 12 months will be allowed to change. second time anyhow
                            change in device will not be allowed subscription time period is 12 months starting from May
                            to April. {'\n'}• subscription will be ended in the month month of April irrespective of the
                            date of your subscription taken.
                        </Text>
                        {/* <PrimaryButton isLoading={isOrderLoading} OnPress={() => handleNext()} InputText="Accept" /> */}
                    </View>
                </Pressable>
            </Modal>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
            >
                <ScrollView>
                    <Formik
                        enableReinitialize={true}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        validateOnChange={false}
                        onSubmit={(e) => handleSignUp(e)}
                    >
                        {(formikProps: FormikProps<ICreateAccountFormData>) => (
                            <View style={STYLES.container}>
                                <AuthHeader Title="Create Account" />
                                <View>
                                    <InputBox
                                        formikProps={formikProps}
                                        name="firstName"
                                        InputString="Enter First Name"
                                    />
                                    <InputBox formikProps={formikProps} name="lastName" InputString="Enter Last Name" />
                                    <InputBox
                                        keyboardType="phone-pad"
                                        maxLength={10}
                                        formikProps={formikProps}
                                        name="phone"
                                        InputString="Enter Phone"
                                    />
                                    <InputBox
                                        keyboardType="email-address"
                                        formikProps={formikProps}
                                        name="email"
                                        InputString="Enter Email"
                                    />
                                    <InputBox
                                        secureTextEntry={true}
                                        formikProps={formikProps}
                                        name="password"
                                        InputString="Password"
                                    />
                                    <InputBox
                                        formikProps={formikProps}
                                        name="confirmPassword"
                                        InputString="Conform Password"
                                        secureTextEntry={true}
                                    />
                                    {/* <InputBox formikProps={formikProps} name="cityName" InputString="Enter your city" /> */}
                                    <InputBox
                                        formikProps={formikProps}
                                        name="schoolName"
                                        InputString="Enter your school name"
                                    />
                                    <InputBox
                                        formikProps={formikProps}
                                        name="cityName"
                                        InputString="Enter your City name"
                                    />
                                    <InputBox
                                        formikProps={formikProps}
                                        name="referral"
                                        InputString="Enter your Referral's name"
                                    />
                                </View>
                                <View
                                    style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginTop: 12 }}
                                >
                                    <BouncyCheckbox
                                        // textComponent={(props) => (
                                        //     <View>
                                        //         <Text>yash</Text>
                                        //         <Text>Bathe</Text>
                                        //     </View>
                                        // )}
                                        // key={index}
                                        size={25}
                                        // style={STYLES.checkboxStyle}
                                        fillColor="#2A368A"
                                        unfillColor="#FFFFFF"
                                        // textStyle={STYLES.checkBoxTextStyle}
                                        // text={item?.name + '( ₹' + item.fees + ')'}
                                        // iconStyle={STYLES.checkBoxIconStyle}
                                        onPress={(isChecked: boolean) => {
                                            setIsAccepted(isChecked);
                                            // handleSelectedSubject(item);

                                            // console.log({ isChecked });
                                        }}
                                    />
                                    <Text>Accept </Text>
                                    <Pressable
                                        onPress={() => {
                                            toggleModel();
                                        }}
                                    >
                                        <Text style={{ color: '#2A368A' }}>Terms & Condition</Text>
                                    </Pressable>
                                </View>

                                <PrimaryButton
                                    disabled={!isAccepted}
                                    isLoading={isLoading}
                                    InputText={'SignUp'}
                                    OnPress={() => {
                                        formikProps.handleSubmit();
                                    }}
                                />
                                {/* <Text style={{ color: '#828282', fontSize: 14, lineHeight: 20, marginTop: 24 }}>
                    Desclaimer: you can only use this account in this device
                </Text> */}
                            </View>
                        )}
                    </Formik>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default SignUp;
