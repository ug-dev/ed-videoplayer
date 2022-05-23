import React from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';
import STYLES from '../Styles/PrimaryButton.style';

interface PrimaryButtonProps {
    InputText: string;
    OnPress?: () => void;
    isLoading: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ InputText, OnPress, isLoading }) => {
    return (
        <Pressable onPress={OnPress || null} style={STYLES.primaryButtonConatiner}>
            {isLoading ? <ActivityIndicator color={'#FFF'} /> : <Text style={STYLES.text}>{InputText}</Text>}
        </Pressable>
    );
};

export default PrimaryButton;
