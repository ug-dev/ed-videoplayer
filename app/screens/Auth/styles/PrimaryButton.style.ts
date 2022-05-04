import { COLORS, FONTS } from '@app/theme';
import { SIZES } from '@app/theme/fonts';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    BTN_CONTAINER: {
        height: 52,
        width: SIZES.width * 0.9,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: COLORS.primary,
        marginVertical: 24,
    },
    BTN_TITLE: {
        ...FONTS.body6,
        color: COLORS.white,
        marginRight: 12,
    },
});
