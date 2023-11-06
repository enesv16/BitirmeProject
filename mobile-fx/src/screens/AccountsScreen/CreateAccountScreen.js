import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import {styles} from './createAccountStyles';

const CreateAccountScreen = () => {
  const [currency, setCurrency] = useState('');
  const [branch, setBranch] = useState('');
  const [assets, setAssets] = useState('');

  const navigation = useNavigation();

  const handleCreateAccount = () => {
    const newAccount = {
      currency,
      branch,
      assets,
    };


    console.log('Hesap oluşturuldu:', newAccount);

 
    navigation.navigate('AccountsScreen', { newAccount });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Text style={styles.backButtonText}>&lt; Geri</Text>
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.title}>Hesap Oluştur</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Para Birimi"
            value={currency}
            onChangeText={setCurrency}
          />
          <TextInput
            style={styles.input}
            placeholder="Şube"
            value={branch}
            onChangeText={setBranch}
          />
          <TextInput
            style={styles.input}
            placeholder="Varlıklar"
            value={assets}
            onChangeText={setAssets}
          />
          <TouchableOpacity style={styles.createButton} onPress={handleCreateAccount}>
            <Text style={styles.createButtonText}>Hesap Oluştur</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CreateAccountScreen;
