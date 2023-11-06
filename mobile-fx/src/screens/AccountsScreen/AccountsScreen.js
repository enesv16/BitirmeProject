import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import currencyAPI from '../../../config/currencyAPI';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import {styles} from './accountsStyles';

const AccountsScreen = () => {
  const navigation = useNavigation();
  const [accounts, setAccounts] = useState([]);

  const handleCreateAccount = () => {
    navigation.navigate('CreateAccountScreen');
  };

  // Hesapları API'den almak için useEffect kullanılıyor
  useEffect(() => {
    fetch(`${currencyAPI.baseURL}/wallets`)
      .then(response => response.json())
      .then(data => setAccounts(data))
      .catch(error => console.error(error));
  }, []);

  // Her bir hesabın render edilmesini sağlayan yardımcı fonksiyon
  const renderAccount = (account, index) => {
    return (
      <View key={index} style={styles.accountContainer}>
        <View style={styles.accountInfo}>
          <Text style={styles.currencyText}>{account.currency}</Text>
          <Text style={styles.infoText}>{account.branch}</Text>
        </View>
        <View style={styles.assetsContainer}>
          <Text style={styles.assetsTitle}>Varlıklar</Text>
          <Text style={styles.assetsText}>{account.amount}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Hesaplar</Text>
        <View style={styles.separator} />
      </View>
      <View style={styles.content}>
        <ScrollView>
          {/* Hesapları haritalayarak renderAccount fonksiyonunu çağırır */}
          {accounts.map((account, index) => renderAccount(account, index))}
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.createButton} onPress={handleCreateAccount}>
            <Text style={styles.createButtonText}>Hesap Oluştur</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AccountsScreen;
