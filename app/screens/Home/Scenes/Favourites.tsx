import { JsCrash, JsIcon, RKLogo, VideoPlayerBack, VideoPlayerLike } from '@app/assets';
import { SIZES } from '@app/theme/fonts';
import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

interface FavouritesProps {}

const Favourites: React.FC<FavouritesProps> = () => {
    return (
        <SafeAreaView>
            <View style={{ backgroundColor: '#fff', paddingHorizontal: 16, width: '100%', height: '100%' }}>
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
                    <Text style={{ color: '#404B63', fontWeight: 'bold', fontSize: 20, marginLeft: 12 }}>
                        Important
                    </Text>
                </View>
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
                    <VideoPlayerLike
                        height="38"
                        width="38"
                        style={{ position: 'absolute', left: 16, top: 12, zIndex: 1 }}
                    />
                    <JsCrash style={{ alignSelf: 'flex-end', marginEnd: 12 }} />
                    <Text style={{ color: '#fff', fontSize: 14 }}>John Doe</Text>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Java Crash Course</Text>
                </View>
                <View
                    style={{
                        height: SIZES.height * 0.24,
                        justifyContent: 'space-between',
                        backgroundColor: '#F0DB4F',
                        padding: 16,
                        borderRadius: 12,
                        marginTop: 20,
                    }}
                >
                    <VideoPlayerLike
                        height="38"
                        width="38"
                        style={{ position: 'absolute', left: 16, top: 12, zIndex: 1 }}
                    />
                    <JsIcon style={{ alignSelf: 'flex-end', marginEnd: 12 }} />
                    <Text style={{ color: '#121212', fontSize: 14 }}>John Doe</Text>
                    <Text style={{ color: '#121212', fontWeight: 'bold', fontSize: 18 }}>JavaScript Course</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Favourites;
