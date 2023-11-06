import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { CurrencyPairProvider } from './src/contexts/CurrencyContext/CurrencyPairProvider';
import Navigation from './src/Navigation';


const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <CurrencyPairProvider>
        <Navigation />
      </CurrencyPairProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default App;