// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, Dimensions, Image, ScrollView } from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import { validateLogin } from '../utils/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const LoginScreen = ({ navigate }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // console.log(username);
    // console.log(password);
    const users = await AsyncStorage.getItem('users');
    // console.log(users);
    const isValid = await validateLogin(username, password);
    // console.log(isValid);
    if (isValid) {
      Alert.alert('Success', 'Login successful');
      navigate('image');
    } else {
      Alert.alert('Error', 'Invalid credentials');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
    <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/747/747376.png' }} style={styles.image} resizeMode="contain" />
    <Text style={styles.title}>Login</Text>
    <View style={styles.formContainer}>
      <Input placeholder="Username" value={username} onChangeText={setUsername} />
      <Input placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
      {/* <TouchableOpacity onPress={() => Alert.alert('Hint', 'Password reset not implemented')}>
        <Text style={styles.link}>Forgot Password?</Text>
      </TouchableOpacity> */}
      <TouchableOpacity onPress={() => navigate('Register')}>
        <Text style={styles.link}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  formContainer: { width: width * 0.9 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#6200ea', textAlign: 'center' },
  link: { marginTop: 15, color: '#03a9f4', textAlign: 'center', fontSize: 16 },
  image: { width: width * 0.6, height: 200, marginBottom: 20 },
});

export default LoginScreen;