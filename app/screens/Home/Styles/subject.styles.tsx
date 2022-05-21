import { SIZES } from '@app/theme/fonts';
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 18,
        paddingHorizontal: 18,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    subjectsContainer: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 12,
    },
    subjectCard: {
        // marginVertical: 10,
        width: '100%',
        flexDirection: 'row',
        borderRadius: 18,
        backgroundColor: 'white',
    },
    logoContainer: {
        height: (width - 36) * 0.3,
        width: (width - 36) * 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#070C19',
        borderTopLeftRadius: 18,
        borderBottomLeftRadius: 18,
    },
    nameContainer: {
        width: (width - 36) * 0.7,
        paddingLeft: 12,
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
        fontWeight: '800',
        color: '#121212',
    },
    subjectCardShadow: {
        marginVertical: 20,
        // backgroundColor: 'black',
        borderRadius: 18,

        // width: '100%',
    },
    shadowContainer: {
        shadowOffset: { width: 2, height: 6 },
        shadowOpacity: 0.1,
        shadowColor: '#404B63',
        shadowRadius: 10,
        borderRadius: 20,
        backgroundColor: '#FFF',
        width: SIZES.width - 36,
        height: (SIZES.width - 36) * 0.3,
        marginVertical: 10,
    },
});
