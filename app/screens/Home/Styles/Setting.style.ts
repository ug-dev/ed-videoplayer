import { SIZES } from '@app/theme/fonts';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    screenConatiner: {
        flex: 1,
        padding: 12,
    },
    ProfileCard: {
        width: SIZES.width - 24,
        // marginHorizontal: 18,
        padding: 12,
        height: 100,

        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.1,
        shadowColor: '#404B63',
        shadowRadius: 10,
        borderRadius: 20,
        backgroundColor: '#FFF',
        flexDirection: 'row',
    },
    ProfileImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#60BCFF',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5,
    },
    rightContainer: {
        height: '100%',
        justifyContent: 'center',
        flex: 1,
        marginLeft: 24,
    },
    menuItem: {
        width: '100%',
        paddingVertical: 20,
        borderBottomColor: '#f0f0f0',
        borderBottomWidth: 1,
    },
});
