import React from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, TouchableOpacity, SafeAreaView } from 'react-native';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Logo from '../../../assets/images/loremnew.png';
import LinearGradient from 'react-native-linear-gradient';
import DividerWithDot from '../../components/Seperator/seperator';
import { useNavigation } from '@react-navigation/native';

const SignInScreen = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const onRegisterPress = () => {
    navigation.navigate('Register'); // Kayıt ekranına yönlendirir.
  };

  const onSignInPressed = () => {
    console.log('onSignInPressed');
    navigation.navigate('SignUp'); // Kullanıcı giriş yapması için giriş yapma sayfasına yönlendirir.
  };

  return (
    <SafeAreaView style={styles.page}>
      <LinearGradient colors={['#c1dfeb', '#468faf']} style={styles.background}>
        {/* Üst kısım */}
        <View style={styles.header}>
          <Image source={Logo} style={[styles.logo, { height: height * 0.25 }]} resizeMode='contain' />
          <TouchableOpacity style={styles.buttonContainer}>
            <Icon name="bell" size={30} color="white" style={styles.notificationIcon} />
          </TouchableOpacity>
        </View>

        <DividerWithDot />

        {/* Orta kısım */}
        <View style={styles.container}>
          <Text style={styles.title}>Lorem FX'e Hoş Geldiniz</Text>
          <View style={styles.gradientContainer}>
            <LinearGradient
              colors={['transparent', '#FFFFFF']}
              style={styles.gradient}
            >
              <TouchableOpacity style={styles.button} onPress={onSignInPressed}>
                <Text style={styles.buttonText}>Giriş Yap</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
          <View style={styles.containerClickRegister}>
            <Text style={styles.textClikcRegister}>Hesabınız yok mu? Kayıt olmak için</Text>
            <TouchableOpacity onPress={onRegisterPress}>
              <Text style={styles.linkClickRegister}>tıklayınız.</Text>
            </TouchableOpacity>
          </View>
        </View>

        <DividerWithDot />

        {/* Alt kısım */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Lorem FX ile İletişime Geçin</Text>
          <Text style={styles.textCopyright}>Tüm hakları saklıdır © 2023</Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

export default SignInScreen;