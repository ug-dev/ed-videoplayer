import { Text, View, StyleSheet } from 'react-native';
import { Button, Image } from 'react-native-elements';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { AppImages } from '@app/utils/AppContants';
import { getString } from '@app/utils/Helpers';
import { ICreateAccountFormData } from '@app/utils/Entities';
import { appTheme } from '@app/utils/theme';
import { validation } from '@app/utils/validation';
import InputField from '../components/InputField';

Yup.setLocale(validation);

interface ICreateAccountScreenProps {}

const validationSchema = Yup.object().shape({
    name: Yup.string().required().nullable(),
    email: Yup.string().email().required().nullable(),
    password: Yup.string().required().nullable(),
});

const initialValues: ICreateAccountFormData = {
    name: '',
    email: '',
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
    footer_font_style: { marginBottom: 20, color: appTheme.colors?.secondary, fontSize: 12 },
});

export default function CreateAccountScreen(props: ICreateAccountScreenProps) {
    const handleOnSubmit = (
        formData: ICreateAccountFormData,
        formikHelpers: FormikHelpers<ICreateAccountFormData>,
    ) => {};

    return (
        <View style={styles.rootView}>
            <View style={styles.titleView}>
                <Image source={AppImages.logo} style={styles.logoImage} />
                <Text style={styles.title}>{getString('create_account')}</Text>
            </View>
            <View style={styles.formContainer}>
                <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleOnSubmit}
                >
                    {(formikProps: FormikProps<ICreateAccountFormData>) => (
                        <>
                            <InputField name="name" placeholder={getString('name')} />

                            <InputField name="email" placeholder={getString('email_address')} />

                            <InputField name="password" placeholder={getString('password')} secureTextEntry />

                            <Button
                                disabled={formikProps.isSubmitting}
                                title="Sign Up"
                                onPress={() => {
                                    formikProps.handleSubmit();
                                }}
                            />
                        </>
                    )}
                </Formik>
            </View>
            <View style={{ flexGrow: 1, justifyContent: 'flex-end' }}>
                <Text style={styles.footer_font_style}>{getString('disclaimer_create_account')}</Text>
            </View>
        </View>
    );
}
