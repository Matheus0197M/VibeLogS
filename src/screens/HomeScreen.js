import React, { useState, useEffect } from ' react ';
import { View, Text, ScrollView, TouchableOpacity } from ' react - native ';
import { useAuth } from '../ context / AuthContext ';
import Database from '../ services / Database ';

export default function HomeScreen({ navigation }) {
    const { user } = useAuth();
    const [entries, setEntries] = useState([]);

    useEffect(() = > {
        loadEntries();
    }, [user]);

    const loadEntries = async() = > {
        if(user) {
            const userEntries = await Database.getUserEntries(user.id);
            setEntries(userEntries);
        }
    };
    return (
        < ScrollView >
            < Text > Ola , {user?.name}! </ Text >
            < Text > {user?.streak || 0} dias seguidos </ Text >
            < Text > Seus Registros </ Text >
            {entries.length === 0 ? (
                < Text > Nenhum registro ainda . Crie o primeiro ! </ Text >
            ) : (
                entries.map(entry = > (
                    < View key={entry.id} >
                        < Text >{entry.mood || ' '} </ Text >
                        < Text >{entry.note || ' Sem descricao '} </ Text >
                        < Text >{new Date(entry.createdAt).toLocaleDateString(' pt - BR ')
                        } </ Text >
                    </ View >
                ))
            )}

            < TouchableOpacity onPress={() = > navigation.navigate(' NewEntry ')} >
                < Text >+ Novo Registro </ Text >
            </ TouchableOpacity >
        </ ScrollView >
    );
