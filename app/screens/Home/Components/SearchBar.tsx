import React from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import styles from '../Styles/SearchBar.styles';
import Search from '../../../assets/icons/search.svg';

const SearchBar = (props) => {
    const { value, onChangeText } = props;
    return (
        <View style={styles.searchBar}>
            <TextInput
                placeholder="What do you want to learn"
                placeholderTextColor={'#B8C0C9'}
                style={styles.searchBarTextInput}
                value={value}
                onChangeText={onChangeText}
            />
            <Pressable style={styles.searchButton}>
                <Search width={16} height={16} />
            </Pressable>
        </View>
    );
};
export default SearchBar;
