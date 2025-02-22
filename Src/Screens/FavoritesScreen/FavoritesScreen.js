import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { removeFavorite } from '../../Redux/favoritesSlice/favoritesSlice';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const FavoritesScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites);

    return (
        <View style={styles.container}>
            <FlatList
                data={favorites}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Repository Details', { repo: item })}
                        activeOpacity={0.8}
                    >
                        <Card style={styles.card}>
                            <View style={styles.headerContainer}>
                                <Image source={{ uri: item.owner.avatar_url }} style={styles.avatar} />
                                <Text style={styles.ownerName}>{item.owner.login}</Text>
                            </View>
                            <Text style={styles.repoName}>{item.name}</Text>
                            <Text style={styles.description}>{item.description || 'No description available'}</Text>

                            <View style={styles.statsContainer}>
                                <View style={styles.statItem}>
                                    <Icon name="star" size={20} color="#FFD700" />
                                    <Text style={styles.statsText}>{item.stargazers_count}</Text>
                                </View>
                                <View style={styles.statItem}>
                                    <Icon name="source-fork" size={20} color="#1E90FF" />
                                    <Text style={styles.statsText}>{item.forks_count}</Text>
                                </View>
                                <View style={styles.statItem}>
                                    <Icon name="code-tags" size={20} color="#FF4500" />
                                    <Text style={styles.statsText}>{item.language || 'N/A'}</Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={() => dispatch(removeFavorite(item.id))}
                                style={styles.favoriteButtonContainer}
                                activeOpacity={0.8}
                            >
                                <LinearGradient
                                    colors={['#FF5A5F', '#D91E18']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={styles.favoriteButton}
                                >
                                    <Icon name="heart" size={20} color="white" />
                                    <Text style={styles.favoriteButtonText}> Remove from Favorites</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                        </Card>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
        paddingTop: 40,
    },

    card: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 0,
        width: '100%',
        borderWidth: 0.2
    },

    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#DDD',
    },

    ownerName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 10,
        flexShrink: 1,
    },

    repoName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#222',
        textAlign: 'center',

    },

    description: {
        color: '#666',
        marginBottom: 10,
        textAlign: 'center',
    },

    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },

    statItem: {
        alignItems: 'center',
    },

    statsText: {
        color: '#1E90FF',
        fontSize: 16,
        marginTop: 4,
        textAlign: 'center',
    },

    favoriteButtonContainer: {
        alignSelf: 'center',
        borderRadius: 25,
        overflow: 'hidden',
        marginTop: 15,
    },

    favoriteButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 6,
    },

    favoriteButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
});

export default FavoritesScreen;
