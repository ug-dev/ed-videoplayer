import React from 'react';
import { Pressable, Text } from 'react-native';
import STYLES from '../Styles/PrimaryButton.style';

interface PrimaryButtonProps {
    InputText: string;
    OnPress?: () => void;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ InputText, OnPress }) => {
    return (
        <Pressable onPress={OnPress || null} style={STYLES.primaryButtonConatiner}>
            <Text style={STYLES.text}>{InputText}</Text>
        </Pressable>
    );
};

export default PrimaryButton;
