import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

interface SettingsProps {}

const Settings: React.FC<SettingsProps> = () => {
    return (
        <SafeAreaView>
            <View style={{ backgroundColor: '#fff', height: '100%', width: '100%' }}>
                <Text style={{ fontSize: 24, color: '#121212' }}>Settings</Text>
            </View>
        </SafeAreaView>
    );
};

export default Settings;
