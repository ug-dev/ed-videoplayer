import { SIZES } from '@app/theme/fonts';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: { backgroundColor: '#fff', paddingHorizontal: 16, width: '100%', height: '100%' },
    importantContainer: {
        height: SIZES.height * 0.24,
        backgroundColor: '#070C19',
        borderRadius: 12,
        marginBottom: 16,
    },
    name: { color: '#fff', fontSize: 14 },
    courseName: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
    importantLikeIcon: { position: 'absolute', left: 16, top: 16, zIndex: 1 },
    importantBg: { width: '100%', height: '100%', borderRadius: 12 },
    importantText: { position: 'absolute', bottom: 16, left: 16 },
    scrollContainer: { marginTop: 12 },
});
