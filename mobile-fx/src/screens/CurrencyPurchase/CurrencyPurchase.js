import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Modal, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { styles } from './styles';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CurrencyPairContext } from '../../contexts/CurrencyContext/CurrencyPairProvider';
import { accountsData } from './accounts';

const CurrencyPurchaseScreen = () => {
  const [accounts, setAccounts] = useState(accountsData);
  const [selectedCurrencyFrom, setSelectedCurrencyFrom] = useState('');
  const [selectedCurrencyTo, setSelectedCurrencyTo] = useState('');
  const [amountToBuy, setAmountToBuy] = useState('');
  const [amountFromBuy, setAmountFromBuy] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showInsufficientBalanceMessage, setShowInsufficientBalanceMessage] = useState(false);
  const { currencyPairs } = useContext(CurrencyPairContext);
  const [isWithdrawSuccessful, setIsWithdrawSuccessful] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState({ from: null, to: null });
  const [walletInfo, setWalletInfo] = useState([{ key: 'from', value: null }, { key: 'to', value: null }]);



  useEffect(() => {
    filterAccounts();
  }, [selectedCurrencyFrom, selectedCurrencyTo]);


  useEffect(() => {
    // Para çekme işlemi başarılı olduğunda çalışacak kod
    if (isWithdrawSuccessful) {
      setAccounts((prevAccounts) => {
        //prevAccounts hesapların en son güncellenmiş halini alan değişkendir
        return {
          ...prevAccounts,
          [selectedCurrencyTo]: {
            ...prevAccounts[selectedCurrencyTo],
            balance: prevAccounts[selectedCurrencyTo].balance + parseFloat(amountFromBuy),
          },
        };
      });
      setIsWithdrawSuccessful(false);  // işlem tamamlandığında durumu sıfırlamak için çağrılıyor
    }
  }, [isWithdrawSuccessful, accounts, selectedCurrencyTo, amountFromBuy]);

  const filterAccounts = () => {
    const filteredAccounts = Object.entries(accounts).reduce((filtered, [currency, account]) => {
      const isCurrencyMatched = currency === selectedCurrencyFrom || currency === selectedCurrencyTo;
      if (isCurrencyMatched) {
        filtered[currency] = account;
      }
      return filtered;
    }, {});
    return filteredAccounts;
  };



  // Seçilen "From" dövizini günceller ve ilgili alanları sıfırlar
  const handleCurrencyFromSelection = (currency) => {
    if (currency !== selectedCurrencyTo) {
      setSelectedCurrencyFrom(currency);
      setAmountToBuy('');
      setAmountFromBuy('');
    }
  };

  // Seçilen "To" dövizini günceller ve ilgili alanları sıfırlar
  const handleCurrencyToSelection = (currency) => {
    if (currency !== selectedCurrencyFrom) {
      setSelectedCurrencyTo(currency);
      setAmountToBuy('');
      setAmountFromBuy('');
    }
  };

  // "From" ve "To" dövizlerini yer değiştirir ve ilgili miktarları sıfırlar
  const handleReverseCurrencies = () => {
    setSelectedCurrencyFrom(selectedCurrencyTo);
    setSelectedCurrencyTo(selectedCurrencyFrom);
    setAmountToBuy(amountFromBuy);
    setAmountFromBuy(amountToBuy);
  };

  // Miktar değişikliği olduğunda ilgili döviz alanlarını günceller ve dönüşüm işlemlerini yapar
  const handleAmountChange = (amount, direction) => {
    if (direction === 'buy') {
      setAmountToBuy(amount);

      if (!amount) {
        setAmountFromBuy('');
        return;
      }

      const currencyPair = currencyPairs.find(
        (item) => item.pair === `${selectedCurrencyFrom}/${selectedCurrencyTo}`
      );

      if (currencyPair) {
        const value = currencyPair.value;
        const calculatedAmount = (parseFloat(amount) * value).toFixed(2);
        setAmountFromBuy(calculatedAmount);
      } else {
        const reverseCurrencyPair = currencyPairs.find(
          (item) => item.pair === `${selectedCurrencyTo}/${selectedCurrencyFrom}`
        );

        if (reverseCurrencyPair) {
          const value = reverseCurrencyPair.value;
          const calculatedAmount = (parseFloat(amount) / value).toFixed(2);
          setAmountFromBuy(calculatedAmount);
        } else {
          setAmountFromBuy('');
        }
      }
    } else if (direction === 'sell') {
      setAmountFromBuy(amount);

      if (!amount) {
        setAmountToBuy('');
        return;
      }

      const currencyPair = currencyPairs.find(
        (item) => item.pair === `${selectedCurrencyTo}/${selectedCurrencyFrom}`
      );

      if (currencyPair) {
        const value = currencyPair.value;
        const calculatedAmount = (parseFloat(amount) * value).toFixed(2);
        setAmountToBuy(calculatedAmount);
      } else {
        const reverseCurrencyPair = currencyPairs.find(
          (item) => item.pair === `${selectedCurrencyFrom}/${selectedCurrencyTo}`
        );

        if (reverseCurrencyPair) {
          const value = reverseCurrencyPair.value;
          const calculatedAmount = (parseFloat(amount) / value).toFixed(2);
          setAmountToBuy(calculatedAmount);
        } else {
          setAmountToBuy('');
        }
      }
    }
  };

  // Satın alma işlemini onaylar ve bakiye kontrolü yapar
  const handlePurchaseConfirmation = () => {
    setShowConfirmationModal(false);
    if (selectedCurrencyFrom && selectedCurrencyTo && amountToBuy) {
      const amountToDeduct = parseFloat(amountToBuy);
      if (accounts[selectedCurrencyFrom].balance >= amountToDeduct) {
        setAccounts((prevAccounts) => {
          return {
            ...prevAccounts,
            [selectedCurrencyFrom]: {
              ...prevAccounts[selectedCurrencyFrom],
              balance: prevAccounts[selectedCurrencyFrom].balance - amountToDeduct,
            },
          };
        });
        setIsWithdrawSuccessful(true);
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      } else {
        setShowInsufficientBalanceMessage(true);
        setTimeout(() => {
          setShowInsufficientBalanceMessage(false);
        }, 3000);
      }
    }
  };

  // Satın alma işlemini iptal eder
  const handlePurchaseCancel = () => {
    setShowConfirmationModal(false);
  };

  // Satın alma işlemini başlatır ve gereken alanların dolu olup olmadığını kontrol eder
  const handlePurchase = () => {
    if (
      selectedCurrencyFrom !== '' &&
      selectedCurrencyTo !== '' &&
      amountToBuy !== ''
    ) {
      setShowConfirmationModal(true);
    } else {
      console.log('Lütfen Döviz ve Miktar Seçin');
    }
  };



  // Hesap seçimini gerçekleştirir ve ilgili hesap bilgilerini günceller
  const handleAccountSelection = (index, currencyType) => {
    setSelectedAccount((prevSelectedAccount) => ({
      ...prevSelectedAccount,
      [currencyType]: index,
    }));
    if (index !== null) {
      const selectedCurrency = Object.keys(accounts)[index];
      const { branch, openingDate, balance } = accounts[selectedCurrency];
      const walletInfoText = `
      Seçilen ${currencyType === 'from' ? 'From' : 'To'} Hesap:
      ${selectedCurrency}
      ${branch}
      ${openingDate}
      ${balance}
    `;
      setWalletInfo((prevWalletInfo) =>
        prevWalletInfo.map((item) =>
          item.key === currencyType ? { ...item, value: walletInfoText } : item
        )
      );
    } else {
      setWalletInfo((prevWalletInfo) =>
        prevWalletInfo.map((item) => (item.key === currencyType ? { ...item, value: null } : item))
      );
    }
  };

  return (

    <View style={styles.container}>
      <View style={styles.currencyPurchaseContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Döviz Alım Satım Sayfası</Text>
        </View>
        <View style={styles.currencyContainer}>
          <View style={styles.currencyInputPicker}>
            <TextInput
              style={styles.currencyInput}
              placeholder="Miktar Girin"
              keyboardType="numeric"
              value={amountToBuy}
              onChangeText={(amount) => handleAmountChange(amount, 'buy')}
            />
            <Picker
              style={styles.currencyPicker}
              selectedValue={selectedCurrencyFrom}
              onValueChange={handleCurrencyFromSelection}
            >
              <Picker.Item label="From" value="" style={{ textAlign: 'right' }} />
              {[...new Set(currencyPairs.map((pair) => pair.pair.split('/')[0]))]
                .filter((currency) => currency !== selectedCurrencyTo)
                .map((currency) => (
                  <Picker.Item key={currency} label={currency} value={currency} />
                ))}
              <Picker.Item key="TRY" label="TRY" value="TRY" />
            </Picker>
          </View>

          <TouchableOpacity style={styles.reverseButton} onPress={handleReverseCurrencies}>
            <Icon name="exchange" size={20} color="#034F84" />
          </TouchableOpacity>

          <View style={styles.currencyInputPicker}>
            <TextInput
              style={styles.currencyInput}
              placeholder="Miktar Girin"
              keyboardType="numeric"
              value={amountFromBuy}
              onChangeText={(amount) => handleAmountChange(amount, 'sell')}
            />

            <Picker
              style={styles.currencyPicker}
              selectedValue={selectedCurrencyTo}
              onValueChange={handleCurrencyToSelection}
            >
              <Picker.Item label="To" value="" style={{ textAlign: 'right' }} />
              {[...new Set(currencyPairs.map((pair) => pair.pair.split('/')[0]))]
                .filter((currency) => currency !== selectedCurrencyFrom)
                .map((currency) => (
                  <Picker.Item key={currency} label={currency} value={currency} />
                ))}
              <Picker.Item key="TRY" label="TRY" value="TRY" />
            </Picker>
          </View>
        </View>
      </View>

      <View style={styles.accounstAndBuyButton}>
        <KeyboardAvoidingView style={styles.walletInfoContainer} >
          {walletInfo.map((item) => (
            <View key={item.key} style={styles.walletInfoBlock}>
              <Text style={styles.walletInfoText}>{item.value}</Text>
              <TouchableOpacity
                style={styles.cancelSelectionButton}
                onPress={() => handleAccountSelection(null, item.key)}
              >
                <Icon name="times-circle" size={20} color="#FF0000" />
              </TouchableOpacity>
            </View>
          ))}
        </KeyboardAvoidingView>


        <View style={styles.titleWallets}>
          <Text>İşlem Yapılacak Cüzdanı Seçiniz</Text>
        </View>

        <View style={styles.accountContainer}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {Object.entries(accounts).map(([currency, account], index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.accountButton,
                  selectedAccount.from === index && styles.selectedAccount,
                  selectedAccount.to === index && styles.selectedAccount,
                ]}
                onPress={() => {
                  if (selectedAccount.from === index) {
                    handleAccountSelection(null, 'from');
                  } else if (selectedAccount.to === index) {
                    handleAccountSelection(null, 'to');
                  } else if (selectedAccount.from === null) {
                    handleAccountSelection(index, 'from');
                  } else if (selectedAccount.to === null) {
                    handleAccountSelection(index, 'to');
                  }
                }}
              >
                <Text style={styles.accountButtonText}>{currency}</Text>
                <Text style={styles.accountButtonText}>{account.branch}</Text>
                <Text style={styles.accountButtonText}>{account.openingDate}</Text>
                <Text style={styles.accountButtonText}>{account.balance}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <TouchableOpacity
          style={[
            styles.purchaseButton,
            selectedAccount === null ||
            selectedCurrencyFrom === '' ||
            selectedCurrencyTo === '' ||
            amountToBuy === '' && styles.disabledButton,
          ]}
          onPress={handlePurchase}
          disabled={
            selectedAccount === null ||
            selectedCurrencyFrom === '' ||
            selectedCurrencyTo === '' ||
            amountToBuy === ''
          }
        >
          <Text style={styles.purchaseButtonText}>Satın Al</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showConfirmationModal} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Satın Al</Text>
            <Text style={styles.modalText}>Onaylıyor musunuz?</Text>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={handlePurchaseConfirmation}>
                <Text style={styles.modalButtonText}>Evet</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handlePurchaseCancel}>
                <Text style={styles.modalButtonText}>Hayır</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {showSuccessMessage && (
        <View style={styles.messageContainer}>
          <Text style={styles.successMessage}>Satın alma başarılı!</Text>
        </View>
      )}

      {showInsufficientBalanceMessage && (
        <View style={styles.messageContainer}>
          <Text style={styles.errorMessage}>Yetersiz bakiye!</Text>
        </View>
      )}
    </View>
  );
};

export default CurrencyPurchaseScreen;
