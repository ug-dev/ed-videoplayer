import { RKLogo } from '@app/assets';
import { navigateAndSimpleReset } from '@app/navigators';
import React from 'react';
import { Pressable, SafeAreaView, Text, TextInput, View } from 'react-native';

interface SignUpProps {}

const InputBox = ({ InputString }) => {
    return (
        <View
            style={{
                width: '100%',
                height: 55,
                marginVertical: 8,
                paddingHorizontal: 12,
                backgroundColor: '#F6F7FB',
                borderRadius: 18,
            }}
        >
            <TextInput style={{ height: '100%' }} placeholder={InputString} />
        </View>
    );
};

const SignUp: React.FC<SignUpProps> = () => {
    return (
        <SafeAreaView>
            <View
                style={{
                    backgroundColor: '#fff',
                    paddingHorizontal: 16,
                    width: '100%',
                    height: '100%',
                }}
            >
                <View
                    style={{
                        position: 'relative',
                        alignItems: 'center',
                        flexDirection: 'row',
                        width: '100%',
                        height: 60,
                    }}
                >
                    <RKLogo />
                    <Text style={{ color: '#404B63', fontWeight: 'bold', fontSize: 22, marginLeft: 12 }}>
                        Login Here
                    </Text>
                </View>

                <View style={{ marginTop: 44 }}>
                    <InputBox InputString="Full Name" />
                    <InputBox InputString="Email Address" />
                    <InputBox InputString="Password" />
                </View>
                <Pressable
                    onPress={() => navigateAndSimpleReset('HomeNavigator')}
                    style={{
                        backgroundColor: '#2A368A',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 24,
                        height: 55,
                        borderRadius: 18,
                    }}
                >
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>SignUp</Text>
                </Pressable>
                <Text style={{ color: '#828282', fontSize: 14, lineHeight: 20, marginTop: 24 }}>
                    Desclaimer: you can only use this account in this device
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default SignUp;
