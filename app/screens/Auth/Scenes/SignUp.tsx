import { navigate } from '@app/navigators';
import { Formik, FormikProps } from 'formik';
import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import AuthHeader from '../Components/AuthHeader';
import InputBox from '../Components/InputBox';
import PrimaryButton from '../Components/PrimaryButton';
import STYLES from '../Styles/SignUp.style';
import * as Yup from 'yup';
import { validation } from '@app/utils/validation';
import { ICreateAccountFormData } from '@app/utils/Entities';
import { useRegisterMutation } from '@app/services/redux/api/auth';
import { saveString } from '@app/utils/storage';

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
});

const initialValues: ICreateAccountFormData = {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
};

const SignUp: React.FC<SignUpProps> = () => {
    const [signUp, { isLoading, isSuccess, isError, data, error }] = useRegisterMutation();
    const handleSignUp = (e: ICreateAccountFormData) => {
        signUp(e);
    };

    useEffect(() => {
        console.log({ isLoading, isSuccess, isError, data });
        if (isSuccess && data) {
            const { access_token: accessToken, data: Data } = data;
            console.log(Data);
            saveString('accessToken', accessToken);
        }
        if (isError) {
            console.log({ error });

            Snackbar.show({ text: error?.data?.errors[0] });
        }
    }, [isLoading, isSuccess, isError, data]);

    return (
        <SafeAreaView>
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
                                <InputBox formikProps={formikProps} name="firstName" InputString="Enter First Name" />
                                <InputBox formikProps={formikProps} name="lastName" InputString="Enter Last Name" />
                                <InputBox formikProps={formikProps} name="phone" InputString="Enter Phone" />

                                <InputBox formikProps={formikProps} name="email" InputString="Enter Email" />
                                <InputBox formikProps={formikProps} name="password" InputString="Password" />

                                <InputBox
                                    formikProps={formikProps}
                                    name="confirmPassword"
                                    InputString="Conform Password"
                                />
                            </View>
                            <PrimaryButton
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
        </SafeAreaView>
    );
};

export default SignUp;
