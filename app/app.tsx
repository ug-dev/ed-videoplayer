import React from 'react';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';

import { AppNavigator, canExit, useBackButtonHandler, useNavigationPersistence } from './navigators';
import { ErrorBoundary } from './screens/error/error-boundary';
import store from './services/redux/Store';
import './utils/ignore-warnings';
import * as storage from './utils/storage';

// This puts screens in a native ViewController or Activity. If you want fully native
// stack navigation, use `createNativeStackNavigator` in place of `createStackNavigator`:
// https://github.com/kmagiera/react-native-screens#using-native-stack-navigator

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

    // Before we show the app, we have to wait for our state to be ready.
    // In the meantime, don't render anything. This will be the background
    // color set in native by rootView's background color.
    // In iOS: application:didFinishLaunchingWithOptions:
    // In Android: https://stackoverflow.com/a/45838109/204044
    // You can replace with your own loading component if you wish.
    if (!isInitialDataLoaded || !isNavigationStateRestored) return null;

    // otherwise, we're ready to render the app
    return (
        <Provider store={store}>
            {/* <SafeAreaProvider initialMetrics={initialWindowMetrics}> */}
            <ErrorBoundary catchErrors={'always'}>
                {/* initialState={initialNavigationState} */}
                <AppNavigator onStateChange={onNavigationStateChange} />
            </ErrorBoundary>
            {/* </SafeAreaProvider> */}
        </Provider>
    );
}

export default App;
