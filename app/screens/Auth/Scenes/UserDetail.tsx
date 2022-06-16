import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import STYLES from '../Styles/UserDetail.style';
import { Dropdown } from 'react-native-element-dropdown';
import AuthHeader from '../Components/AuthHeader';
import { useGetCityQuery, useGetSchoolQuery, useGetStateQuery } from '@app/services/redux/api/subscription';
const UserDetail = () => {
    const [stste, setStste] = useState(null);
    const { data: stateData, isLoading: stateloading, error: stateError } = useGetStateQuery();
    const { data: cityData, isLoading: cityloading, error: cityError } = useGetCityQuery();
    const { data: schoolData, isLoading: schoolloading, error: schoolError } = useGetSchoolQuery();
    const renderState = (item: any) => {
        return (
            <View style={STYLES.item}>
                <Text style={STYLES.textItem}>{item.label}</Text>
                {/* {item.value === stste && <Safety style={STYLES.icon} height={20} width={20} />} */}
            </View>
        );
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={{ flex: 1, padding: 16 }}>
                <AuthHeader />
                <Dropdown
                    style={STYLES.dropdown}
                    placeholderStyle={STYLES.placeholderStyle}
                    selectedTextStyle={STYLES.selectedTextStyle}
                    iconStyle={STYLES.iconStyle}
                    data={[{ label: 'hello', value: 1 }]}
                    maxHeight={110}
                    labelField="label"
                    valueField="value"
                    placeholder="Select State"
                    search
                    searchQuery={(a, b) => {
                        console.log({ a, b });
                    }}
                    // value={boardValue}
                    // onChange={(item) => {
                    //     setBoardValue(item.value);
                    // }}
                    // renderLeftIcon={() => <Safety style={STYLES.icon} height={20} width={20} />}
                    renderItem={renderState}
                />
            </View>
        </SafeAreaView>
    );
};

export default UserDetail;
