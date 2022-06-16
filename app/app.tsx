import React, { useEffect } from 'react';
import { LogBox, Platform, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import SplashScreen from 'react-native-splash-screen';
import { AppNavigator, canExit, useBackButtonHandler, useNavigationPersistence } from './navigators';
import { ErrorBoundary } from './screens/error/error-boundary';
import store from './services/redux/Store';
import './utils/ignore-warnings';
import * as storage from './utils/storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE';

/**
 * This is the root component of our app.
 */
function App() {
    LogBox.ignoreLogs(['EventEmitter.removeListener']);

    useBackButtonHandler(canExit);
    const {
        initialNavigationState,
        onNavigationStateChange,
        isRestored: isNavigationStateRestored,
    } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY);

    const isInitialDataLoaded = true;

    useEffect(() => {
        DeviceInfo.getAndroidId().then((androidId) => {
            console.log({ deviceId: androidId });
        });
    }, []);

    // useEffect(() => {
    //     setTimeout(() => {
    //         if (Platform.OS === 'android') {
    //             SplashScreen.hide();
    //         }
    //     }, 3000);
    // }, []);

    // Before we show the app, we have to wait for our state to be ready.
    // In the meantime, don't render anything. This will be the background
    // color set in native by rootView's background color.
    // In iOS: application:didFinishLaunchingWithOptions:
    // In Android: https://stackoverflow.com/a/45838109/204044
    // You can replace with your own loading component if you wish.
    if (!isInitialDataLoaded || !isNavigationStateRestored) return null;

    // otherwise, we're ready to render the app

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Provider store={store}>
                {/* <SafeAreaProvider initialMetrics={initialWindowMetrics}> */}
                <ErrorBoundary catchErrors={'always'}>
                    {/* initialState={initialNavigationState} */}
                    <StatusBar backgroundColor={'#FFF'} barStyle={'dark-content'} />
                    <AppNavigator onStateChange={onNavigationStateChange} />
                </ErrorBoundary>
                {/* </SafeAreaProvider> */}
            </Provider>
        </GestureHandlerRootView>
    );
}

export default App;
