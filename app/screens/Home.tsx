// import liraries
import { Screen } from '@app/components';
import { NavigatorParamList } from '@app/navigators';
import { COLORS } from '@app/theme';
import { StackScreenProps } from '@react-navigation/stack';

import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import STYLES from './Home.style';

export const Home: FC<StackScreenProps<NavigatorParamList, 'Home'>> = ({ navigation }) => {
    const goBack = () => navigation.goBack();

    useEffect(() => {
        console.log('Home mounted');

        return () => {
            console.log('Home unmounted');
        };
    }, []);
    return <Screen style={STYLES.CONTAINER} preset={'fixed'} backgroundColor={COLORS.transparent} />;
};
// map global redux state to current component props
const mapStateToProps = (state) => ({});

// map redux dispach methods to props
const mapDispatchToProps = (dispatch) => {
    return {};
};

// make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(Home);
