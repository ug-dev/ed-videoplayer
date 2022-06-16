import { SIZES } from '@app/theme/fonts';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    scrollContainer: { backgroundColor: '#fff', height: '100%', width: '100%', position: 'relative' },
    container: { paddingHorizontal: 16, position: 'relative' },
    bannerCardView: {
        width: SIZES.width - 32,
        height: SIZES.height * 0.24,
        justifyContent: 'space-between',
        backgroundColor: '#070C19',
        paddingBottom: 12,
        borderRadius: 12,
        marginTop: 28,
        // overflow: 'hidden',
    },
    bannerFullscreen: {
        width: SIZES.width,
        height: SIZES.height * 0.8,
        position: 'absolute',
        top: 0,
        left: 0,
        // bottom: 0,
        zIndex: 100,
        // flex: 1,
        backgroundColor: 'black',
    },

    bannerInnerImage: { alignSelf: 'flex-end', marginEnd: 12 },
    bannerInnerText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
    bottomSection: { marginTop: 24 },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    firstText: { color: '#121212', fontWeight: 'bold', fontSize: 20 },
    impText: { color: '#AFAFAF', fontSize: 16 },
    viewAllContainer: { color: '#121212', textTransform: 'uppercase', fontSize: 16 },
    playerButton: {
        position: 'absolute',
        left: (SIZES.width - 32) * 0.5 - 40,
        top: SIZES.height * 0.12 - 40,
    },
});
