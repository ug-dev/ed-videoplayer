import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');

export default StyleSheet.create({
    searchBar: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 12,
        backgroundColor: '#F6F7FB',
        paddingHorizontal: 12,
        borderWidth: 1.5,
        borderColor: '#E5E6EA',
        height: 50,
    },
    searchBarTextInput: {
        fontSize: 14,
        width: width - 102,
        color: '#121212',
    },
    searchButton: {
        padding: 10,
        backgroundColor: '#2A368A',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
