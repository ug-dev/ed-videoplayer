import React from 'react';
import { Node } from '@app/assets/icons';
import { Text, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import STYLES from '../Styles/HomeCardView.style';

const HomeCardView = () => {
    return (
        <View style={STYLES.container}>
            <View style={STYLES.upperImageContainer}>
                <Node />
            </View>
            <View style={STYLES.lowerContainer}>
                <ProgressBar style={STYLES.progressBar} progress={0.5} color={'#2A368A'} />
                <View style={STYLES.textContainer}>
                    <Text style={STYLES.text}>Node JS Course</Text>
                </View>
            </View>
        </View>
    );
};

export default HomeCardView;
