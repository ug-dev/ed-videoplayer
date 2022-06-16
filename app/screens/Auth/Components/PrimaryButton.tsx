import React from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';
import STYLES from '../Styles/PrimaryButton.style';

interface PrimaryButtonProps {
    InputText: string;
    OnPress?: () => void;
    isLoading: boolean;
    disabled?: boolean;
    styles?: any;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ InputText, OnPress, isLoading, disabled, styles }) => {
    return (
        <Pressable
            onPress={() => {
                if (!disabled && OnPress) OnPress();
            }}
            style={[STYLES.primaryButtonConatiner, disabled && { backgroundColor: '#717171' }, { ...styles }]}
        >
            {isLoading ? <ActivityIndicator color={'#FFF'} /> : <Text style={STYLES.text}>{InputText}</Text>}
        </Pressable>
    );
};

export default PrimaryButton;
