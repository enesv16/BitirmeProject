import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import { styles } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Logo from '../../../assets/images/loremnew.png';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomBotton/CustomButton';
import mockAPI from '../../../config/mockAPI';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const onRegisterPress = () => {
    navigation.navigate('Register');
  };
  const onSignInPressed = async () => {
    try {
      let response = await fetch(`${mockAPI.baseURL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      navigation.navigate('BottomTabNavigator');
      
    } catch (error) {
      console.error('Error:', error);
      alert('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  }
  

  return (
    <SafeAreaView style={styles.page}>
      <LinearGradient colors={['#c1dfeb', '#468faf']} style={styles.background}>
        {/* Header */}
        <View style={styles.header}>
          <Image source={Logo} style={[styles.logo, { height: height * 0.20 }]} resizeMode='contain' />
          <TouchableOpacity style={styles.buttonContainer}>
            <Icon name="bell" size={30} color="white" style={styles.notificationIcon} />
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View style={styles.container}>
          <Text>
            <Text style={styles.text}>
              TC Kimlik No
            </Text>
          </Text>
          <CustomInput
            placeholder="TC Kimlik No"
            value={username}
            setValue={setUsername}
            icon={<Icon name="user" size={20} color="black" />}
          />
          <Text>
            <Text style={styles.text}>
              Şifre
            </Text>
          </Text>
          <CustomInput
            placeholder="Şifre"
            value={password}
            setValue={setPassword}
            secureTextEntry
            icon={<Icon name="lock" size={20} color="black" />}
          />
          <CustomButton text="Giriş Yap" onPress={onSignInPressed} />
          <View style={styles.containerClickRegister}>
            <Text style={styles.textClikcRegister}>Hesabınız yok mu? Kayıt olmak için</Text>
            <TouchableOpacity onPress={onRegisterPress}>
              <Text style={styles.linkClickRegister}>tıklayınız.</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.textCopyright}>
            Tüm hakları saklıdır © 2023
          </Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

export default SignUpScreen;