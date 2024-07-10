import React from 'react';
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

const InterviewItem = ({ item }: { item: any }) => {
    const navigation = useNavigation<NavigationProp<{ "index": undefined, "HomeScreen": undefined, "CreatorScreen": undefined, "EditorialScreen": undefined }>>();
    return (
        <View style={styles.card}>
            {
                item.id == 1 && (
                    <View style={styles.header}>
                        <Image source={require('../../assets/images2/chat.png')} style={styles.chatImage} />
                        <Text style={styles.headerText}>Interviews</Text>
                    </View>
                )
            }
            <TouchableOpacity onPress={() => navigation.navigate("EditorialScreen")}>
                {item.imageUrl && <Image source={{ uri: item.imageUrl }} style={styles.image} />}
            </TouchableOpacity>
            <View style={{ paddingHorizontal: 8 }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.subtitle}>{item.author}</Text>
                    </View>
                    {
                        item.id == 1 && (
                            <TouchableOpacity>
                                <Image source={require('../../assets/images2/next_black.png')} style={styles.imageNext} />
                            </TouchableOpacity>
                        )
                    }
                </View>
                <Text style={styles.description}>
                    {item.description}
                </Text>
            </View>
        </View>
    );
}

interface InterviewsProps {
    interviewsData: any;
}

const Interviews: React.FC<InterviewsProps> = ({ interviewsData }) => {
    return (
        <FlatList
            style={styles.container}
            data={interviewsData}
            renderItem={({ item }) => <InterviewItem item={item} />}
            keyExtractor={item => item.id}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#D9D9D9',
        borderRadius: 20,
        paddingBottom: 40
    },
    card: {
        paddingHorizontal: 10,
        marginTop: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 18,
        marginBottom: 16,
    },
    headerText: {
        fontFamily: "KaiseiRegular",
        color: '#000000',
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
        marginTop: -5,
    },
    title: {
        fontFamily: "KaiseiRegular",
        fontSize: 24,
        lineHeight: 35,
        fontWeight: '400',
        color: '#000000',
        marginTop: 20
    },
    subtitle: {
        fontFamily: "KaiseiRegular",
        fontSize: 16,
        color: '#000000',
        fontWeight: '400',
        lineHeight: 23,
        marginTop: 4,
        marginBottom: 25,
    },
    description: {
        fontFamily: "Caslon",
        fontSize: 20,
        fontWeight: '400',
        color: '#000000',
        lineHeight: 23,
    },
    chatImage: {
        width: 20,
        height: 20,
        marginRight: 6,
        marginTop: 12
    },
});

export default Interviews;
