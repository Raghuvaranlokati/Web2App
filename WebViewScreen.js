import React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, SafeAreaView } from 'react-native';

export default function WebViewScreen({ route }) {
  const { link } = route.params; // Retrieve link from navigation params

  return (
    <SafeAreaView style={styles.safeArea}>
      <WebView source={{ uri: link }} style={styles.webView} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 25, // Add some padding at the top
  },
  webView: {
    flex: 1,
  },
});
