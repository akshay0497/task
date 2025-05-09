import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Input = ({ placeholder, value, onChangeText, secureTextEntry }) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
    secureTextEntry={secureTextEntry}
  />
);

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
  },
});

export default Input;