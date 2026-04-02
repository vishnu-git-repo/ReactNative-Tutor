import { Slot, Redirect } from 'expo-router';
import { useContext } from 'react';
import { AuthContext } from '../../src/context/AuthContext';
import { View, ActivityIndicator } from 'react-native';

export default function ProtectedLayout() {
  const { user, authLoading } = useContext(AuthContext);

  if (authLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Slot />;
}