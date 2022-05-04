import { COLORS } from '@app/theme';
import * as React from 'react';
import {
    ActivityIndicator,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StatusBar,
    TextInput,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { isNonScrolling, offsets, presets } from './screen.presets';
import { ScreenProps } from './screen.props';
import Header from './../header/header';
import STYLES from './screen.styles';

const isIos = Platform.OS === 'ios';

function ScreenWithoutScrolling(props: ScreenProps) {
    const insets = useSafeAreaInsets();
    const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top };
    const preset = presets.fixed;
    const style = props.style || {};
    const backgroundStyle = props.backgroundColor ? { backgroundColor: props.backgroundColor } : {};

    return (
        <KeyboardAvoidingView
            style={[preset.outer, backgroundStyle]}
            behavior={isIos ? 'padding' : undefined}
            // keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}
        >
            <StatusBar
                animated={true}
                backgroundColor={COLORS.transparent}
                translucent
                barStyle={props.statusBar || 'light-content'}
            />

            <View style={[preset.inner, style, props.isAuthCycle && insetStyle]}>
                {props.isRadius ? (
                    <>
                        {props.isHeader && (
                            <Header
                                isChat={props.isChat}
                                isScanner={props.isScanner}
                                onScanner={props.onScanner}
                                headerText={props.headerText}
                                LeftIcon={props.leftIcon && props.leftIcon}
                                avatarPath={props.avatarPath && props.avatarPath}
                            />
                        )}
                        <View style={STYLES.background}>
                            {props.isScreenLoading ? (
                                <View style={STYLES.LOADER_CONTAINER}>
                                    <ActivityIndicator size="large" color={COLORS.primary} />
                                </View>
                            ) : (
                                props.children
                            )}
                            {/* </View> */}
                        </View>
                    </>
                ) : (
                    <>
                        {props.isHeader && (
                            <Header
                                isChat={props.isChat}
                                isScanner={props.isScanner}
                                onScanner={props.onScanner}
                                headerText={props.headerText}
                                LeftIcon={props.leftIcon && props.leftIcon}
                                avatarPath={props.avatarPath && props.avatarPath}
                            />
                        )}
                        {props.isScreenLoading ? (
                            <View style={STYLES.LOADER_CONTAINER}>
                                <ActivityIndicator size="large" color={COLORS.primary} />
                            </View>
                        ) : (
                            props.children
                        )}
                    </>
                )}
            </View>
        </KeyboardAvoidingView>
    );
}

function ScreenWithScrolling(props: ScreenProps) {
    const insets = useSafeAreaInsets();
    const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top };
    const preset = presets.scroll;
    const style = props.style || {};
    const backgroundStyle = props.backgroundColor ? { backgroundColor: props.backgroundColor } : {};

    return (
        <KeyboardAvoidingView
            style={[preset.outer, backgroundStyle]}
            behavior={isIos ? 'padding' : undefined}
            keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}
        >
            <StatusBar
                animated={true}
                translucent
                backgroundColor={COLORS.transparent}
                barStyle={props.statusBar || 'light-content'}
            />
            <View style={[preset.outer, backgroundStyle, props.isAuthCycle && insetStyle]}>
                {props.isRadius ? (
                    <>
                        {props.isHeader && (
                            <Header
                                isChat={props.isChat}
                                isScanner={props.isScanner}
                                onScanner={props.onScanner}
                                headerText={props.headerText}
                                LeftIcon={props.leftIcon && props.leftIcon}
                                avatarPath={props.avatarPath && props.avatarPath}
                            />
                        )}
                        <ScrollView
                            style={[
                                preset.outer,
                                STYLES.background,
                                { borderTopLeftRadius: 20, borderTopRightRadius: 20 },
                            ]}
                            overScrollMode="never"
                            contentContainerStyle={[preset.inner, style]}
                            keyboardShouldPersistTaps={props.keyboardShouldPersistTaps || 'handled'}
                        >
                            {props.isScreenLoading ? (
                                <View style={STYLES.LOADER_CONTAINER}>
                                    <ActivityIndicator size="large" color={COLORS.primary} />
                                </View>
                            ) : (
                                props.children
                            )}
                        </ScrollView>
                    </>
                ) : (
                    <>
                        {props.isHeader && (
                            <Header
                                isChat={props.isChat}
                                isScanner={props.isScanner}
                                headerText={props.headerText}
                                onScanner={props.onScanner}
                                LeftIcon={props.leftIcon && props.leftIcon}
                                avatarPath={props.avatarPath && props.avatarPath}
                            />
                        )}
                        <ScrollView
                            style={[preset.outer, STYLES.background]}
                            contentContainerStyle={[preset.inner, style]}
                            keyboardShouldPersistTaps={props.keyboardShouldPersistTaps || 'handled'}
                        >
                            {props.isScreenLoading ? (
                                <View style={STYLES.LOADER_CONTAINER}>
                                    <ActivityIndicator size="large" color={COLORS.primary} />
                                </View>
                            ) : (
                                props.children
                            )}
                        </ScrollView>
                    </>
                )}
            </View>
        </KeyboardAvoidingView>
    );
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export function Screen(props: ScreenProps) {
    if (isNonScrolling(props.preset)) {
        return <ScreenWithoutScrolling {...props} />;
    } else {
        return <ScreenWithScrolling {...props} />;
    }
}
