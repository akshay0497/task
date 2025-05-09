import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView
} from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import { saveUser } from '../utils/storage';

const { width } = Dimensions.get('window');

const RegisterScreen = ({ navigate }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    try {
      await saveUser(username, password);
      Alert.alert('Success', 'User registered successfully');
      navigate('Login');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/295/295128.png' }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Register</Text>
      <View style={styles.formContainer}>
        <Input placeholder="Username" value={username} onChangeText={setUsername} />
        <Input placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
        <Button title="Register" onPress={handleRegister} />
        <TouchableOpacity onPress={() => navigate('Login')}>
          <Text style={styles.link}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  formContainer: { width: width * 0.9 },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6200ea',
    textAlign: 'center'
  },
  link: { marginTop: 15, color: '#03a9f4', textAlign: 'center', fontSize: 16 },
  image: { width: width * 0.6, height: 200, marginBottom: 20 },
});

export default RegisterScreen;
