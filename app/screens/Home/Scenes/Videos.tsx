import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

interface VideosProps {}

const Videos: React.FC<VideosProps> = () => {
    return (
        <SafeAreaView>
            <View style={{ backgroundColor: '#fff', height: '100%', width: '100%' }}>
                <Text style={{ fontSize: 24, color: '#121212' }}>Videos</Text>
            </View>
        </SafeAreaView>
    );
};

export default Videos;
