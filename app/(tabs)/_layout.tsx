import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';

export default function IndexScreen() {
  const [bgColor, setBgColor] = useState<string>('#ffffff');

  const generateRandomColor = (): void => {
    const randomColor: string = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setBgColor(randomColor);
  };

  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: bgColor }]} onPress={generateRandomColor}>
      <Text style={styles.text}>Hello there</Text>
      <Text style={styles.colorCode}>{bgColor}</Text>
    </TouchableOpacity>
  );
}

interface Style {
  container: ViewStyle;
  text: TextStyle;
  colorCode: TextStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  colorCode: {
    position: 'absolute',
    bottom: 20,
    fontSize: 16,
    color: '#000',
  },
});
