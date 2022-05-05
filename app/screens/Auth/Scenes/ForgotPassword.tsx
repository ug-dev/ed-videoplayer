import { RKLogo } from '@app/assets';
import { goBack } from '@app/navigators';
import React from 'react';
import { Pressable, SafeAreaView, Text, TextInput, View } from 'react-native';

interface ForgotPasswordProps {}

const InputBox = () => {
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
            <TextInput style={{ height: '100%' }} placeholder="Email Address" />
        </View>
    );
};

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
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
                <Pressable
                    onPress={() => goBack()}
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
                        Forgot Password
                    </Text>
                </Pressable>
                <View style={{ marginTop: 44 }}>
                    <InputBox />
                </View>
                <View
                    style={{
                        backgroundColor: '#2A368A',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 24,
                        height: 55,
                        borderRadius: 18,
                    }}
                >
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Continue</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ForgotPassword;
