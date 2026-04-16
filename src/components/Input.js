import React from 'react';
import { View, Text, TextInput } from 'react-native';
export default function Input({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
}) {
  return (
    <View>
      {label && <Text>{label}</Text>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
    </View>
  );
}
