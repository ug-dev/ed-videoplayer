import { SIZES } from '@app/theme/fonts';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: { flex: 1 },
    innerContainer: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    defaultPlayerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    playerContainer: {
        flex: 1,
    },
    topHeaderContainer: {
        position: 'absolute',
        zIndex: 1,
        width: SIZES.width,
        paddingHorizontal: 18,
        paddingTop: 16,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    playerButton: {
        position: 'absolute',
        left: SIZES.width * 0.5 - 40,
        top: SIZES.height * 0.15 - 40,
    },
    lowerTextContainer: { paddingVertical: 20, paddingHorizontal: 18 },
    primaryText: { color: '#B8C0C9', fontSize: 16 },
    titleText: { color: '#404B63', fontWeight: 'bold', fontSize: 24 },
    descText: { color: '#404B63', fontSize: 16, marginTop: 18 },
});
