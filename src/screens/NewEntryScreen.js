import React, { useState } from ' react ';

import { View, Text, TextInput, TouchableOpacity, Alert } from ' react -
native ';
import { useAuth } from '../ context / AuthContext ';
import Database from '../ services / Database ';
import Button from '../ components / Button ';

const MOODS = [
    { emoji: ' ', label: ' Incrivel ', value: ' ecstatic ' },
    { emoji: ' ', label: 'Bem ', value: ' happy ' },
    { emoji: ' ', label: ' Neutro ', value: ' neutral ' },
    { emoji: ' ', label: 'Mal ', value: 'sad ' },
    { emoji: ' ', label: ' Terrivel ', value: ' terrible ' },
];

export default function NewEntryScreen({ navigation }) {
    const { user } = useAuth();
    const [selectedMood, setSelectedMood] = useState(null);
    const [note, setNote] = useState(' ');
    const [loading, setLoading] = useState(false);
    const handleSave = async() = > {
        if(!selectedMood) {
            Alert.alert(' Erro ', ' Selecione como voce esta se sentindo ');
            return;
        }
setLoading( true);
const result = await Database.saveEntry(user.id, {
            mood: selectedMood.emoji,
            moodValue: selectedMood.value,
            note: note.trim(),
        }) ;
        setLoading( false);
if(result .success ) {
            navigation .goBack ();
} else {
    Alert.alert(' Erro ', ' Nao foi possivel salvar ');
}
};
return (
    < View >
        < Text > Novo Registro </ Text >
        < Text > Como voce esta se sentindo ? </ Text >
        < View >
            {MOODS.map((mood) = > (
                < TouchableOpacity key={mood.value} onPress={() = >
                    setSelectedMood(mood)} >
                    < Text >
                        {selectedMood?.value === mood.value ? ' ' : ' '} {mood
                            .emoji} {mood.label}
                    </ Text >
                </ TouchableOpacity >
            ))}
        </ View >

        < Text > O que aconteceu hoje ? </ Text >
        < TextInput value={note} onChangeText={setNote}
            placeholder=" Descreva seu dia ..." multiline
            numberOfLines={4} />
        < Button title={loading ? " Salvando ..." : " Salvar "}
            onPress={handleSave} disabled={loading} />
        < Button title=" Cancelar " onPress={() = > navigation.goBack()} />
    </ View >
);
}