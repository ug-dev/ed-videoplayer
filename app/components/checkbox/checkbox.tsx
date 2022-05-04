import * as React from 'react';
import { TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { COLORS, SPACING } from '../../theme';
import { Text } from '../text/text';
import { CheckboxProps } from './checkbox.props';

const ROOT: ViewStyle = {
    flexDirection: 'row',
    paddingVertical: SPACING[1],
    alignSelf: 'flex-start',
};

const DIMENSIONS = { width: 16, height: 16 };

const OUTLINE: ViewStyle = {
    ...DIMENSIONS,
    marginTop: 2, // finicky and will depend on font/line-height/baseline/weather
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primaryDarker,
    borderRadius: 1,
};

const FILL: ViewStyle = {
    width: DIMENSIONS.width - 4,
    height: DIMENSIONS.height - 4,
    backgroundColor: COLORS.primary,
};

const LABEL: TextStyle = { paddingLeft: SPACING[2] };

export function Checkbox(props: CheckboxProps) {
    const numberOfLines = props.multiline ? 0 : 1;

    const rootStyle = [ROOT, props.style];
    const outlineStyle = [OUTLINE, props.outlineStyle];
    const fillStyle = [FILL, props.fillStyle];

    const onPress = props.onToggle ? () => props.onToggle && props.onToggle(!props.value) : null;

    return (
        <TouchableOpacity activeOpacity={1} disabled={!props.onToggle} onPress={onPress} style={rootStyle}>
            <View style={outlineStyle}>{props.value && <View style={fillStyle} />}</View>
            <Text text={props.text} numberOfLines={numberOfLines} style={LABEL} />
        </TouchableOpacity>
    );
}
