import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const SearchComponent = ({ onSearch, setErrorMessage }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = async () => {
    console.log('handleSearch');
    const result = await onSearch(searchText);
    // console.log(result);

    if (Array.isArray(result) && result.length === 0) {
      setErrorMessage('Nothing found. Please try a different search term.');
    } else {
      setErrorMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
    paddingRight: 0,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingLeft: 8,
  },
  button: {
    backgroundColor: '#9a5e9a',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginLeft: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  errorMessageContainer: {
    backgroundColor: 'rgba(255, 0, 0, 0.1)', 
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
  },
});

export default SearchComponent;
