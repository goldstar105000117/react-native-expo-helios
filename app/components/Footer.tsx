import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

const Footer = () => {
    const navigation = useNavigation<NavigationProp<{"index": undefined, "HomeScreen": undefined, "CreatorScreen": undefined, "EditorialScreen": undefined}>>();
    return (
        <View style={styles.container}>
            <View style={{ width: 30, height: 1.5, backgroundColor: "#FFFFFF", alignSelf: "center", marginBottom: 50 }}></View>
            <Text style={styles.smallText}>WRITTEN & DIRECTED BY</Text>
            <Text style={styles.nameText}>Arya</Text>
            <Text style={[styles.smallText, { marginTop: 25 }]}>FOR</Text>
            <Text style={styles.companyText}>Agni, Inc.</Text>
            <Text style={styles.subtitleText}>Sincere Stories</Text>
            <Text style={styles.titleText}>Children of {'\n'} the Sea</Text>
            <Text style={[styles.smallText, { marginVertical: 50 }]}>FEATURING</Text>
            <TouchableOpacity style={{ display: 'flex', flexDirection: "column", alignItems: 'center' }} onPress={() => navigation.navigate("CreatorScreen")}>
                <Image
                    source={require('../../assets/images2/partner1.jpeg')}
                    style={styles.image}
                />
                <Text style={styles.subNameText}>Gitanjali Angmo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ display: 'flex', flexDirection: "column", alignItems: 'center' }} onPress={() => navigation.navigate("CreatorScreen")}>
                <Image
                    source={require('../../assets/images2/partner2.png')}
                    style={styles.image}
                />
                <Text style={styles.subNameText}>Sonam Wangchuk</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1F2327',
        alignItems: 'center',
    },
    smallText: {
        fontFamily: 'IMFell',
        color: '#FFFFFF',
        fontWeight: '400',
        fontSize: 16,
    },
    nameText: {
        fontFamily: 'IMFell',
        color: '#FFFFFF',
        fontSize: 32,
        marginTop: 13,
        fontWeight: '400',
    },
    subNameText: {
        fontFamily: 'IMFell',
        color: '#FFFFFF',
        fontSize: 26,
        marginTop: 19,
        marginBottom: 50,
        fontWeight: '400',
    },
    companyText: {
        fontFamily: 'IMFell',
        color: '#FFFFFF',
        fontSize: 40,
        marginTop: 25,
        fontWeight: '400',
    },
    subtitleText: {
        fontFamily: 'Caslon',
        color: '#FFFFFF',
        fontWeight: '400',
        fontSize: 16,
        marginTop: 12
    },
    titleText: {
        fontFamily: 'IMFell',
        color: '#FFFFFF',
        fontSize: 50,
        marginTop: 40,
        fontWeight: '400',
        textAlign: 'center'
    },
    image: {
        width: 108,
        height: 108,
        borderRadius: 54,
        marginTop: 15
    }
});

export default Footer;
