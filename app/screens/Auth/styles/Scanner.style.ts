import { COLORS, FONTS } from '@app/theme';
import { SIZES } from '@app/theme/fonts';
import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
    CONTAINER: {
        flex: 1,
        width: SIZES.width,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.background,
    },
    SCANNER: {
        height: SIZES.width * 0.8,
        width: SIZES.width * 0.8,
        overflow: 'hidden',
        borderRadius: 12,
    },
    BORDER_CONTAINER: {
        padding: 6,
        borderColor: COLORS.primary,
        borderWidth: 4,
        borderRadius: 12,
    },
});
