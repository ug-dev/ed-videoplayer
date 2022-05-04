import { COLORS, FONTS } from '@app/theme';
import { SIZES } from '@app/theme/fonts';
import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
    CONTAINER: {
        width: SIZES.width,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    HEADING: {
        ...FONTS.h2,
    },
    TOP_CONTAINER: {
        marginTop: 12,
        width: SIZES.width,
        alignItems: 'center',
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
    IMG_CONTAINER: {
        height: SIZES.height * 0.16,
        width: SIZES.width,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32,
    },
    IMG_BG: {
        height: SIZES.height * 0.15,
        width: SIZES.height * 0.15,
        borderRadius: SIZES.height * 0.15,
        backgroundColor: COLORS.Secondary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    IMG_PEN: {
        position: 'absolute',
        bottom: -SIZES.width * 0.02,
        right: -SIZES.width * 0.02,
    },
});
