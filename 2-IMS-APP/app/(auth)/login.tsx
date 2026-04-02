import { TextInput, Button } from 'react-native-paper';
import { useContext, useState } from 'react';
import { router } from 'expo-router';
import { AuthContext } from '@/src/context/AuthContext';
import { View } from 'react-native';

export default function Login() {
    const { signIn, authLoading } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            console.log('Please fill all fields');
            return;
        }

        try {
            await signIn({ email, password });
            router.replace('/(protected)/home');
        } catch (err) {
            console.log('Login failed');
        }
    };

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                padding: 16,
            }}
        >
            <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                style={{ marginBottom: 16 }}
            />

            <TextInput
                label="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={{ marginBottom: 16 }}
            />

            <Button
                mode="contained"
                onPress={handleLogin}
                loading={authLoading}
                style={{ borderRadius: 5 }}
                contentStyle={{ height: 48 }}
            >
                Login
            </Button>
        </View>
    );
}