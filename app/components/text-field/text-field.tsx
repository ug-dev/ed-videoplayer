import React from 'react';
import { StyleProp, TextInput, TextInputProps, TextStyle, View, ViewStyle } from 'react-native';
import { COLORS, SPACING, typography } from '../../theme';
import { Text } from '../text/text';

// the base styling for the container
const CONTAINER: ViewStyle = {
    paddingVertical: SPACING[3],
};

// the base styling for the TextInput
const INPUT: TextStyle = {
    fontFamily: typography.primary,
    color: COLORS.text,
    minHeight: 44,
    fontSize: 18,
    backgroundColor: COLORS.white,
};

// currently we have no presets, but that changes quickly when you build your app.
const PRESETS: { [name: string]: ViewStyle } = {
    default: {},
};

export interface TextFieldProps extends TextInputProps {
    /**
     * The Placeholder text if no placeholderTx is provided.
     */
    placeholder?: string;

    /**
     * The label text if no labelTx is provided.
     */
    label?: string;

    /**
     * Optional container style overrides useful for margins & padding.
     */
    style?: StyleProp<ViewStyle>;

    /**
     * Optional style overrides for the input.
     */
    inputStyle?: StyleProp<TextStyle>;

    /**
     * Various look & feels.
     */
    preset?: keyof typeof PRESETS;

    forwardedRef?: any;
}

/**
 * A component which has a label and an input together.
 */
export function TextField(props: TextFieldProps) {
    const {
        placeholder,

        label,
        preset = 'default',
        style: styleOverride,
        inputStyle: inputStyleOverride,
        forwardedRef,
        ...rest
    } = props;

    const containerStyles = [CONTAINER, PRESETS[preset], styleOverride];
    const inputStyles = [INPUT, inputStyleOverride];
    const actualPlaceholder = placeholder;

    return (
        <View style={containerStyles}>
            <Text preset="fieldLabel" text={label} />
            <TextInput
                placeholder={actualPlaceholder}
                placeholderTextColor={COLORS.lighterGrey}
                underlineColorAndroid={COLORS.transparent}
                {...rest}
                style={inputStyles}
                ref={forwardedRef}
            />
        </View>
    );
}
