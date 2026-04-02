import { View, Text, Button } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '@/src/context/AuthContext';
import { router } from 'expo-router';

export default function Home() {
  const { signOut } = useContext(AuthContext);

  const handleLogout = async () => {
    await signOut();
    router.replace('/(auth)/login');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}