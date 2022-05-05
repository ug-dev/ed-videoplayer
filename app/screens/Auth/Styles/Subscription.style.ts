import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingBottom: 16,
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
    },
    marginT: { marginTop: 16 },
    dropdown: {
        height: 50,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    icon: {
        marginRight: 5,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        color: '#404B63',
        flex: 1,
        fontSize: 16,
    },
    placeholderStyle: {
        color: '#404B63',
        fontSize: 16,
    },
    selectedTextStyle: {
        color: '#404B63',
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    price: { color: '#404B63', textAlign: 'center', fontSize: 24, fontWeight: 'bold' },
    desclaimer: { color: '#8C93A1', textAlign: 'center', marginTop: 12 },
    selectText: { color: '#404B63', fontSize: 16, marginBottom: 12 },
    checkboxContainer: { flexDirection: 'row', alignItems: 'center' },
    checkboxValue: { color: '#404B63', fontSize: 16 },
});
