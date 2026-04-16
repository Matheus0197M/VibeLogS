import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
export default function Button({ title, onPress, disabled }) {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Text>{disabled ? '...' : title}</Text>
    </TouchableOpacity>
  );
}
