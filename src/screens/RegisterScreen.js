import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { useAuth } from ''../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert('Erro', 'Preencha email e senha'); return;
        }

        setLoading(true);
        const result = await login(email.trim(), password);
        setLoading(false);

        if (!result.success) {
            Alert.alert('Erro', result.error || 'Nao foi possivel entrar');
        }
    };

    return (
        <View>
            <Text>VibeLogS</Text>
            <Text>Seu diario emocional</Text>

            <Input label="Email" value={email} onChangeText={setEmail}
                placeholder="seu@email.com" keyboardType="email-address"
                autoCapitalize="none" />

            <Input label="Senha" value={password} onChangeText={setPassword}
                placeholder="******" secureTextEntry />

            <Button title={loading ? "Entrando..." : "Entrar"}
                onPress={handleLogin} disabled={loading} />

            <Text onPress={() => navigation.navigate('Register')}>
                Nao tem conta? Cadastre-se
            </Text>
        </View>
    );
}