import React, { useState } from 'react';
import { View, TextInput, Button, Image, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker'; // Import from expo-image-picker

const RegisterForm = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(null);

  // Declare the function as async since you're using await inside
  const handleChoosePhoto = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });
      if (!result.canceled) {
        setPhoto(result.assets[0]); // Ensure you access result.assets[0] for the photo
      } else {
        console.log("User cancelled image picker");
      }
    } catch (error) {
      console.log("ImagePicker Error: ", error);
    }
  };

  const handleRegister = async () => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);

    if (photo) {
      formData.append('photo', {
        uri: photo.uri,
        type: 'image/jpeg', // Adjust type if needed
        name: photo.fileName || 'photo.jpg', // Fallback if fileName is missing
      });
    }

    try {
      const res = await axios.post('http://192.168.43.5:3001/api/users/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data) {
        navigation.navigate('Profile', { userId: res.data._id });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Choose Photo" onPress={handleChoosePhoto} />
      {photo && <Image source={{ uri: photo.uri }} style={styles.image} />}
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
});

export default RegisterForm;
