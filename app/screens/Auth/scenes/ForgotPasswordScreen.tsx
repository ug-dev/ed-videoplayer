import { StyleSheet, Text, View } from 'react-native';
import { Button, Image } from 'react-native-elements';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { validation } from '@app/utils/validation';
import { IForgotPasswordFormData } from '@app/utils/Entities';
import { AppImages } from '@app/utils/AppContants';
import { getString } from '@app/utils/Helpers';
import InputField from '../components/InputField';
import { appTheme } from '@app/utils/theme';
import { AuthNavigatorParamList } from '@app/navigators/AuthNav';

Yup.setLocale(validation);

interface IForgotPasswordScreenProps {}

const validationSchema = Yup.object().shape({
    email: Yup.string().email().required().nullable(),
});

const initialValues: IForgotPasswordFormData = {
    email: '',
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

export default function ForgotPasswordScreen(props: IForgotPasswordScreenProps) {
    const navigation = useNavigation<NavigationProp<AuthNavigatorParamList>>();
    const handleOnSubmit = (
        formData: IForgotPasswordFormData,
        formikHelpers: FormikHelpers<IForgotPasswordFormData>,
    ) => {};

    return (
        <View style={styles.rootView}>
            <View style={styles.titleView}>
                <Image source={AppImages.logo} style={styles.logoImage} />
                <Text style={styles.title}>{getString('forgot_password')}</Text>
            </View>
            <View style={styles.formContainer}>
                <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleOnSubmit}
                >
                    {(formikProps: FormikProps<IForgotPasswordFormData>) => (
                        <>
                            <InputField name="email" placeholder={getString('email_address')} />

                            <Button
                                disabled={formikProps.isSubmitting}
                                title={getString('continue')}
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
