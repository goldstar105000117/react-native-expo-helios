import { StyleSheet, Image, Animated } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import {useEffect, useRef} from 'react';
import { Text, View } from 'react-native';

const HomeScreen:React.FC = () => {
  const navigation = useNavigation<NavigationProp<{"HomeScreen": undefined}>>();

  const fadeAnim = useRef(new Animated.Value(0)).current;  // Initial opacity for fade in/out
  const fadeAnim2 = useRef(new Animated.Value(0)).current; 
  const translateY = useRef(new Animated.Value(50)).current;
  const translateY2 = useRef(new Animated.Value(50)).current;
  const rotation = useRef(new Animated.Value(0)).current;  // Initial value for rotation


  const enterAnimation = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();
  };
  const enterAnimation2 = () => {
    Animated.parallel([
      Animated.timing(fadeAnim2, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      }),
      Animated.timing(translateY2, {
        toValue: 0,
        duration: 4000,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const exitAnimation = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -50,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const startRotation = () => {
    rotation.setValue(0);
    Animated.timing(rotation, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start(() => startRotation());
  };

  const rotateData = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    enterAnimation();
    startRotation();
    enterAnimation2();
    const timer = setTimeout(() => {
      exitAnimation();
      // navigation.navigate('HomeScreen');
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.log}>
        <Animated.View style={[{ opacity: fadeAnim, transform: [{ translateY }, { rotate: rotateData }] }]}>
          <Image source={require('../assets/images2/logo.png')} style={{ width: 80, height: 80 }} />
        </Animated.View>
        <Animated.View style={[{ opacity: fadeAnim2, transform:[{ translateY }], marginTop:20}]}>
          <Text style = {{fontFamily: 'Bodoni', fontSize:18}}>May 13, 2024</Text>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  log: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  text: {
    fontSize: 20,
    fontStyle: 'normal',
    textAlign: 'center',
    letterSpacing: -0.015,
    alignItems: 'center',
    fontFamily: 'Baskerville',
    lineHeight: 54,
    display: 'flex',
  },
  container : {
    flex:1
  },

});

export default HomeScreen;