import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Card = ({ item }) => {
  const navigation = useNavigation();
  const defaultImage = require('../assets/images/default-makeup.png');
  const [imageUri, setImageUri] = useState(defaultImage);

  useEffect(() => {
    const imageUrl = item.image_link || '';
    fetchImage(imageUrl);
  }, [item.image_link]);

  const fetchImage = (imageLink) => {
    if (!imageLink) {
      setImageUri(defaultImage);
      return;
    }
  
    fetch(imageLink)
      .then(response => {
        if (response.status !== 200) {
          // Skip further processing and return from the function
          return;
        }
        return response.blob();
      })
      .then(blob => {
        if (blob) {
          const objectURL = URL.createObjectURL(blob);
          setImageUri({ uri: objectURL });
        } else {
          setImageUri(defaultImage);
        }
      })
      .catch(error => {
        console.error(error);
        setImageUri(defaultImage);
      });
  };
  
  

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        navigation.navigate('Product Details', { product: item });
      }}
    >
      <Image style={styles.cardImage} source={imageUri} />
      <Text numberOfLines={2} ellipsizeMode="tail" style={styles.cardText}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  cardImage: {
    width: 80,
    height: 80,
    marginRight: 16,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
});

export default Card;
