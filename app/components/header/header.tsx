import { HeaderBackground, Scanner } from '@app/assets';
import { goBack } from '@app/navigators';
import { SIZES } from '@app/theme/fonts';
import React, { useEffect, useState } from 'react';
import { Image, ImageStyle, Pressable, TextStyle, View, ViewStyle } from 'react-native';
import { COLORS, FONTS, SPACING } from '../../theme';
import { Button } from '../button/button';
// import { MdOutlineQrCodeScanner } from 'react-icons/md';
import { Text } from '../text/text';
import { HeaderProps } from './header.props';

// static styles
const ROOT: ViewStyle = {
    flexDirection: 'row',
    paddingHorizontal: SPACING[4],
    alignItems: 'flex-end',
    height: SIZES.height * 0.12,
    justifyContent: 'flex-start',
    backgroundColor: COLORS.primary,
    paddingBottom: 10,
};
const USER_IMG: ImageStyle = {
    height: SIZES.width * 0.12,
    width: SIZES.width * 0.12,
    borderRadius: SIZES.width * 0.03,
    borderColor: COLORS.white,
    borderWidth: 2,
};
const HEADER_BACKGROUND: ViewStyle = {
    position: 'absolute',
    top: 0,
    right: 0,
};
const TITLE: TextStyle = { ...FONTS.h2, color: COLORS.white };
const TITLE_MIDDLE: ViewStyle = { flex: 1, justifyContent: 'center' };
const LEFT: ViewStyle = { width: 32 };
const RIGHT: ViewStyle = { width: 32 };

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
export default function Header(props: HeaderProps) {
    const {
        isChat = false,
        onLeftPress,
        onRightPress,
        RightIcon,
        LeftIcon,
        headerText,
        headerTx,
        style,
        titleStyle,
        avatarPath,
    } = props;
    const header = headerText || headerTx || '';

    const [isImageError, setIsImageError] = useState(false);
    const [isIsImageLoading, setIsImageLoading] = useState(true);

    useEffect(() => {
        console.log('🚀 ~ file: header.tsx ~ line 62 ~ useEffect ~ isImageError', isIsImageLoading);
    }, [isIsImageLoading]);

    return (
        <View style={[ROOT, style]}>
            <HeaderBackground height={SIZES.height * 0.09} style={HEADER_BACKGROUND} />

            {isChat ? (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {LeftIcon && (
                        <Button style={{ marginRight: 12 }} preset="link" onPress={onLeftPress || goBack}>
                            <LeftIcon height={20} width={20} />
                        </Button>
                    )}
                    <Image
                        style={USER_IMG}
                        onError={(e) => setIsImageError(true)}
                        onLoadEnd={() => setIsImageLoading(false)}
                        source={
                            avatarPath
                                ? !isImageError && !isIsImageLoading
                                    ? { uri: avatarPath }
                                    : require('../../assets/images/defaultImage.png')
                                : require('../../assets/images/defaultImage.png')
                        }
                    />
                    <Text style={{ ...FONTS.h4, color: COLORS.white, marginLeft: 12 }} text={header} />
                </View>
            ) : (
                <>
                    {LeftIcon && (
                        <Button
                            style={{ paddingBottom: 6, marginRight: 16 }}
                            preset="link"
                            onPress={onLeftPress || goBack}
                        >
                            <LeftIcon height={20} width={20} />
                        </Button>
                    )}
                    <View style={TITLE_MIDDLE}>
                        <Text style={[TITLE, titleStyle]} text={header} />
                    </View>
                    {RightIcon ? (
                        <Button preset="link" onPress={onRightPress}>
                            <RightIcon height={18} width={18} />
                        </Button>
                    ) : (
                        <View style={RIGHT} />
                    )}
                </>
            )}

            {props.isScanner && (
                <Pressable onPress={props.onScanner} style={{ paddingHorizontal: 6 }}>
                    <Scanner height={28} width={28} />
                </Pressable>
            )}
        </View>
    );
}
