import { COLORS, FONTS } from '@app/theme';
import { SIZES } from '@app/theme/fonts';
import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
    CONTAINER: {
        width: SIZES.width,
        paddingHorizontal: 18,
        marginVertical: 24,
    },
    BTN_CONTAINER: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    LEFT_BTN: {
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        width: SIZES.width * 0.42,
        borderColor: COLORS.offWhite,
        borderWidth: 1,
        borderRadius: 12,
        backgroundColor: COLORS.background,
    },
    LEFT_TEXT: {
        ...FONTS.body6,
        color: COLORS.primaryText,
    },
    RIGHT_TEXT: {
        ...FONTS.body6,
        color: COLORS.white,
    },
    RIGHT_BTN: {
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        width: SIZES.width * 0.42,
        backgroundColor: COLORS.primary,
    },
    TEXT_CONTAINER: {
        alignItems: 'center',
        marginTop: 12,
    },
    TEXT: {
        ...FONTS.body7,
        color: COLORS.secondaryText,
    },
    ACTIVE_TEXT: {
        ...FONTS.body7,
        color: COLORS.primary,
    },
});
