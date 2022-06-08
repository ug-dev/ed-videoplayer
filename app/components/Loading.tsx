import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import { SIZES } from '@app/theme/fonts';

const Loading = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' }}>
            <LottieView
                style={{ width: SIZES.width * 0.45 }}
                source={require('../assets/loading.json')}
                autoPlay
                loop
            />
        </View>
    );
};

export default Loading;

const styles = StyleSheet.create({});
