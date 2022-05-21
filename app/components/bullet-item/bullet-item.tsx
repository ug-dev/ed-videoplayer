import * as React from 'react';
import { ImageStyle, TextStyle, View, ViewStyle } from 'react-native';
import { SPACING, typography } from '../../theme';
import { Icon } from '../icon/icon';
import { Text } from '../text/text';

const BULLET_ITEM: ViewStyle = {
    flexDirection: 'row',
    marginTop: SPACING[4],
    paddingBottom: SPACING[4],
    borderBottomWidth: 1,
    borderBottomColor: '#3A3048',
};
const BULLET_CONTAINER: ViewStyle = {
    marginRight: SPACING[4] - 1,
    marginTop: SPACING[2],
};
const BULLET: ImageStyle = {
    width: 8,
    height: 8,
};
const BULLET_TEXT: TextStyle = {
    flex: 1,
    fontFamily: typography.primary,
    color: '#BAB6C8',
    fontSize: 15,
    lineHeight: 22,
};

export interface BulletItemProps {
    text: string;
}

export function BulletItem(props: BulletItemProps) {
    return (
        <View style={BULLET_ITEM}>
            <Icon icon="bullet" containerStyle={BULLET_CONTAINER} style={BULLET} />
            <Text style={BULLET_TEXT} text={props.text} />
        </View>
    );
}
