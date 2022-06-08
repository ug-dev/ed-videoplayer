import { useField } from 'formik';
import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import STYLES from '../Styles/InputBox.style';

const InputBox = ({ InputString, name, formikProps, ...props }) => {
    const [field, meta, helpers] = useField(name);

    return (
        <>
            <View style={STYLES.inputContainer}>
                <TextInput
                    onBlur={() => field.value && formikProps.validateField(name)}
                    onChangeText={(e) => helpers.setValue(e)}
                    placeholderTextColor={'#B8C0C9'}
                    style={STYLES.input}
                    placeholder={InputString}
                    {...props}
                />
            </View>
            {meta.error && <Text style={STYLES.errorText}>{meta.error}</Text>}
        </>
    );
};

export default InputBox;
