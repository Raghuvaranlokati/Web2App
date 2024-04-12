//HomeScreen
import React, { useState, useEffect } from 'react';
import { Button, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = { link: '', name: '' };

export default function HomeScreen({ navigation }) {
  const [formData, setFormData] = useState(initialState);
  const [savedLinks, setSavedLinks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const saveData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  };

  const loadData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return JSON.parse(value);
      }
    } catch (error) {
      console.error('Error loading data from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    const loadSavedLinks = async () => {
      const savedLinksData = await loadData('savedLinks');
      if (savedLinksData) {
        setSavedLinks(savedLinksData);
      }
    };
    loadSavedLinks();
  }, []);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    const { link, name } = formData;
    if (link && name) {
      const newLinks = [...savedLinks, { link, name }];
      setSavedLinks(newLinks);
      saveData('savedLinks', newLinks);
      setFormData(initialState);
      setShowForm(false);
    }
  };

  const handleLinkPress = (link) => {
    navigation.navigate('Webview', { link });
  };

  const handleDelete = (index) => {
    const newLinks = [...savedLinks];
    newLinks.splice(index, 1);
    setSavedLinks(newLinks);
    saveData('savedLinks', newLinks);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Add Link</Text>
        <Button title="+" onPress={() => setShowForm(!showForm)} />
      </View>
      {showForm && (
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Enter Link"
            onChangeText={(text) => handleInputChange('link', text)}
            value={formData.link}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Name"
            onChangeText={(text) => handleInputChange('name', text)}
            value={formData.name}
          />
          <Button
            title="Save"
            onPress={handleSave}
            disabled={!formData.link || !formData.name}
          />
        </View>
      )}
      <View style={styles.body}>
        {savedLinks.map((link, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => handleLinkPress(link.link)}
          >
            <Text style={styles.cardText}>{link.name}</Text>
            <MaterialIcons
              name="delete"
              size={24}
              color="black"
              onPress={() => handleDelete(index)}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingLeft: 10
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  form: {},
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  body: {
    marginTop: 20,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
