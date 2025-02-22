import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../Redux/favoritesSlice/favoritesSlice';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const RepositoryDetailsScreen = ({ route }) => {
    const { repo } = route.params;
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites);
    const isFavorite = favorites.some(item => item.id === repo.id);
    const [contributors, setContributors] = useState([]);

    useEffect(() => {
        const fetchContributors = async () => {
            try {
                const response = await axios.get(repo.contributors_url);
                setContributors(response.data);
            } catch (error) {
                console.error('Error fetching contributors', error);
            }
        };

        fetchContributors();
    }, []);

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <View style={styles.headerContainer}>
                    <Image source={{ uri: repo.owner.avatar_url }} style={styles.avatar} />
                    <Text style={styles.ownerName}>{repo.owner.login}</Text>
                </View>
                <Text style={styles.repoName}>{repo.name}</Text>
                <Text style={styles.description}>{repo.description || 'No description available'}</Text>

                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Icon name="star" size={20} color="#FFD700" />
                        <Text style={styles.statsText}>{repo.stargazers_count}</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Icon name="source-fork" size={20} color="#1E90FF" />
                        <Text style={styles.statsText}>{repo.forks_count}</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Icon name="code-tags" size={20} color="#FF4500" />
                        <Text style={styles.statsText}>{repo.language || 'N/A'}</Text>
                    </View>
                </View>


                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>
                        <Icon name="calendar" size={18} color="#777777" /> Created: {new Date(repo.created_at).toDateString()}
                    </Text>
                    <Text style={styles.dateText}>
                        <Icon name="update" size={18} color="#777777" /> Updated: {new Date(repo.updated_at).toDateString()}
                    </Text>
                </View>


                <TouchableOpacity
                    onPress={() => isFavorite ? dispatch(removeFavorite(repo.id)) : dispatch(addFavorite(repo))}
                    style={styles.favoriteButtonContainer}
                    activeOpacity={0.8}
                >
                    <LinearGradient
                        colors={isFavorite ? ['#FF5A5F', '#D91E18'] : ['#1E90FF', '#007AFF']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.favoriteButton}
                    >
                        <Icon name={isFavorite ? "heart" : "heart-outline"} size={20} color="white" />
                        <Text style={styles.favoriteButtonText}>
                            {isFavorite ? ' Remove from Favorites' : ' Add to Favorites'}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>

            </Card>

            <Text style={styles.sectionTitle}>Contributors </Text>
            <FlatList
                data={contributors}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.contributorContainer}>
                        <Image source={{ uri: item.avatar_url }} style={styles.contributorAvatar} />
                        <Text style={styles.contributorText}>{item.login}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
        padding: 15,
        top: 20
    },

    card: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 0,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },

    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        width: '100%',
    },

    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 2,
        borderColor: '#DDD',
    },

    ownerName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333333',
        marginLeft: 10,
        flexShrink: 1,
        maxWidth: '75%',
    },

    repoName: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#222222',
        marginTop: 10,
        textAlign: 'center',
    },

    description: {
        color: '#666666',
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
        flexDirection: 'column',

    },

    statsText: {
        color: '#1E90FF',
        fontSize: 16,
        marginTop: 4,
        textAlign: 'center',
    },

    dateContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },

    dateText: {
        color: '#777777',
        fontSize: 14,
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#222222',
        marginTop: 15,
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

    contributorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 0,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },

    contributorAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },

    contributorText: {
        color: '#222222',
        fontSize: 16,
    },

});


export default RepositoryDetailsScreen;
