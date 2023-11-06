import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Logo from '../../../assets/images/loremnew.png';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomBotton/CustomButton';
import LinearGradient from 'react-native-linear-gradient';
import mockAPI from '../../../config/mockAPI';

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { height } = useWindowDimensions();

  const signUp = async () => {
    try {
      let response = await fetch(`${mockAPI.baseURL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          username: username,
          password: password,
        })
      });
  
     

      console.warn('Başarılı bir şekilde kayıt olundu');
  
    } catch (error) {
      console.error('Error:', error);
      alert('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  };
  
  const onSignUpPressed = () => {
    if (password !== confirmPassword) {
      console.warn('Parolalar eşleşmiyor!');
      return;
    }
    signUp();
  };

  return (
    <SafeAreaView style={styles.page}>
      <LinearGradient colors={['#c1dfeb', '#468faf']} style={styles.background}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={Logo}
            style={[styles.logo, { height: height * 0.2 }]}
            resizeMode="contain"
          />
          <TouchableOpacity style={styles.buttonContainer}>
            <Icon name="bell" size={30} color="white" style={styles.notificationIcon} />
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View style={styles.container}>
          <Text style={styles.title}>Kayıt Ol</Text>
          <CustomInput placeholder="Ad" value={firstName} setValue={setFirstName} />
          <CustomInput placeholder="Soyad" value={lastName} setValue={setLastName} />
          <CustomInput placeholder="TC Kimlik No" value={username} setValue={setUsername} />
          <CustomInput placeholder="Şifre" value={password} setValue={setPassword} secureTextEntry />
          <CustomInput placeholder="Şifre Doğrula" value={confirmPassword} setValue={setConfirmPassword} secureTextEntry />
          <CustomButton text="Kayıt Ol" onPress={onSignUpPressed} />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.textCopyright}>Tüm hakları saklıdır © 2023</Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default RegisterScreen;