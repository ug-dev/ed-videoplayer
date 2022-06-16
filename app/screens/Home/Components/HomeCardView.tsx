import React from 'react';
import { Node } from '@app/assets/icons';
import { Image, Pressable, Text, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import STYLES from '../Styles/HomeCardView.style';
import { SIZES } from '@app/theme/fonts';
import { navigate } from '@app/navigators';

const HomeCardView = ({ url, title, data }) => {
    console.log({ url, data });
    // const chapterID = data?.chapter?.id;

    return (
        <Pressable
            onPress={() => navigate('PlayerNav', { params: { id: data?.chapter?.id }, screen: 'Video' })}
            style={STYLES.container}
        >
            <View style={STYLES.upperImageContainer}>
                <Image
                    style={{ zIndex: 100, borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
                    width={SIZES.width * 0.6}
                    height={(SIZES.width * 0.6 * 9) / 16}
                    source={{
                        uri: url,
                    }}
                />
            </View>
            <View style={STYLES.lowerContainer}>
                {/* <ProgressBar style={STYLES.progressBar} progress={0.5} color={'#2A368A'} /> */}
                <View style={STYLES.textContainer}>
                    <Text style={STYLES.text}>{title}</Text>
                </View>
            </View>
        </Pressable>
    );
};

export default HomeCardView;
