import { COLORS, FONTS } from '@app/theme';
import { SIZES } from '@app/theme/fonts';
import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
    CONTAINER: {
        width: SIZES.width,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.background,
    },
    HEADING: {
        ...FONTS.h2,
    },
    INPUT_BG: {
        width: '90%',
        marginTop: 40,
    },
    INPUT_HEADING: {
        ...FONTS.body6,
    },
    INPUT: {
        ...FONTS.body5,
        height: 48,
        borderRadius: 6,
        marginTop: 12,
        // paddingBottom: Platform.OS === 'ios' ? 3 : 0,
        paddingHorizontal: 14,
        backgroundColor: COLORS.secondaryBackground,
    },
    TOP_CONTAINER: {
        marginTop: 12,
        width: SIZES.width,
        alignItems: 'center',
    },
});
