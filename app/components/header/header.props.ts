import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { IconTypes } from '../icon/icons';
export interface HeaderProps {
    LeftIcon?: React.FC<SvgProps>;

    RightIcon?: React.FC<SvgProps>;

    onScanner?: any;

    isScanner?: boolean;

    headerText?: string;

    isChat?: boolean;

    avatarPath?: string;

    headerTx?: string;

    /**
     * Icon that should appear on the left
     */
    leftIcon?: React.FC<SvgProps>;

    /**
     * What happens when you press the left icon
     */
    onLeftPress?(): void;

    /**
     * Icon that should appear on the right
     */
    rightIcon?: React.FC<SvgProps>;

    /**
     * What happens when you press the right icon
     */
    onRightPress?(): void;

    /**
     * Container style overrides.
     */
    style?: StyleProp<ViewStyle>;

    /**
     * Title style overrides.
     */
    titleStyle?: StyleProp<TextStyle>;
}
