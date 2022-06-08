import React from 'react';
import { RKLogo } from '@app/assets';
import { Text, View } from 'react-native';
import STYLES from '../Styles/AuthHeader.style';

const AuthHeader = () => {
    return (
        <View style={STYLES.authHeaderContainer}>
            <RKLogo width={70} height={70} />
            {/* <Text style={STYLES.authHeaderTitle}>{Title}</Text> */}
        </View>
    );
};

export default AuthHeader;
