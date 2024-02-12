import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';


const gridData = [
  { color: '#F5E6CA', image: require('../assets/images/blush.png'), text: 'Blush' },
  { color: '#FFDAB9', image: require('../assets/images/bronzer.png'), text: 'Bronzer' },
  { color: '#BAA08A', image: require('../assets/images/eyebrow.png'), text: 'Eyebrow' },
  { color: '#FFF5E1', image: require('../assets/images/eyeliner.png'), text: 'Eyeliner' },
  { color: '#D3A297', image: require('../assets/images/eyeshadow.png'), text: 'Eyeshadow' },
  { color: '#F4A460', image: require('../assets/images/foundation.png'), text: 'Foundation' },
  { color: '#D8BFD8', image: require('../assets/images/lipliner.png'), text: 'Lip liner' },
  { color: '#FFE4E1', image: require('../assets/images/lipstick.png'), text: 'Lipstick' },
  { color: '#D3D3D3', image: require('../assets/images/mascara.png'), text: 'Mascara' },
  { color: '#F7E7CE', image: require('../assets/images/nailpolish.png'), text: 'Nail polish' },
];
const Catalog = () => {
  const navigation = useNavigation();

  const handleCellPress = (productName, color) => {
    console.log(productName, color)
    navigation.navigate('Products List', { productName, color });
  };
  
  return (
    <View style={styles.container}>
    {gridData.map((cellData, index) => (
      (index % 2 === 0) && (
        <View style={styles.row} key={index}>
          <View style={styles.column}>
            <TouchableOpacity style={[styles.cell, { backgroundColor:  gridData[index ].color}]}
            onPress={() => handleCellPress(gridData[index].text, gridData[index].color)}>
              <Image source={cellData.image} style={styles.cellImage} />
              <Text style={styles.cellText}>{cellData.text}</Text>
            </TouchableOpacity>
          </View>
          {gridData[index + 1] && (
            <View style={styles.column}>
              <TouchableOpacity style={[styles.cell, { backgroundColor: gridData[index + 1].color }]
            } onPress={() => handleCellPress(gridData[index + 1].text, gridData[index + 1].color)}>
                <Image source={gridData[index + 1].image} style={styles.cellImage} />
                <Text style={styles.cellText}>{gridData[index + 1].text}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )
    ))}
    <StatusBar style="auto" />
  </View>
  
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column', 
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
    },
    row: {
      flexDirection: 'row', 
      justifyContent: 'space-between',
      marginBottom: 10, 
     
    },
    column: {
      flex: 1,
      alignItems: 'center',
    },
    cell: {
      ViewAlign: 'center', 
      width: 120,
      height: 120,
      backgroundColor: '#f0f0f0', 
      margin: 5, 
      padding: 10, 
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 15,
      borderWidth: 1, 
      borderColor: '#000',
    },
    cellText: {
      textAlign: 'center',
      justifyContent: 'center',
      color: '#000',
      fontSize: 18,
      paddingTop: 10,
    },
    cellImage: {
      width: 60, 
    height: 60,
    
    }
  });

export default Catalog;
