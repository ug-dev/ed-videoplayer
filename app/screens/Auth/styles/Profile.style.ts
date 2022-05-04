import { COLORS, FONTS } from '@app/theme';
import { FONT_STYLE, SIZES } from '@app/theme/fonts';
import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
    CONTAINER: {
        width: SIZES.width,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 120,
    },
    TOP_CONTAINER: {
        alignItems: 'center',
        marginTop: SIZES.height * 0.05,
        width: '100%',
    },
    USER_IMG_BG: {
        borderRadius: (SIZES.width * 0.28) / 5,
        borderColor: COLORS.primary,
        borderWidth: 2,
        padding: 4,
    },
    USER_IMG: {
        height: SIZES.width * 0.28,
        width: SIZES.width * 0.28,
        borderRadius: (SIZES.width * 0.28) / 6,
    },
    INPUT_BG: {
        width: '90%',
        marginTop: 40,
    },
    INPUT_HEADING: {
        ...FONTS.body6,
    },
    INPUT: {
        fontFamily: FONT_STYLE.semiBold,
        fontSize: SIZES.size5,
        lineHeight: SIZES.size5 + 4,
        letterSpacing: 1,
        height: 48,
        borderRadius: 6,
        marginTop: 12,
        paddingHorizontal: 14,
        color: COLORS.primaryText,
        backgroundColor: COLORS.secondaryBackground,
    },
    LOGOUT_CONTAINER: {
        flexDirection: 'row',
    },
    LOGOUT_TEXT: {
        ...FONTS.body6,
        color: COLORS.primary,
        marginLeft: 18,
    },
    LOADER_CONTAINER: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    SCANNER_BTN: {
        ...FONTS.body6,
        color: COLORS.primary,
        marginLeft: 18,
        borderColor: COLORS.primary,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
});
