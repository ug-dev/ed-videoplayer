import { COLORS, FONTS } from '@app/theme';
import { SIZES } from '@app/theme/fonts';
import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
    CONTAINER: {
        flex: 1,
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
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 40,
    },
    INPUT: {
        ...FONTS.body5,
        height: 48,
        width: SIZES.width * 0.1,
        minWidth: 42,
        marginHorizontal: 10,

        borderRadius: 10,
        marginTop: 12,
        paddingBottom: Platform.OS === 'ios' ? 4 : 0,
        textAlign: 'center',
        paddingHorizontal: 14,
        backgroundColor: COLORS.secondaryBackground,
    },
    ACTIVE_INPUT: {
        backgroundColor: COLORS.error,
    },
});
