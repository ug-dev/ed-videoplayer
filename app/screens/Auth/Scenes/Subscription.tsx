import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { SafeAreaView, View, Text } from 'react-native';
import AuthHeader from '../Components/AuthHeader';
import PrimaryButton from '../Components/PrimaryButton';
import STYLES from '../Styles/Subscription.style';
import { Checkbox } from 'react-native-paper';
import { Safety } from '@app/assets';
import { navigateAndSimpleReset } from '@app/navigators';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SubscriptionProps {}

const DATA = [
    { label: 'Value 1', value: '1' },
    { label: 'Value 2', value: '2' },
    { label: 'Value 3', value: '3' },
];

const Subscription: React.FC<SubscriptionProps> = () => {
    const [boardValue, setBoardValue] = useState(null);
    const [stdValue, setStdValue] = useState(null);
    const [checked, setChecked] = useState(false);

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
                            data={DATA}
                            maxHeight={180}
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
                        <View style={STYLES.checkboxContainer}>
                            <Checkbox
                                status={checked ? 'checked' : 'unchecked'}
                                color={'#2A368A'}
                                uncheckedColor={'#2A368A'}
                                onPress={() => {
                                    setChecked(!checked);
                                }}
                            />
                            <Text style={STYLES.checkboxValue}>Subject</Text>
                        </View>
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
