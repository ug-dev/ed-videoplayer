import { StyleSheet, TextInput, View } from 'react-native';
import { Text } from 'react-native-elements';
import React from 'react';
import { useField } from 'formik';
import { appTheme } from '@app/utils/theme';

interface IInputFieldProps {
    name: string;
    placeholder?: string;
    selectionColor?: string;
    secureTextEntry?: boolean;
}

const defaultProps: IInputFieldProps = {
    name: '',
    placeholder: '',
    selectionColor: appTheme.colors?.secondary,
    secureTextEntry: false,
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 10,
    },
    backgroundView: {
        backgroundColor: appTheme.colors?.lightGrey,
        height: 60,
        width: '100%',
        borderRadius: 10,
        justifyContent: 'center',
        padding: 10,
        borderColor: appTheme.colors?.primary,
        borderWidth: 1,
    },
    textInput: {
        fontSize: 18,
    },
    errorText: {
        color: 'red',
        marginLeft: 5,
    },
});

export default function InputField(props: IInputFieldProps) {
    const [field, meta, helpers] = useField(props.name);

    return (
        <View style={styles.container}>
            <View style={styles.backgroundView}>
                <TextInput
                    selectionColor={props.selectionColor}
                    style={styles.textInput}
                    placeholder={props.placeholder}
                    onChange={(e) => helpers.setValue(e.nativeEvent.text)}
                    secureTextEntry={props.secureTextEntry}
                />
            </View>
            {meta.error && <Text style={styles.errorText}>{meta.error}</Text>}
        </View>
    );
}

InputField.defaultProps = defaultProps;
