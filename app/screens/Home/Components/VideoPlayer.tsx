import React from 'react';
import { FacebookPlayer } from 'react-native-video-extension';

const VideoPlayer = ({ URL, fullscreen }) => {
    return (
        <FacebookPlayer
            mode="auto-fit"
            source={{
                uri: URL,
            }}
            fullscreen={fullscreen}
        />
    );
};

export default VideoPlayer;
