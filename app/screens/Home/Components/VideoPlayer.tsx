import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { FacebookPlayer, YoutubePlayer } from 'react-native-video-extension';
import Video from 'react-native-video';
import { navigationRef } from '@app/navigators';

const VideoPlayer = ({ URL, handleProgressChange, autoPlay }) => {
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
        <YoutubePlayer
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
    );
};

export default VideoPlayer;
