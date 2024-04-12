import React, { useState } from 'react';
import { Button, View, Text, TextInput, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Import MaterialIcons from Expo

const initialState = { link: '', name: '' };

export default function HomeScreen({ navigation }) {
  const [formData, setFormData] = useState(initialState);
  const [savedLinks, setSavedLinks] = useState([]);
  const [showForm, setShowForm] = useState(false); // State to control form visibility

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    const { link, name } = formData;
    if (link && name) {
      setSavedLinks([...savedLinks, { link, name }]);
      setFormData(initialState);
      setShowForm(false); // Hide form after saving
    }
  };

  const handleLinkPress = (link) => {
    navigation.navigate('Webview', { link }); // Navigate to webview on link press
  };

  const handleDelete = (index) => {
    const newLinks = [...savedLinks];
    newLinks.splice(index, 1);
    setSavedLinks(newLinks);
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
          <View key={index} style={styles.card}>
            <Text style={styles.cardText} onPress={() => handleLinkPress(link.link)}>
              {link.name}
            </Text>
            <MaterialIcons
              name="delete"
              size={24}
              color="black"
              onPress={() => handleDelete(index)}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white', // Gray background color
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
   
    paddingLeft:10
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
