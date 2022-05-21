import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    loginContainer: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingBottom: 18,
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
    },
    loginTopText: { color: '#B8C0C9', fontSize: 16, lineHeight: 24 },
    inputBoxContainer: { marginTop: 44 },
    forgotPasswordText: {
        color: '#404B63',
        alignSelf: 'flex-end',
        marginTop: 12,
        textDecorationLine: 'underline',
    },
    lowerText: {
        color: '#B8C0C9',
        fontSize: 14,
        textAlign: 'center',
        justifyContent: 'center',
    },
    signUpText: { color: '#2A368A', fontSize: 14 },
});
