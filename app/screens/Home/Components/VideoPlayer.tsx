import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import Video from 'react-native-video';

import { connectOrientationLib, YoutubePlayer } from 'react-native-video-extension';
import Orientation, { LANDSCAPE, OrientationLocker, PORTRAIT } from 'react-native-orientation-locker';
import { BackHandler } from 'react-native';

// connectOrientationLib(Orientation);

const VideoPlayer = ({ URL, handleProgressChange, autoPlay, fullscreen }) => {
    const [duration, setDuration] = useState(null);
    const [progress, setProgress] = useState();
    const isFocused = useIsFocused();
    const videoRef = useRef<Video>(null);
    const handleProgress = (progress) => {
        if (duration) {
            progress.value = progress.currentTime / duration;
            setProgress(progress.currentTime / duration);
        }
    };
    useEffect(() => {
        console.log({ isFocused });
    }, [isFocused]);

    useEffect(() => {
        handleProgressChange(progress);
    }, [progress]);

    useEffect(() => {
        console.log({ fullscreen });
        if (fullscreen) {
            Orientation.lockToLandscape();
        } else {
            Orientation.lockToPortrait();
        }
    }, [fullscreen]);
    useEffect(() => {
        console.log({ videoRef });

        const backAction = () => {
            videoRef.current.dismissFullscreenPlayer();
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove();
    }, [videoRef]);

    // useFocusEffect(
    //     React.useCallback(() => {
    //         alert('video was focused');

    //         return () => {
    //             console.log('video unload', progress);

    //             // alert('video was unfocused' + progress?.value);
    //             // Useful for cleanup functions
    //         };
    //     }, []),
    // );
    // console.log(videoRef);
    // useEffect(() => {
    //     console.log({ isFocus });

    //     if (!isFocus) {
    //         console.log('not focus');

    //         console.log({ progress });
    //     }
    // }, [isFocus]);

    return (
        <>
            <YoutubePlayer
                ref={(ref) => (videoRef.current = ref)}
                onBuffer={(a, b) => {
                    console.log({ a, b });
                }}
                bufferConfig={{
                    minBufferMs: 1000,
                    maxBufferMs: 5000,
                    bufferForPlaybackMs: 1000,
                    bufferForPlaybackAfterRebufferMs: 5000,
                }}
                allowsExternalPlayback={false}
                initialPaused={false}
                onTimedMetadata={(e) => console.log(e)}
                onEnd={(e) => {
                    console.log(e);
                }}
                onError={(e) => console.log(e)}
                mode="auto-fit"
                source={{
                    uri: URL,
                }}
                onProgress={handleProgress}
                onLoad={(meta) => {
                    setDuration(meta.duration);
                    // console.log({ meta });
                }}
            />
        </>
    );
};

export default VideoPlayer;
