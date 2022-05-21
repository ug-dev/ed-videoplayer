import { COLORS, FONTS, typography } from '@app/theme';
import { SIZES } from '@app/theme/fonts';
import SCREEN from '@app/theme/sizes';
import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: COLORS.background,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    BOTTOM_CONTAINER: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 18,
        paddingBottom: 18,
        justifyContent: 'space-between',
    },
    TEXT_INPUT: {
        backgroundColor: COLORS.lightGrey,
        borderRadius: 12,
        height: 48,
        width: SCREEN.width - 96,
        paddingHorizontal: 12,
    },
    SEND_BUTTON_CONTAINER: {
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        height: 48,
        width: 48,
        borderRadius: 12,
    },
    /* HOME NAVIGATOR STYLES */
    NAV_CONTAINER: {
        alignItems: 'center',

        height: '100%',
        justifyContent: 'center',
    },
    IOS_NAV_CONTAINER: {
        // top: 16,
    },
    ICON_OPACITY: {
        opacity: 0.5,
    },
    TITLE_TEXT: {
        ...FONTS.body7,
        color: COLORS.primaryLight,
        marginTop: 4,
    },
    ACTIVE_TITLE_TEXT: {
        color: COLORS.primary,
    },
    LOADER_CONTAINER: {
        height: SIZES.height - SIZES.height * 0.24,
        width: SIZES.width,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
