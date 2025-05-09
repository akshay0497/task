import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;
const imageSize = (screenWidth - 32) / 2; // 2 columns with 16px padding

const ImageScreen = ({ navigate }) => {
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      const stored = await AsyncStorage.getItem('assigned_campaigns');
      setImageData(JSON.parse(stored || '[]'));
    };
    loadImages();
  }, []);

  const deleteImage = async (itemToDelete) => {
    Alert.alert(
      'Delete Image',
      'Are you sure you want to delete this image?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              const storedData = await AsyncStorage.getItem('assigned_campaigns');
              const updatedData = JSON.parse(storedData || '[]');
              const filteredData = updatedData.filter(item => item.image !== itemToDelete.image);
              await AsyncStorage.setItem('assigned_campaigns', JSON.stringify(filteredData));
              setImageData(filteredData);
            } catch (error) {
              Alert.alert('Error', 'Failed to delete the image');
            }
          },
        },
      ]
    );
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const renderItem = ({ item }) => (
    <View style={styles.imageCard}>
      <Image source={{ uri: `file://${item.image}` }} style={styles.image} />
      <Text style={styles.location}>📍 latitude : {item.latitude}</Text>
      <Text style={styles.location}>📍 longitude : {item.longitude}</Text>
      <Text style={styles.timestamp}>Capture Time : {formatTimestamp(item.timestamp)}</Text>
      <TouchableOpacity onPress={() => deleteImage(item)} style={styles.emojiButton}>
        <Text style={styles.emoji}>❌</Text>
      </TouchableOpacity>
    </View>
  );

  const handleLogout = async () => {
    await AsyncStorage.removeItem('loggedInUser');
    Alert.alert('Logged Out', 'You have been logged out successfully.');
    navigate('Login'); // Redirect to Login Screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Title and Logout Button in same line with space in between */}
        <Text style={styles.title}>📷 Your Gallery</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={imageData}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.gallery}
        renderItem={renderItem}
      />
      <TouchableOpacity style={styles.backButton} onPress={() => navigate('camera')}>
        <Text style={styles.backButtonText}>🔙 Go to Camera</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
  },
  gallery: {
    paddingBottom: 100,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  imageCard: {
    width: imageSize,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    padding: 10,
  },
  image: {
    width: '100%',
    height: imageSize,
    borderRadius: 8,
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,

  },
  location: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  emojiButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  emoji: {
    fontSize: 18,
  },
  logoutButton: {
    backgroundColor: '#D32F2F',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    backgroundColor: '#1976D2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ImageScreen;