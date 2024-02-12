
import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Image } from 'react-native';


const Preloader = ({ navigation }) => {
 
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Catalog'); 
    }, 3000); 
  }, []);
 
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/BeautyLens.png')} 
        style={styles.image}
      />
    
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
};



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#000'
    },
    logo: {
        fontFamily: 'RockSalt_400Regular',
        color: '#fff',
        fontSize: 30,
      },
      image: {
        width: 400,
        height: 300, 
        resizeMode: 'contain', 
        marginBottom: 50,
        marginTop: 50,
      },
      
  });
export default Preloader;
