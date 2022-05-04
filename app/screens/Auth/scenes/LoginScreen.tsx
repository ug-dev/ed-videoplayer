import { StyleSheet, Text, View } from 'react-native';
import { Button, Image } from 'react-native-elements';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppImages } from '@app/utils/AppContants';
import { validation } from '@app/utils/validation';
import { ILoginFormData } from '@app/utils/Entities';
import InputField from '../components/InputField';
import { getString } from '@app/utils/Helpers';
import { appTheme } from '@app/utils/theme';
import { AuthNavigatorParamList } from '@app/navigators/AuthNav';

Yup.setLocale(validation);

interface ILoginScreenProps {}

const validationSchema = Yup.object().shape({
    userName: Yup.string().email().required().nullable(),
    password: Yup.string().required().nullable(),
});

const initialValues: ILoginFormData = {
    userName: '',
    password: '',
};
const styles = StyleSheet.create({
    rootView: { flex: 1, alignItems: 'center', backgroundColor: appTheme.colors?.bglight },
    logoImage: {
        width: 35,
        height: 35,
    },
    title: {
        fontSize: 25,
        marginLeft: 15,
        fontWeight: 'bold',
    },
    titleDescription: {
        width: '80%',
        fontSize: 15,
        color: appTheme.colors?.secondary,
    },
    titleView: {
        marginTop: 60,
        width: '85%',
        paddingLeft: 10,
        paddingBottom: 10,
        alignItems: 'center',
        flexDirection: 'row',
    },
    formContainer: {
        marginTop: 10,
        width: '85%',
        alignItems: 'center',
    },
    forgotPasswordView: { justifyContent: 'flex-end', flexDirection: 'row', width: '100%', marginRight: 20 },
    forgotPasswordText: { color: appTheme.colors?.secondary, textDecorationLine: 'underline' },
    createOneFontStyle: { marginLeft: 5, marginBottom: 20, color: appTheme.colors?.primary, fontWeight: 'bold' },
});

export default function LoginScreen(props: ILoginScreenProps) {
    const navigation = useNavigation<NavigationProp<AuthNavigatorParamList>>();
    const handleOnSubmit = (formData: ILoginFormData, formikHelpers: FormikHelpers<ILoginFormData>) => {};

    return (
        <View style={styles.rootView}>
            <View style={styles.titleView}>
                <Image source={AppImages.logo} style={styles.logoImage} />
                <Text style={styles.title}>{getString('login_here')}</Text>
            </View>
            <Text style={styles.titleDescription}>{getString('login_title_description')}</Text>
            <View style={styles.formContainer}>
                <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleOnSubmit}
                >
                    {(formikProps: FormikProps<ILoginFormData>) => (
                        <>
                            <InputField name="userName" placeholder={getString('email_address')} />

                            <InputField name="password" placeholder={getString('password')} secureTextEntry />

                            <View style={styles.forgotPasswordView}>
                                <Text
                                    style={styles.forgotPasswordText}
                                    onPress={() => navigation.navigate('ForgotPassword')}
                                >
                                    {getString('forgot_password?')}
                                </Text>
                            </View>

                            <Button
                                disabled={formikProps.isSubmitting}
                                title="Login"
                                onPress={() => {
                                    formikProps.handleSubmit();
                                }}
                            />
                        </>
                    )}
                </Formik>
            </View>
            <View style={{ flexGrow: 1, justifyContent: 'flex-end' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ marginBottom: 20 }}>{getString('dont_have_account')}</Text>
                    <Text
                        style={styles.createOneFontStyle}
                        onPress={() => {
                            navigation.navigate('CreateAccount');
                        }}
                    >
                        {getString('create_one')}
                    </Text>
                </View>
            </View>
        </View>
    );
}
