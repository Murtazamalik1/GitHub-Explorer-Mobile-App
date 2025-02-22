import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {

    // State management for query, repositories, pagination, and loading
    const [query, setQuery] = useState('');
    const [repositories, setRepositories] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    // Effect triggered when the query changes, resetting repositories and page
    useEffect(() => {
        setRepositories([]);
        setPage(1);
        searchRepositories(1, true);
    }, [query]);

    // Function to fetch repositories from GitHub API
    const searchRepositories = async (pageNumber = 1, newSearch = false) => {
        if (!query.trim()) return;
        setLoading(true);

        try {
            const response = await fetch(`https://api.github.com/search/repositories?q=${query}&per_page=10&page=${pageNumber}`);
            const data = await response.json();

            if (data.items) {
                setRepositories(newSearch ? data.items : [...repositories, ...data.items]); // Append new items or replace if it's a new search
                setHasMore(data.items.length > 0);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching repositories', error);
        } finally {
            setLoading(false);
        }
    };

    // Function to load more repositories on reaching end of the list
    const loadMore = () => {
        if (!loading && hasMore) {
            setPage(page + 1);
            searchRepositories(page + 1);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.Header}>GitHub Explorer</Text>

            <View style={styles.inputContainer}>
                <Icon name="magnify" size={20} color="#888" style={{ marginRight: 10 }} />
                <TextInput
                    placeholder="Search Repositories..."
                    value={query}
                    onChangeText={(text) => setQuery(text)}
                    style={{ flex: 1, fontSize: 16 }}
                />
            </View>

            <FlatList
                data={repositories}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Card style={styles.card}>
                        <TouchableOpacity onPress={() => navigation.navigate('Repository Details', { repo: item })}>
                            <View style={styles.avatarContainer}>
                                <Image source={{ uri: item.owner.avatar_url }} style={styles.avatar} />
                                <View>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
                                    <Text style={{ color: '#555' }}>{item.language || 'Unknown Language'}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Card>
                )}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={loading && <ActivityIndicator size="large" color="#007bff" />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 15,
        top: 40
    },

    Header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },

    inputContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
    },

    card: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 10,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: '#ccc',
        borderRadius: 0,
        elevation: 0,
        shadowOpacity: 0,
    },

    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
});

export default HomeScreen;
