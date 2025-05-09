  import React, { useState, useRef, useEffect } from 'react';
  import { View, Text, StyleSheet, Alert, PermissionsAndroid, Platform, Button } from 'react-native';
  import { Camera, CameraType } from 'react-native-camera-kit';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import Geolocation from '@react-native-community/geolocation';
  import RNFS from 'react-native-fs';

  type PhotoData = {
    uri: string;
    latitude: number;
    longitude: number;
    timestamp: string;
  };

  const CameraScreen = ({ navigate }: any) => {
    const [photos, setPhotos] = useState<PhotoData[]>([]);
    const [isCameraVisible, setIsCameraVisible] = useState(false);
    const [hasPermission, setHasPermission] = useState(false);
    const cameraRef = useRef<any>(null);

    // Request permissions for camera and location
    const requestPermissions = async () => {
      try {
        if (Platform.OS === 'android') {
          const cameraPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA
          );
          const locationPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          );

          if (cameraPermission === PermissionsAndroid.RESULTS.GRANTED &&
              locationPermission === PermissionsAndroid.RESULTS.GRANTED) {
            setHasPermission(true);
          } else {
            setHasPermission(false);
            Alert.alert('Permissions Denied', 'Camera or Location permission not granted.');
          }
        } else {
          setHasPermission(true);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to request permissions.');
      }
    };

    // Function to get coordinates using Geolocation API
    async function findCoordinates() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition(
              position => resolve(position),
              error => reject(error),
            );
          });
        } else {
          throw new Error('Location permission denied');
        }
      } catch (err) {
        console.warn('Permission error:', err);
        return null;
      }
    }

    const addOfflinePic = async (param: any, capturedBase64: string) => {
      const fileName = `IMG_${Date.now()}.jpg`;
      const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

      try {
        await RNFS.writeFile(filePath, capturedBase64, 'base64');
        const updatedParam = { ...param, image: filePath };

        const existing = JSON.parse(await AsyncStorage.getItem('assigned_campaigns') || '[]');
        existing.push(updatedParam);
        await AsyncStorage.setItem('assigned_campaigns', JSON.stringify(existing));
      } catch (err) {
        console.log('addOfflinePic error:', err);
      }
    };

    const takePicture = async () => {
      if (!hasPermission || !cameraRef.current) {
        Alert.alert('No permission or camera not ready');
        return;
      }

      try {
        const location: any = await findCoordinates();
        if (!location) {
          Alert.alert('Error', 'Failed to fetch location');
          return;
        }

        const image = await cameraRef.current.capture();
        if (!image || !image.uri) {
          Alert.alert('Error', 'Image capture failed');
          return;
        }

        let base64Image = '';
        try {
          base64Image = await RNFS.readFile(image.uri, 'base64');
        } catch (readError) {
          console.error('Failed to convert image to base64:', readError);
          Alert.alert('Error', 'Failed to process the captured image.');
          return;
        }

        const meta = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          timestamp: new Date().toISOString(),
        };

        await addOfflinePic(meta, base64Image);
        Alert.alert('Success', 'Image saved Successfully', [
          { text: 'OK', onPress: () => navigate('image') },
        ]);
      } catch (err) {
        console.log('Capture error:', err);
        Alert.alert('Error', 'Something went wrong');
      }
    };

    useEffect(() => {
      requestPermissions();
    }, []);

    useEffect(() => {
      if (hasPermission) {
        setIsCameraVisible(true);
      }
    }, [hasPermission]);

    if (!hasPermission) {
      return (
        <View style={styles.container}>
          <Text style={styles.permissionText}>
            Camera and Location permissions are required to use this feature.
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {isCameraVisible ? (
          <Camera
            ref={cameraRef}
            style={styles.camera}
            cameraType={CameraType.Back}
            flashMode="on"
            focusMode="on"
            shutterPhotoSound={false}
          />
        ) : (
          <View style={styles.cameraPlaceholder}>
            <Text style={styles.placeholderText}>Camera is loading...</Text>
          </View>
        )}
        <View style={styles.buttonWrapper}>
          <Button title="Capture Photo" onPress={takePicture} />
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    },
    camera: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    cameraPlaceholder: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    placeholderText: {
      fontSize: 18,
      color: '#888',
    },
    buttonWrapper: {
      position: 'absolute',
      bottom: 30,
      alignSelf: 'center',
      marginBottom: 30,
    },
    permissionText: {
      fontSize: 18,
      color: 'red',
      textAlign: 'center',
    },
  });

  export default CameraScreen;
