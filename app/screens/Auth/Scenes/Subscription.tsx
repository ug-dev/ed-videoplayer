import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { SafeAreaView, View, Text, ScrollView } from 'react-native';
import AuthHeader from '../Components/AuthHeader';
import PrimaryButton from '../Components/PrimaryButton';
import STYLES from '../Styles/Subscription.style';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Safety } from '@app/assets';
import { navigateAndSimpleReset } from '@app/navigators';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SubscriptionProps {}

const BOARD_DATA = [
    { label: 'GSEB', value: 'GSEB' },
    { label: 'CBSE', value: 'CBSE' },
];

const DATA = [
    { label: 'Std. 1', value: 'Std. 1' },
    { label: 'Std. 2', value: 'Std. 2' },
    { label: 'Std. 3', value: 'Std. 3' },
    { label: 'Std. 4', value: 'Std. 4' },
    { label: 'Std. 5', value: 'Std. 5' },
    { label: 'Std. 6', value: 'Std. 6' },
    { label: 'Std. 7', value: 'Std. 7' },
    { label: 'Std. 8', value: 'Std. 8' },
    { label: 'Std. 9', value: 'Std. 9' },
    { label: 'Std. 10', value: 'Std. 10' },
    { label: 'Std. 11', value: 'Std. 11' },
    { label: 'Std. 12', value: 'Std. 12' },
];

const checkBoxData = ['English', 'Maths', 'Gujarati', 'Science', 'Social Science'];

const Subscription: React.FC<SubscriptionProps> = () => {
    const [boardValue, setBoardValue] = useState(null);
    const [stdValue, setStdValue] = useState(null);

    const renderBoards = (item: any) => {
        return (
            <View style={STYLES.item}>
                <Text style={STYLES.textItem}>{item.label}</Text>
                {item.value === boardValue && <Safety style={STYLES.icon} height={20} width={20} />}
            </View>
        );
    };

    const renderStandards = (item: any) => {
        return (
            <View style={STYLES.item}>
                <Text style={STYLES.textItem}>{item.label}</Text>
                {item.value === stdValue && <Safety style={STYLES.icon} height={20} width={20} />}
            </View>
        );
    };

    return (
        <SafeAreaView>
            <View style={STYLES.container}>
                <View>
                    <AuthHeader Title="Subscription" />
                    <View style={STYLES.marginT}>
                        <Text style={STYLES.selectText}>Select Board</Text>
                        <Dropdown
                            style={STYLES.dropdown}
                            placeholderStyle={STYLES.placeholderStyle}
                            selectedTextStyle={STYLES.selectedTextStyle}
                            iconStyle={STYLES.iconStyle}
                            data={BOARD_DATA}
                            maxHeight={110}
                            labelField="label"
                            valueField="value"
                            placeholder="Select Board"
                            value={boardValue}
                            onChange={(item) => {
                                setBoardValue(item.value);
                            }}
                            renderLeftIcon={() => <Safety style={STYLES.icon} height={20} width={20} />}
                            renderItem={renderBoards}
                        />
                    </View>
                    <View style={STYLES.marginT}>
                        <Text style={STYLES.selectText}>Select Standard</Text>
                        <Dropdown
                            style={STYLES.dropdown}
                            placeholderStyle={STYLES.placeholderStyle}
                            selectedTextStyle={STYLES.selectedTextStyle}
                            iconStyle={STYLES.iconStyle}
                            data={DATA}
                            maxHeight={180}
                            labelField="label"
                            valueField="value"
                            placeholder="Select Standard"
                            value={stdValue}
                            onChange={(item) => {
                                setStdValue(item.value);
                            }}
                            renderLeftIcon={() => <Safety style={STYLES.icon} height={20} width={20} />}
                            renderItem={renderStandards}
                        />
                    </View>
                    <View style={STYLES.marginT}>
                        <Text style={STYLES.selectText}>Select Subjects</Text>
                        <ScrollView style={STYLES.checkboxContainer}>
                            {checkBoxData.map((item, index) => {
                                return (
                                    <BouncyCheckbox
                                        key={index}
                                        size={25}
                                        style={STYLES.checkboxStyle}
                                        fillColor="#2A368A"
                                        unfillColor="#FFFFFF"
                                        textStyle={STYLES.checkBoxTextStyle}
                                        text={item}
                                        iconStyle={STYLES.checkBoxIconStyle}
                                        onPress={(isChecked: boolean) => {}}
                                    />
                                );
                            })}
                        </ScrollView>
                    </View>
                </View>
                <View>
                    <Text style={STYLES.price}>$399</Text>
                    <Text style={STYLES.desclaimer}>
                        Students will get unlimited access to content after taking one time suscribtion
                    </Text>
                    <PrimaryButton InputText="Next" OnPress={() => navigateAndSimpleReset('HomeNavigator')} />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Subscription;
