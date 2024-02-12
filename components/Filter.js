import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';

const Filter = ({ tags, onTagSelect, onClearFilters, clearErrorMessage }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);

  const handleTagSelect = (tag) => {
    setSelectedTag(tag);
    setIsModalVisible(false);
    onTagSelect(tag);
    clearErrorMessage();
  };

  const handleClearAllFilters = () => {
    setSelectedTag(null);
    setIsModalVisible(false);
    onClearFilters(); 
    clearErrorMessage();
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <Text style={styles.filterButton}>Filter by Tag</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select a Tag</Text>
          <FlatList
            data={["No Filters", ...tags]}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.tagItem,
                  { backgroundColor: selectedTag === item ? '#007AFF' : 'white' },
                ]}
                onPress={() => {
                  if (item === "No Filters") {
                    handleClearAllFilters();
                    clearErrorMessage();
                  } else {
                    handleTagSelect(item);
                  }
                }}
              >
                <Text
                  style={[
                    styles.tagText,
                    { color: selectedTag === item ? 'white' : 'black' },
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity onPress={() => setIsModalVisible(false)}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  filterButton: {
    color: '#9a5e9a',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  tagItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tagText: {
    fontSize: 16,
  },
  closeButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginTop: 16,
  },
});

export default Filter;
