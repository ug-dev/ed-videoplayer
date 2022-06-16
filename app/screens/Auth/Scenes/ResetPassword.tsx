import { goBack, navigate, navigateAndReplace, navigateAndSimpleReset } from '@app/navigators';
import { Formik, FormikProps } from 'formik';
import React, { useEffect } from 'react';
import { Keyboard, Pressable, SafeAreaView, View } from 'react-native';
import AuthHeader from '../Components/AuthHeader';
import InputBox from '../Components/InputBox';
import PrimaryButton from '../Components/PrimaryButton';
import STYLES from '../Styles/ForgotPassword.style';
import * as Yup from 'yup';
import {
    useForgetPasswordCodeCheckMutation,
    useForgetPasswordInitMutation,
    useResetPasswordCodeMutation,
} from '@app/services/redux/api/auth';
import { loadString, remove, saveString } from '@app/utils/storage';
import { getString } from '@app/utils/Helpers';
import Snackbar from 'react-native-snackbar';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ForgotPasswordProps {}
interface IResetFormData {
    password: string;
    confirmPassword: string;
}
const validationSchema = Yup.object().shape({
    password: Yup.string().required().nullable(),
    confirmPassword: Yup.string().required().nullable(),
});
const ResetPassword: React.FC<ForgotPasswordProps> = () => {
    const initialValues: IResetFormData = {
        password: '',
        confirmPassword: '',
    };
    const [resetPassword, { data, isLoading, isError, error }] = useResetPasswordCodeMutation();
    const handleSubmit = async ({ password, confirmPassword }) => {
        Keyboard.dismiss();
        const code = await loadString('verifyCode');
        resetPassword({ code, password, confirmPassword });
    };
    useEffect(() => {
        if (data) {
            // saveString('verifyCode', data?.code);
            // navigate();
            remove('verifyCode');
            if (data?.success) {
                navigateAndSimpleReset('Login');
            }
            console.log({ data });
        }
        if (error) {
            console.log({ error });

            Snackbar.show({
                text: error?.data?.error[0],
                backgroundColor: '#000',
            });
        }
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
                        onSubmit={(e) => handleSubmit({ password: e.password, confirmPassword: e.confirmPassword })}
                    >
                        {(formikProps: FormikProps<IResetFormData>) => (
                            <>
                                {/* <InputBox formikProps={formikProps} name="code" InputString="Verification Code" /> */}
                                <InputBox formikProps={formikProps} name="password" InputString="Password" />

                                <InputBox
                                    formikProps={formikProps}
                                    name="confirmPassword"
                                    InputString="Confirm Password"
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

export default ResetPassword;
