import { SIZES } from '@app/theme/fonts';
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
    subjectCardShadow: {
        marginVertical: 20,
        // backgroundColor: 'black',
        borderRadius: 18,

        // width: '100%',
    },
    titleContainer: {
        width: '100%',
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 16,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 24,
        fontWeight: '800',
        color: '#404B63',
    },
    languagesContainer: {
        width: (width - 36) * 0.45,
        flexDirection: 'row',
        borderRadius: 24,
        // backgroundColor: 'red',
    },
    languagesLeft: {
        width: '50%',
        paddingLeft: 12,
        paddingRight: 8,
        paddingVertical: 8,
        borderTopLeftRadius: 24,
        borderBottomLeftRadius: 24,
        fontWeight: '700',
        textAlign: 'right',
    },
    languagesRight: {
        width: '50%',
        paddingRight: 12,
        paddingLeft: 8,
        paddingVertical: 8,
        // color: 'white',
        // backgroundColor: '#2A368A',
        // backgroundColor: 'red',
        borderTopRightRadius: 24,
        borderBottomRightRadius: 24,
        fontWeight: '700',
    },
});
