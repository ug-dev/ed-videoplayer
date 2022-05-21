import React from 'react';
import { TextInput, View } from 'react-native';
import STYLES from '../Styles/InputBox.style';

const InputBox = ({ InputString }) => {
    return (
        <View style={STYLES.inputContainer}>
            <TextInput placeholderTextColor={'#B8C0C9'} style={STYLES.input} placeholder={InputString} />
        </View>
    );
};

export default InputBox;
