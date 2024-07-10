import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface DirectorNoteProps {
  title: string;
  content: string;
}

const DirectorNote: React.FC<DirectorNoteProps> = ({ title, content }) => {
  return (
    <View style={styles.container}>
      <View style={styles.noteCard}>
        <View style={{ display: 'flex', flexDirection: "row", alignItems: 'center' }}>
          <Image source={require('../../assets/images2/directorLogo.png')} style={styles.image} />
          <Text style={styles.title}>{title}</Text>
        </View>
        <Text style={styles.content}>
          {content}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F2327',
    padding: 0,
    marginTop: 49,
    marginBottom: 25,
  },
  noteCard: {
    backgroundColor: '#6A7682',
    width: '100%',
    paddingHorizontal: 31,
    paddingTop: 25,
    paddingBottom: 34,
    borderRadius: 20,
  },
  title: {
    fontFamily: "KaiseiRegular",
    color: '#000000',
    fontSize: 26,
    fontWeight: '400',
    marginBottom: 20,
  },
  content: {
    fontFamily: "Caslon",
    color: '#000000',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 28,
  },
  image: {
    width: 20,
    height: 20,
    marginTop: -10,
    marginRight: 12,
  },
});

export default DirectorNote;
