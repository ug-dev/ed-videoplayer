import { JsCrash, RKLogo } from '@app/assets';
import { SIZES } from '@app/theme/fonts';
import { ProgressBar } from 'react-native-paper';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import SearchBar from '../Components/SearchBar';
import { Node } from '@app/assets/icons';

interface HomeProps {}

const CardView = () => {
    return (
        <View
            style={{
                width: SIZES.width * 0.5,
                height: SIZES.width * 0.7,
                borderRadius: 24,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.2,
                shadowRadius: 1.41,

                elevation: 2,
                marginVertical: 16,
                marginLeft: 16,
            }}
        >
            <View
                style={{
                    height: SIZES.width * 0.5,
                    backgroundColor: '#80BD03',
                    borderTopLeftRadius: 24,
                    borderTopRightRadius: 24,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Node />
            </View>
            <View
                style={{
                    height: SIZES.width * 0.2,
                    backgroundColor: '#FCFCFC',
                    borderBottomLeftRadius: 24,
                    borderBottomRightRadius: 24,
                }}
            >
                <ProgressBar style={{ height: 6 }} progress={0.5} color={'#2A368A'} />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#404B63', fontWeight: 'bold', fontSize: 16 }}>Node JS Course</Text>
                </View>
            </View>
        </View>
    );
};

const Home: React.FC<HomeProps> = () => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <SafeAreaView>
            <ScrollView style={{ backgroundColor: '#fff', height: '100%', width: '100%' }}>
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: 14,
                        paddingHorizontal: 16,
                        marginBottom: 16,
                        alignItems: 'center',
                    }}
                >
                    <RKLogo />
                    <Text
                        style={{
                            marginLeft: 8,
                            fontWeight: 'bold',
                            color: '#121212',
                            fontSize: 24,
                        }}
                    >
                        RK
                    </Text>
                </View>
                <View style={{ paddingHorizontal: 16 }}>
                    <SearchBar value={searchQuery} onChangeText={(value) => setSearchQuery(value)} />
                    <View
                        style={{
                            height: SIZES.height * 0.24,
                            justifyContent: 'space-between',
                            backgroundColor: '#070C19',
                            padding: 16,
                            borderRadius: 12,
                            marginTop: 28,
                        }}
                    >
                        <JsCrash style={{ alignSelf: 'flex-end', marginEnd: 12 }} />
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Java Crash Course</Text>
                    </View>
                </View>

                <View style={{ marginTop: 24 }}>
                    <Text style={{ paddingHorizontal: 16, color: '#121212', fontWeight: 'bold', fontSize: 20 }}>
                        Last watched <Text style={{ color: '#AFAFAF', fontSize: 16 }}> Important</Text>
                    </Text>

                    <ScrollView horizontal>
                        <CardView />
                        <CardView />
                        <CardView />
                        <CardView />
                    </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;
