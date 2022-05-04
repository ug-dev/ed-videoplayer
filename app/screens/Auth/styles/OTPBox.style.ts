import { COLORS, FONTS } from '@app/theme';
import { SIZES } from '@app/theme/fonts';
import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
    INPUT_BG: {
        width: '90%',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 40,
    },
    INPUT: {
        ...FONTS.body5,
        height: 48,
        width: SIZES.width * 0.1,
        minWidth: 42,
        color: COLORS.white,
        marginHorizontal: 10,
        borderRadius: 10,
        marginTop: 12,

        textAlign: 'center',
        paddingHorizontal: 14,
        backgroundColor: COLORS.secondaryBackground,
    },
    INPUT_BOTTOM: {
        paddingBottom: 4,
    },
    ACTIVE_INPUT: {
        backgroundColor: COLORS.primary,
    },
});
