import React, {useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Modal } from 'react-native';
import { styles } from './styles';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CurrencyPairContext } from '../../contexts/CurrencyContext/CurrencyPairProvider';
import notifee from '@notifee/react-native';

const CurrencyAlarmScreen = ({ navigation }) => {
  const [selectedCurrencyFrom, setSelectedCurrencyFrom] = useState('');
  const [selectedCurrencyTo, setSelectedCurrencyTo] = useState('');
  const { currencyPairs } = useContext(CurrencyPairContext);
  const [alarmPrice, setAlarmPrice] = useState('');
  const [alarmPriceFloat, setAlarmPriceFloat] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [isAlarmSet, setIsAlarmSet] = useState(false);

  useEffect(() => {
    // Alarm kontrolü 5 saaniyede bir gerçekleşmesi için kurulan interval
    const alarmInterval = setInterval(() => {
      if (isAlarmSet && selectedCurrencyFrom && selectedCurrencyTo && alarmPriceFloat) {
        console.log(currencyPairs);
        const currentPrice = getCurrentExchangeRate(selectedCurrencyFrom, selectedCurrencyTo); // güncel döviz kuru alma işlemi fonksiyonu
        if (currentPrice && currentPrice >= alarmPriceFloat) {
           console.log("ulasildi");
          notifee.displayNotification({
            title: 'Döviz Alarmı',
            body: 'Belirlediğiniz alarm fiyatına ulaşıldı!',
            android: {
              channelId: 'default',
              smallIcon: 'ic_launcher_round',
            },
          });
          setIsAlarmSet(false); // Alarmı sıfırla
        }
      }
    }, 5000); // 5 saniyede bir kontrol et (gerektiğine göre ayarlayabilirsiniz)

    return () => {
      clearInterval(alarmInterval); // Komponentin temizlenmesinde interval'i temizleyip belleği boşaltma
    };
  }, [isAlarmSet, selectedCurrencyFrom, selectedCurrencyTo, alarmPrice]);

  const getCurrentExchangeRate = (selectedCurrencyFrom,selectedCurrencyTo) =>{
    const currencyPair = currencyPairs.find(
      (item) => item.pair === `${selectedCurrencyFrom}/${selectedCurrencyTo}`
    );

    return currencyPair.value;
  };

  const handleCurrencyFromSelection = (currency) => {
    setSelectedCurrencyFrom(currency);
  };

  const handleCurrencyToSelection = (currency) => {
    setSelectedCurrencyTo(currency);
  };

  const handleReverseCurrencies = () => {
    setSelectedCurrencyFrom(selectedCurrencyTo);
    setSelectedCurrencyTo(selectedCurrencyFrom);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSetAlarm = () => {
    if (!selectedCurrencyFrom || !selectedCurrencyTo || !alarmPrice) {
      setModalVisible(true);
    } else {
      setAlarmPriceFloat(parseFloat(alarmPrice)); 
      setIsAlarmSet(true); // Alarmı kur
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Currency Alarm</Text>
      </View>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Text style={styles.backButtonText}>&lt; Geri</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.currencyContainer}>
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.currencyPicker}
              selectedValue={selectedCurrencyFrom}
              onValueChange={handleCurrencyFromSelection}
            >
              <Picker.Item label="From" value="" />
              <Picker.Item label="EUR" value="EUR" />
              <Picker.Item label="USD" value="USD" />
              <Picker.Item label="GBP" value="GBP" />
              <Picker.Item label="JPY" value="JPY" />
            </Picker>
          </View>

          <TouchableOpacity style={styles.reverseButton} onPress={handleReverseCurrencies}>
            <Icon name="exchange" size={20} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.pickerContainer}>
            <Picker
              style={styles.currencyPicker}
              selectedValue={selectedCurrencyTo}
              onValueChange={handleCurrencyToSelection}
            >
              <Picker.Item label="To" value="" />
              <Picker.Item label="GBP" value="GBP" />
              <Picker.Item label="JPY" value="JPY" />
              <Picker.Item label="EUR" value="EUR" />
              <Picker.Item label="USD" value="USD" />
              <Picker.Item label="TRY" value="TRY" />
            </Picker>
          </View>
        </View>

        <View style={styles.alarmContainer}>
          <Text style={styles.alarmLabel}>Alarm Fiyatı</Text>
          <TextInput
            style={styles.alarmInput}
            placeholder="0.00"
            keyboardType="numeric"
            value={alarmPrice}
            onChangeText={setAlarmPrice}
          />
        </View>

        <TouchableOpacity
          style={[styles.setAlarmButton, (!selectedCurrencyFrom || !selectedCurrencyTo || !alarmPrice) && styles.disabledButton]}
          onPress={handleSetAlarm}
          disabled={!selectedCurrencyFrom || !selectedCurrencyTo || !alarmPrice}
        >
          <Text style={styles.setAlarmButtonText}>Alarmı Kur</Text>
        </TouchableOpacity>

        <Modal visible={modalVisible} transparent={true} animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Tüm alanları doldurun</Text>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Tamam</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Lorem FX</Text>
      </View>
    </View>
  );
};

export default CurrencyAlarmScreen;