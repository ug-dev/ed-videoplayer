import { SIZES } from '@app/theme/fonts';
import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('screen');

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
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 48,
    },
    shadowContainer: {
        shadowOffset: { width: 2, height: 6 },
        shadowOpacity: 0.1,
        shadowColor: '#404B63',
        shadowRadius: 10,
        borderRadius: 20,
        backgroundColor: '#FFF',
        width: width - 36,
        height: (width - 36) * 0.3,
        marginVertical: 10,
    },
    navShadowContainer: {
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.1,
        shadowColor: '#404B63',
        shadowRadius: 10,
        borderRadius: 20,
        backgroundColor: '#FFF',
        width: (width - 36) * 0.45,
        height: 36,
    },
    logoContainer: {
        height: (width - 36) * 0.3,
        width: (width - 36) * 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 18,
        borderBottomLeftRadius: 18,
    },
    nameContainer: {
        width: (width - 36) * 0.7,
        paddingHorizontal: 12,
        justifyContent: 'center',
        borderTopRightRadius: 18,
        borderBottomRightRadius: 18,
    },
    subjectText: {
        fontSize: 12,
        color: '#B8C0C9',
    },
    nameText: {
        fontSize: 16,
        color: '#121212',
        fontWeight: '800',
    },
    subjectCard: {
        width: SIZES.width - 32,
        flexDirection: 'row',
        borderRadius: 18,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
});
