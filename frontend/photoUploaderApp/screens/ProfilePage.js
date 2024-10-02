import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';

const ProfilePage = ({ route }) => {
  const { userId } = route.params;
  const [user, setUser] = useState(null);

  useEffect(() =>{
    const fetchUser = async () => {
      try {
        console.log('Fetchin user with id :', userId )
        const res = await axios.get(`http://192.168.43.5:3001/api/users/profile/${userId}`)
        console.log('User data received :', res.data);
        setUser(res.data);
      } catch (error) {
        console.error('Error fetching user profile:', error)
      }
    };
    fetchUser();
  }, [userId])

  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.username}>{user.username}</Text>
      <Image
        source={{ uri: `http://192.168.43.5:3001/${user.photo}` }}
        style={styles.profileImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
});

export default ProfilePage;
