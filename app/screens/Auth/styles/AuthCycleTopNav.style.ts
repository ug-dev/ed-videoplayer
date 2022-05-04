import { COLORS } from '@app/theme';
import { SIZES } from '@app/theme/fonts';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    TOP_NAVIGATION: {
        height: SIZES.height * 0.1,
        width: SIZES.width,
        alignItems: 'center',
    },
    CONTAINER: {
        flex: 1,
        width: SIZES.width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    CIRCLE: {
        height: 12,
        width: 12,
        borderRadius: 14,
        backgroundColor: COLORS.primary,
    },
    CIRCLE_BACK: { justifyContent: 'center', alignItems: 'center', height: 22, width: 22 },
    BORDER_CIRCLE_HIDE: { opacity: 0, position: 'absolute' },
    BORDER_CIRCLE: {
        height: 22,
        width: 22,
        borderWidth: 1,
        borderRadius: 14,
        borderColor: COLORS.circle,
    },
    LINE: {
        height: 1,
        width: SIZES.width * 0.2,
        opacity: 1,
        backgroundColor: COLORS.secondLine,
    },
    LINE_CONTAINER: {
        height: 1,
        marginHorizontal: 12,
        position: 'relative',
        width: SIZES.width * 0.2,
        backgroundColor: 'red',
    },

    BACK_LINE: {
        position: 'absolute',
        left: 0,
    },

    FILLED_LINE: {
        height: 1,
        width: SIZES.width * 0.2,
        backgroundColor: COLORS.primary,
    },
});
