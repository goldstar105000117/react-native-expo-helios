import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const Header = () => {
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => console.log('Back pressed')}>
                <MaterialIcons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Image source={require('../../assets/images2/logo.png')} style={styles.logo} />
            <TouchableOpacity onPress={() => console.log('Avatar pressed')}>
                <MaterialCommunityIcons name="account-circle" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 60,
        paddingRight: 17,
        paddingBottom: 49,
        paddingLeft: 29,
        backgroundColor: '#1F2327'
    },
    logo: {
        width: 49,
        height: 49
    }
});

export default Header;