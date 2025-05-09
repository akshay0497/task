// App.js
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import CameraScreen from './src/screens/CameraScreen';
import ImageScreen from './src/screens/ImageScreen';

export default function App() {
  const [screen, setScreen] = useState('Register');

  const navigate = (next) => setScreen(next);

  return (
    <View style={styles.container}>
      {screen === 'Register' && <RegisterScreen navigate={navigate} />}
      {screen === 'Login' && <LoginScreen navigate={navigate} />} 
      {screen === 'image' && <ImageScreen navigate={navigate} />}
      {screen === 'camera' && <CameraScreen navigate={navigate} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


// import Geolocation from '@react-native-community/geolocation';
// import { NavigationContainer } from '@react-navigation/native';
// import axios from 'axios';
// import React, { useRef, useState } from 'react';
// import { View, Text, TouchableOpacity, Image, useWindowDimensions, PermissionsAndroid, Alert, ActivityIndicator, StyleSheet } from 'react-native';
// import { Camera, CameraType } from 'react-native-camera-kit';
// import RNFS from 'react-native-fs';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Login from './src1/Login';
// import DashBoard from './src1/DashBoard';
// import SunglassForm from './src1/SunglassForm';
// import SunglassList from './src1/SunglassList';

// function App() {
//   const { height, width } = useWindowDimensions();
//   const cameraRef = useRef<any>(null);
//   const [capturedImage, setCapturedImage] = useState<string | null>(null);
//   const [loading, setLoading] = useState<any>(false);
//   const Stack = createNativeStackNavigator();


//   async function findCoordinates() {

//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         {
//           title: 'Alter',
//           message: `We want your location to help you to find things`,
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         },
//       );

//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         return new Promise((resolve, reject) => {
//           Geolocation.getCurrentPosition(position => {
//             resolve(position)
//           });
//         })
//       }

//     } catch (err) {
//       console.warn(err);
//     }


//   }



//   const capturePhoto = async () => {
//     if (cameraRef.current) {
//       const image = await cameraRef.current.capture();
//       const uri = image.uri; 

//       try {
//         const base64String = await RNFS.readFile(uri, 'base64');
//         setCapturedImage(base64String);
//       } catch (error) {
//         console.error('Error converting to base64:', error);
//       }
//     }
//   };
//   const addcapturePhoto = async () => {
//     setLoading(true)
//     findCoordinates().then(async (coordinates) => {
//       const { coords } = coordinates;

//       const params = {
//         EmpID: 1,
//         BitMapData: capturedImage,
//         EmployeePhoto: "",
//         AttendTime: '',
//         Type: 1,
//         FormID: -1,
//         CaptureDate: new Date(),
//         Longitude: coords?.latitude.toString(),
//         Latitude: coords?.longitude.toString()
//       }
//       axios.post("https://smarttrollyapi.mssplonline.com/api/MasterForm/AddTestData", params)
//         .then((response) => {
//           setLoading(false)
//           Alert.alert('Success', response?.data?.msg, [
           
//             {
//               text: 'Ok',
//               onPress() {
//                 resetCapture()
//                 setLoading(false);
//               },
//             },
//           ]);

//           console.log(response.data)
//         })
//         .catch(error => {
//           setLoading(false)

//           console.error("Error fetching data:", error)
//         });
//     })



//   };

//   const resetCapture = () => {
//     setCapturedImage(null);
//   };

//   const CamView=()=>{
//     return(
//       <View style={{ flex: 1 }}>
//       {capturedImage ? (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//           <Image source={{ uri: `data:image/png;base64,${capturedImage}` }} style={{ height: height, width: width }} />
//           <View style={{ flexDirection: 'row', position: 'absolute', bottom: 50 }}>
//             <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={() => { resetCapture() }} activeOpacity={0.8}>
//               <Text style={styles.buttonText}>{'Cancel'}</Text>
//             </TouchableOpacity>
//             {loading ? <View style={{marginTop:15,marginLeft:10}}>
//               <ActivityIndicator size="large" color="#00ff00" />
//             </View> :
//               <TouchableOpacity style={[styles.button, { backgroundColor: '#4CAF50' }]} onPress={() => { addcapturePhoto() }} activeOpacity={0.8}>
//               <Text style={styles.buttonText}>{'Ok'}</Text>
//             </TouchableOpacity>
//               }
//           </View>
//         </View>
//       ) : (
//         <View style={{ flex: 1 }}>
//           <Camera
//             style={{ height: height, width: width }}
//             ref={cameraRef} 
//             cameraType={CameraType.Back}
//             flashMode="off"
//             focusMode="off"
//             shutterPhotoSound={false}
//           /> 
//           <TouchableOpacity style={[styles.button, { backgroundColor: '#4CAF50',position: 'absolute', bottom: 100,alignSelf: 'center', }]} onPress={() => { capturePhoto() }} activeOpacity={0.8}>
//               <Text style={styles.buttonText}>{'Capture'}</Text>
//             </TouchableOpacity>
//         </View>
//       )}
//     </View>
//     )
//   }

//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Login">
//       <Stack.Screen name="Login" component={Login} />
//       <Stack.Screen name="Home" component={CamView} />
//       <Stack.Screen name="DashBoard" component={DashBoard} />
//       <Stack.Screen name="SunglassForm" component={SunglassForm} />
//       <Stack.Screen name="SunglassList" component={SunglassList} />
//     </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5F5F5',
//   },
//   button: {
//     width: 150,
//     paddingVertical: 15,
//     borderRadius: 25,
//     alignItems: 'center',
//     marginVertical: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   buttonText: {
//     color: '#FFF',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });
// export default App;
