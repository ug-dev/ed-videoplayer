import { RKLogo } from '@app/assets';
import { navigate, navigateAndSimpleReset } from '@app/navigators';
import React from 'react';
import { Pressable, SafeAreaView, Text, TextInput, View } from 'react-native';

interface LoginProps {}

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

const Login: React.FC<LoginProps> = () => {
    return (
        <SafeAreaView>
            <View
                style={{
                    backgroundColor: '#fff',
                    paddingHorizontal: 16,
                    paddingBottom: 18,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                }}
            >
                <View>
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
                    <Text style={{ color: '#B8C0C9', fontSize: 17, lineHeight: 24 }}>
                        Get Cources of any Standard, Engineer, Etc. 1 month free, then $10/Month
                    </Text>
                    <View style={{ marginTop: 44 }}>
                        <InputBox InputString="Email Address" />
                        <InputBox InputString="Password" />
                    </View>
                    <Pressable onPress={() => navigate('ForgotPassword')}>
                        <Text style={{ alignSelf: 'flex-end', marginTop: 12, textDecorationLine: 'underline' }}>
                            Forgot Password?
                        </Text>
                    </Pressable>

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
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Login</Text>
                    </Pressable>
                </View>
                <Pressable onPress={() => navigate('SignUp')}>
                    <Text style={{ color: '#B8C0C9', fontSize: 17, justifyContent: 'center' }}>
                        Don't have any? <Text style={{ color: '#2A368A', fontSize: 17 }}>Create One.</Text>
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

export default Login;
