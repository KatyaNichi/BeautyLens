import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import SearchComponent from '../components/SearchComponent';
import Card from '../components/Card';
import Filter from '../components/Filter';
import { tagsList } from '../constants/filtersData';

const ProductsList = ({ route }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState(null);

  const { productName, color } = route.params;

  useEffect(() => {
    fetchData();
  }, [productName, selectedTag]);

  useEffect(() => {
    handleFilter(selectedTag);
  }, [selectedTag]);
  const fetchData = async () => {
    try {
      // Create an array of selected tags or an empty array if no tag is selected
      const selectedTagsArray = selectedTag ? [selectedTag] : [];
  
      const queryParams = new URLSearchParams({
        product_tags: selectedTagsArray.join(','),
        product_type: productName.toLowerCase(),
      });
  
      const apiUrl = `http://makeup-api.herokuapp.com/api/v1/products.json?${queryParams}`;
      setErrorMessage('');
      const response = await fetch(apiUrl);
      const result = await response.json();
  
      // Check if there are no products found
      if (result.length === 0) {
        setErrorMessage('No products found.');
      } else {
        // Filter out products with non-responsive image links
        const filteredResult = await Promise.all(result.map(async (item) => {
          try {
            const imageResponse = await fetch(item.image_link);
            if (imageResponse.status === 200) {
              return item;
            }
            return null; // Skip products with non-responsive image links
          } catch (error) {
            // console.error('Error checking image link:', item.image_link);
          
            return null; // Skip products with non-responsive image links
          }
        }));
  
        // Remove null items from the filtered result
        const filteredData = filteredResult.filter(item => item !== null);
  
        if (filteredData.length === 0) {
          setErrorMessage('No products with valid image links found.');
        } else {
          setData(filteredData);
          setFilteredData(filteredData);
        }
      }
  
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
   
      setIsLoading(false);
      setErrorMessage('Error fetching data');
    }
  };
  

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
    setErrorMessage('');
    return filtered;
  };

  const handleFilter = (tag) => {
    setSelectedTag(tag);
    console.log(tag);

    if (!tag) {
      setFilteredData(data);
      return;
    }

    const filtered = data.filter((item) =>
      Array.isArray(item.tag_list) &&
      item.tag_list.map((itemTag) => itemTag.toLowerCase()).includes(tag.toLowerCase())
    );

    console.log(filtered);
    setFilteredData(filtered);
  };

  const handleClearFilters = async () => {
    setSelectedTag(null);
    setIsLoading(true);

    try {
      const queryParams = new URLSearchParams({
        product_type: productName.toLowerCase(),
      });

      const apiUrl = `http://makeup-api.herokuapp.com/api/v1/products.json?${queryParams}`;
      console.log('API URL:', apiUrl);

      const response = await fetch(apiUrl);
      const result = await response.json();
      setData(result);
      setFilteredData(result);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
      setErrorMessage('Error fetching data');
    }
  };

  const clearErrorMessage = () => {
    setErrorMessage('');
  };

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <SearchComponent onSearch={handleSearch} setErrorMessage={setErrorMessage} />
      <Filter
        tags={tagsList}
        onTagSelect={handleFilter}
        onClearFilters={handleClearFilters} 
        clearErrorMessage={clearErrorMessage}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <>
          {errorMessage ? (
            <View style={styles.errorMessageContainer}>
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            </View>
          ) : null}
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Card item={item} />}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  errorMessageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  errorMessage: {
    fontSize: 18,
    color: '#9a5e9a',
  },
});

export default ProductsList;