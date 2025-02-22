import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../../Screens/HomeScreen/HomeScreen';
import FavoritesScreen from '../../Screens/FavoritesScreen/FavoritesScreen';
import { createStackNavigator } from '@react-navigation/stack';
import RepositoryDetailsScreen from '../../Screens/RepositoryDetailsScreen/RepositoryDetailsScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Search Repositories" component={HomeScreen} />
        <Stack.Screen name="Repository Details" component={RepositoryDetailsScreen} />
    </Stack.Navigator>
);

const FavoritesStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Favorites List" component={FavoritesScreen} />
        <Stack.Screen name="Repository Details" component={RepositoryDetailsScreen} />
    </Stack.Navigator>
);

const Navigation = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => {
                        let iconName = route.name === 'Home' ? 'home' : 'heart';
                        return <Icon name={iconName} size={size} color={color} />;
                    },
                })}
            >
                <Tab.Screen name="Home" component={HomeStack} />
                <Tab.Screen name="Favorites" component={FavoritesStack} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
