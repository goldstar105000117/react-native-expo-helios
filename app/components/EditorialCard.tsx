import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { getSignedUrl } from '@/s3-utils';

interface EditorialCardProps {
    header: string;
    title: string;
    subtitle: string;
    content: string;
    headerIcon: string;
    contentImage: string;
    nextIcon: string;
}

const EditorialCard: React.FC<EditorialCardProps> = ({ header, title, subtitle, content, headerIcon, contentImage, nextIcon }) => {
    const [images, setImages] = useState<string[]>([]);
    useEffect(() => {
        const fetchImageUrls = async () => {
            const headerIconUrl = await getSignedUrl('heliosassets', headerIcon);
            const contentImageUrl = await getSignedUrl('heliosassets', contentImage);
            const nextIconUrl = await getSignedUrl('heliosassets', nextIcon);
            setImages([headerIconUrl, contentImageUrl, nextIconUrl]);
        };
        fetchImageUrls();
    }, [headerIcon, contentImage]);

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                {images[0] && <Image
                    source={{ uri: images[0] }}
                    style={styles.penImage}
                />}
                <Text style={styles.headerText}>{header}</Text>
            </View>
            {images[1] && <Image
                source={{ uri: images[1] }}
                style={styles.image}
            />}
            <View style={{ paddingHorizontal: 18 }}>
                <View style={{ display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={styles.title}>{title}</Text>
                    <TouchableOpacity>
                        {images[2] && <Image
                            source={{ uri: images[2] }}
                            style={styles.imageNext}
                        />}
                    </TouchableOpacity>
                </View>
                <Text style={styles.subtitle}>{subtitle}</Text>
                <Text style={styles.description}>
                    {content}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#1F2327',
        paddingHorizontal: 10,
        marginTop: 20,
        marginBottom: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 18,
        marginBottom: 16,
    },
    headerText: {
        fontFamily: "KaiseiRegular",
        color: '#FFFFFF',
        fontSize: 26,
        fontWeight: '400',
    },
    image: {
        width: '100%',
        height: 250,
        borderRadius: 20,
        marginVertical: 8,
    },
    imageNext: {
        width: 12,
        height: 26,
        marginTop: 25,
    },
    title: {
        fontFamily: "KaiseiRegular",
        fontSize: 24,
        lineHeight: 35,
        fontWeight: '400',
        color: '#FFFFFF',
        marginTop: 20
    },
    subtitle: {
        fontFamily: "KaiseiRegular",
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: '400',
        marginTop: 4,
        marginBottom: 25,
    },
    description: {
        fontFamily: "Caslon",
        fontSize: 20,
        fontWeight: '400',
        color: '#FFFFFF',
        lineHeight: 23,
    },
    penImage: {
        width: 18,
        height: 18,
        marginRight: 12,
        marginTop: 12
    },
});

export default EditorialCard;
