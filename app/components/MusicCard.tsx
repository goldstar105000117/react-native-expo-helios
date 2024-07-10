import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { getSignedUrl } from '@/s3-utils';

interface MusicCardProps {
    header: string;
    title: string;
    type: string;
    headerIcon: string;
    contentIcon: string;
}

const MusicCard: React.FC<MusicCardProps> = ({ header, title, type, headerIcon, contentIcon }) => {
    const navigation = useNavigation<NavigationProp<{ "MusicScreen": undefined }>>();
    const [images, setImages] = useState<string[]>([]);
    useEffect(() => {
        const fetchImageUrls = async () => {
            const headerIconUrl = await getSignedUrl('heliosassets', headerIcon);
            const contentIconUrl = await getSignedUrl('heliosassets', contentIcon);
            setImages([headerIconUrl, contentIconUrl]);
        };
        fetchImageUrls();
    }, [headerIcon, contentIcon]);
    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("MusicScreen")}>
            <View style={styles.header}>
                {images[0] && <Image
                    source={{ uri: images[0] }}
                    style={styles.pianoImage}
                />}
                <Text style={styles.headerText}>{header}</Text>
            </View>
            <View style={styles.musicArtContainer}>
                {images[1] && <Image
                    source={{ uri: images[1] }}
                    style={styles.musicArt}
                />}
                <View style={styles.musicTextContainer}>
                    <Text style={styles.musicType}>{type}</Text>
                    <Text style={styles.musicTitle}>{title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#B87A37',
        borderRadius: 20,
        paddingLeft: 29,
        paddingRight: 33,
        paddingTop: 33,
        paddingBottom: 37,
        marginTop: 30,
        marginBottom: 50
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 45,
    },
    headerText: {
        fontFamily: "KaiseiRegular",
        color: '#000000',
        fontSize: 26,
        fontWeight: '400',
    },
    musicArtContainer: {
        borderRadius: 20,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: "#FFFFFF"
    },
    musicTextContainer: {
        position: 'absolute',
        bottom: 15,
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    musicArt: {
        width: "100%",
        height: 331
    },
    musicType: {
        fontFamily: 'IMFell',
        fontWeight: '400',
        fontSize: 16,
        color: '#000000',
        marginBottom: 3,
    },
    musicTitle: {
        fontFamily: 'IMFell',
        fontWeight: '400',
        fontSize: 28,
        color: '#000000',
    },
    pianoImage: {
        width: 18,
        height: 18,
        marginRight: 7,
        marginTop: 12
    },
});

export default MusicCard;
