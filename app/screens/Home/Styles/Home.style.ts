import { SIZES } from '@app/theme/fonts';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    scrollContainer: { backgroundColor: '#fff', height: '100%', width: '100%' },
    container: { paddingHorizontal: 16 },
    bannerCardView: {
        height: SIZES.height * 0.24,
        justifyContent: 'space-between',
        backgroundColor: '#070C19',
        // padding: 16,
        borderRadius: 12,
        marginTop: 28,
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
});
