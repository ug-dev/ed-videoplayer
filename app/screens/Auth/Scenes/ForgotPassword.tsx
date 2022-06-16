import { goBack, navigate } from '@app/navigators';
import { Formik, FormikProps } from 'formik';
import React, { useEffect } from 'react';
import { Keyboard, Pressable, SafeAreaView, View } from 'react-native';
import AuthHeader from '../Components/AuthHeader';
import InputBox from '../Components/InputBox';
import PrimaryButton from '../Components/PrimaryButton';
import STYLES from '../Styles/ForgotPassword.style';
import * as Yup from 'yup';
import { useForgetPasswordInitMutation } from '@app/services/redux/api/auth';
import Snackbar from 'react-native-snackbar';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ForgotPasswordProps {}
interface IForgotFormData {
    email: string;
}
const validationSchema = Yup.object().shape({
    email: Yup.string().email().required().nullable(),
});
const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
    const initialValues: IForgotFormData = {
        email: '',
    };
    const [forgotPasswordInit, { data, isLoading, isError, error }] = useForgetPasswordInitMutation();
    const handleSubmit = ({ email }) => {
        Keyboard.dismiss();
        forgotPasswordInit(email);
    };
    useEffect(() => {
        if (data) {
            navigate('ForgotPasswordCode');
        }
        if (error) {
            console.log('hi', { error });
            Snackbar.show({ text: 'User not found with email', backgroundColor: '#000' });
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
                        onSubmit={(e) => handleSubmit({ email: e.email })}
                    >
                        {(formikProps: FormikProps<IForgotFormData>) => (
                            <>
                                <InputBox formikProps={formikProps} name="email" InputString="Email Address" />
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

export default ForgotPassword;
