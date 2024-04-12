import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';

export default function WebViewScreen({ route }) {
  const { link } = route.params; // Retrieve link from navigation params
  const [loading, setLoading] = useState(true);

  // Define custom user agent
  const userAgent = 'Mozilla/5.0 (Windows NT 10.0; rv:102.0) Gecko/20100101 Firefox/102.0';

  return (
    <SafeAreaView style={styles.safeArea}>
      <WebView
        source={{ uri: link }}
        style={styles.webView}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        sharedCookiesEnabled={true}
        domStorageEnabled={true}
        javaScriptEnabled={true}
        userAgent={userAgent} // Set custom user agent
      />
      {loading && (
        <ActivityIndicator
          style={styles.loadingIndicator}
          size="large"
          color="#0000ff"
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 27, // Add some padding at the top
  },
  webView: {
    flex: 1,
  },
  loadingIndicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
});
