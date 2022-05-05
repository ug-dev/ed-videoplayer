import React from 'react';
import { navigateAndSimpleReset } from '@app/navigators';
import { Pressable, Text } from 'react-native';
import STYLES from '../Styles/PrimaryButton.style';

const PrimaryButton = ({ InputText }) => {
    return (
        <Pressable onPress={() => navigateAndSimpleReset('HomeNavigator')} style={STYLES.primaryButtonConatiner}>
            <Text style={STYLES.text}>{InputText}</Text>
        </Pressable>
    );
};

export default PrimaryButton;
