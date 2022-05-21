import React from 'react';
import { FacebookPlayer } from 'react-native-video-extension';

const VideoPlayer = ({ URL }) => {
    return (
        <FacebookPlayer
            mode="auto-fit"
            source={{
                uri: URL,
            }}
        />
    );
};

export default VideoPlayer;
