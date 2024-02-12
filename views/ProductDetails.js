import React, { useState, useEffect }  from 'react';
import { View, Text, Image, StyleSheet, ScrollView , TouchableOpacity, Linking} from 'react-native';


const ProductDetails = ({ route }) => {
  const { product } = route.params;
  const defaultImage = require('../assets/images/default-makeup.png');
  const [imageUri, setImageUri] = useState(product.image_link ? { uri: product.image_link } : defaultImage);
  const capitalizedBrand = product.brand.charAt(0).toUpperCase() + product.brand.slice(1);

  useEffect(() => {
    if (product.image_link) {
      fetch(product.image_link)
        .then(response => {
          if (response.ok) {
            return response;
          } else {
            throw new Error('Network response was not ok');
          }
        })
        .then(response => response.blob())
        .then(blob => {
          const objectURL = URL.createObjectURL(blob);
          setImageUri({ uri: objectURL });
        })
        .catch(error => {
          console.error(error);
          setImageUri(defaultImage);
        });
    }
  }, [product.image_link]);
  return (
    <ScrollView style={styles.container}>
      <Image source={imageUri} style={styles.productImage} />
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productBrand}>{capitalizedBrand}</Text>
        {product.category && (
        <Text style={styles.productCategory}>{product.category}</Text>
        )}
        <View style={styles.colorCircleContainer}>
          {product.product_colors.map((color, index) => (
            <View
              key={index}
              style={[
                styles.colorCircle,
                { backgroundColor: color.hex_value },
              ]}
            />
          ))}
        </View>
        {product.price > 0 && (
          <Text style={styles.productPrice}>
            Price: {product.price} {product.currency}
          </Text>
        )}
        {product.description && (
          <Text style={styles.productDescription}>{product.description}</Text>
        )}
        {product.product_link && (
          <TouchableOpacity
            style={styles.buyButton}
            onPress={() => Linking.openURL(product.product_link)}
          >
            <Text style={styles.buyButtonText}>Buy Now</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: 300,
  },
  detailsContainer: {
    padding: 16,
    
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productBrand: {
    fontSize: 18,
  },
  productCategory: {
    fontSize: 16,
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  colorCircleContainer: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 8,
    
  },
  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  productDescription: {
    fontSize: 18,
    lineHeight: 24,
  },
  buyButtonText: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 14,
    color: '#9a5e9a',
    fontWeight: 'bold',
  }
});

export default ProductDetails;
