import { goBack, navigate } from '@app/navigators';
import { Formik, FormikProps } from 'formik';
import React, { useEffect } from 'react';
import { Keyboard, Pressable, SafeAreaView, View } from 'react-native';
import AuthHeader from '../Components/AuthHeader';
import InputBox from '../Components/InputBox';
import PrimaryButton from '../Components/PrimaryButton';
import STYLES from '../Styles/ForgotPassword.style';
import * as Yup from 'yup';
import { useForgetPasswordCodeCheckMutation, useForgetPasswordInitMutation } from '@app/services/redux/api/auth';
import { saveString } from '@app/utils/storage';
import Snackbar from 'react-native-snackbar';
import { COLORS } from '@app/theme';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ForgotPasswordProps {}
interface ICodeFormData {
    code: string;
}
const validationSchema = Yup.object().shape({
    code: Yup.string().min(6).required(),
});
const ForgotPasswordCode: React.FC<ForgotPasswordProps> = () => {
    const initialValues: ICodeFormData = {
        code: '',
    };
    const [forgotPasswordCode, { data, isLoading, isError, error }] = useForgetPasswordCodeCheckMutation();
    const handleSubmit = ({ code }) => {
        Keyboard.dismiss();
        forgotPasswordCode(code);
    };
    useEffect(() => {
        if (data?.success) {
            saveString('verifyCode', data?.code);
            navigate('ResetPassword');
        }
        if (error) {
            Snackbar.show({
                text: 'please enter valid verification code',
                backgroundColor: '#000',
            });
        }
        console.log({ data, error });
    }, [data, error]);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <Pressable onPress={() => Keyboard.dismiss()} style={STYLES.container}>
                <Pressable onPress={() => goBack()}>
                    <AuthHeader />
                </Pressable>
                <View style={STYLES.inputContainer}>
                    <Formik
                        enableReinitialize={true}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        validateOnChange={false}
                        onSubmit={(e) => handleSubmit({ code: e.code })}
                    >
                        {(formikProps: FormikProps<ICodeFormData>) => (
                            <>
                                <InputBox
                                    keyboardType="number-pad"
                                    maxLength={6}
                                    formikProps={formikProps}
                                    name="code"
                                    InputString="Verification Code"
                                />
                                <PrimaryButton
                                    OnPress={() => formikProps.handleSubmit()}
                                    isLoading={isLoading}
                                    InputText={'Continue'}
                                />
                            </>
                        )}
                    </Formik>
                </View>
            </Pressable>
        </SafeAreaView>
    );
};

export default ForgotPasswordCode;
