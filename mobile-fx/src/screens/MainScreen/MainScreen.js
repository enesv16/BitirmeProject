import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, PanResponder, Animated, Modal } from 'react-native';
import {styles} from './styles';
import Logo from '../../../assets/images/loremnew.png';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useNavigation } from '@react-navigation/native';
import { CurrencyPairContext } from '../../contexts/CurrencyContext/CurrencyPairProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import currencyAPI from '../../../config/currencyAPI';
import mockAPI from '../../../config/mockAPI';
import { currencyIcons } from '../../../config/icons';
import axios from 'axios';

const MainScreen = () => {
    const navigation = useNavigation();
    const { currencyPairs, setCurrencyPairs } = useContext(CurrencyPairContext);
    // State'ler
    // const [currencyPairs, setCurrencyPairs] = useState([]); // Döviz çiftleri
    const position = useRef(currencyPairs.map(() => new Animated.ValueXY())).current; // Sürükleme pozisyonları
    const [showNotifications, setShowNotifications] = useState(false); // Bildirimlerin görünürlüğü
    const [notifications, setNotifications] = useState([]); // Bildirimler
    const intervalIds = useRef([]);


    // Fonksiyon: Grafik ekranına gitme işlemi
    const handleChartPress = (pair) => {
        navigation.navigate('ChartScreen', {
            pair: pair,
            prevPairs: currencyPairs
        });
    };

    // Fonksiyon: Alarm sayfasına gitme işlemi
    const openAlarmPage = () => {
        navigation.navigate('CurrencyAlarmScreen');
    };

    // Fonksiyon: Öğe silme işlemi
    const handleDelete = (index) => {
        const updatedCurrencyPairs = [...currencyPairs];
        updatedCurrencyPairs.splice(index, 1);
        setCurrencyPairs(updatedCurrencyPairs);

        const updatedPosition = [...position];
        updatedPosition.splice(index, 1);
        position.current = updatedPosition;
    };

    // Fonksiyon: Dizi elemanlarını karıştırma
    const shuffleArray = (array) => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    // Fonksiyon: Bildirimleri açma işlemi
    const openNotifications = async () => {
        try {
            const response = await axios.get(`${mockAPI.baseURL}/notifications`);
            const data = response.data;
            setNotifications(data);
            setShowNotifications(true);
        } catch (error) {
            console.error('API hatası: ', error);
        }
    };

    // Fonksiyon: Bildirimleri kapatma işlemi
    const closeNotifications = () => {
        setShowNotifications(false);
    };

    // Fonksiyon: Bildirim öğesini render etme
    const renderNotificationItem = (item, index) => {
        return (
            <View key={index} style={styles.notificationItem}>
                <Text style={styles.notificationText}>{item.message}</Text>
                <Text style={styles.notificationDate}>{item.date}</Text>
            </View>
        );
    };

    // Fonksiyon: Döviz çiftlerini getirme
    const fetchCurrencyPairs = async () => {
        try {
          const response = await axios.get(`${currencyAPI.baseURL}/pairList`);
          const data = response.data;
          if (Array.isArray(data)) {
            const currencyPairs = data.map(pair => ({
              pair: pair.pairName.replace('.', '/'),
              value: pair.currentValue || 0,
              previousValue: 0,
              percentage: '0%',
            }));
            return currencyPairs;
          } else {
            console.error('API yanıtı bir dizi değil');
            return [];
          }
        } catch (error) {
          console.error('API hatası: ', error);
          return [];
        }
      };
      

    useEffect(() => {
        position.current = currencyPairs.map(() => new Animated.ValueXY());
    }, [currencyPairs]);

    useEffect(() => {
        const fetchData = async () => {
            const pairs = await fetchCurrencyPairs();
            const shuffledPairs = shuffleArray(pairs);
            const slicedPairs = shuffledPairs.slice(0, 8);
            setCurrencyPairs(slicedPairs);
            position.current = slicedPairs.map(() => new Animated.ValueXY());

            // her bir çift için farklı zamanlarda güncelleme yapacak olan interval'ları oluştur
            slicedPairs.forEach((pair, index) => {
                const randomTime = Math.random() * 10000 + 4000; // 1-10 saniye arasında rastgele bir zaman
                const intervalId = setInterval(() => {
                    setCurrencyPairs(prevPairs => {
                        const newValue = prevPairs[index].value + ((Math.random() - 0.5) * 0.01 * prevPairs[index].value);
                        const percentageChange = ((newValue - prevPairs[index].value) / prevPairs[index].value) * 100;
                        const updatedPair = {
                            ...prevPairs[index],
                            value: newValue,
                            previousValue: prevPairs[index].value,
                            percentage: `${percentageChange.toFixed(2)}%`,
                        };
                        return [
                            ...prevPairs.slice(0, index),
                            updatedPair,
                            ...prevPairs.slice(index + 1),
                        ];
                    });
                }, randomTime);
                intervalIds.current.push(intervalId); // unmount olduğunda temizlemek üzere id'leri sakla
            });
        };

        fetchData();

        return () => intervalIds.current.forEach(clearInterval); // Unmount olduğunda interval'ları temizle bellek dolmasın diye
    }, []);



    // Fonksiyon: Sürükleme sonunda pozisyonları güncelleme
    const handleDragEnd = (fromIndex, toIndex) => {
        // önce, sürüklenen öğe çıkarılıp ve yeniden ekleniyor
        let updatedCurrencyPairs = [...currencyPairs];
        const draggedPair = updatedCurrencyPairs.splice(fromIndex, 1)[0];
        updatedCurrencyPairs.splice(toIndex, 0, draggedPair);
        setCurrencyPairs(updatedCurrencyPairs);

        // sürüklenen öğenin konumunu çıkarıp ve yeniden ekliyoruz
        let updatedPosition = [...position];
        const draggedPosition = updatedPosition.splice(fromIndex, 1)[0];
        updatedPosition.splice(toIndex, 0, draggedPosition);
        position.current = updatedPosition;
    };

    // Fonksiyon: Döviz çiftini render etme
    const renderCurrencyPair = (pair, index) => {
        const pairParts = pair.pair.split('/');
        const pairIcons = pairParts.map(part => currencyIcons[part]);

        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (e, gestureState) => {
                if (position.current[index]) {
                    position.current[index].setOffset({ x: 0, y: gestureState.dy });
                    position.current[index].setValue({ x: 0, y: 0 });
                }
            },
            onPanResponderRelease: (e, gestureState) => {
                const droppedIndex = Math.floor((e.nativeEvent.pageY - 100) / 50);
                if (droppedIndex !== index) {
                    let adjustedIndex = droppedIndex;
                    if (adjustedIndex < 0) {
                        adjustedIndex = 0;
                    } else if (adjustedIndex >= currencyPairs.length) {
                        adjustedIndex = currencyPairs.length - 1;
                    }
                    handleDragEnd(index, adjustedIndex);
                }
                if (position.current[index]) {
                    position.current[index].flattenOffset();
                    Animated.spring(position.current[index], {
                        toValue: { x: 0, y: 0 },
                        useNativeDriver: false,
                    }).start();
                }
            },
        });

        const animatedStyle = position.current[index] ? {
            transform: position.current[index].getTranslateTransform(),
        } : {};

        const handleDeletePress = () => {
            handleDelete(index);
        };

        return (
            <Animated.View key={index} style={[styles.currencyPairContainer, animatedStyle]} {...panResponder.panHandlers}>
                {/* Sürükleme ikonu */}
                <View style={styles.dragIconContainer}>
                    <IconFontAwesome5 name="list" size={18} color="gray" />
                </View>

                {/* Döviz çifti içeriği */}
                <View style={styles.currencyPairContent}>
                    {/* İlk döviz ikonu */}
                    <Image style={styles.icon} source={pairIcons[0]} />

                    {/* Ok işareti */}
                    <IconFontAwesome5 style={styles.arrow} name="arrow-right" size={12} color="gray" />

                    {/* İkinci döviz ikonu */}
                    <Image style={styles.icon} source={pairIcons[1]} />

                    {/* Döviz çifti ve değer bilgisi */}
                    <View style={styles.pairIconContainer}>
                        <View style={styles.pairNameContainer}>
                            <Text style={styles.pairText}>{pair.pair}</Text>
                            {/* Yüzde değişimine göre ikon */}
                            <IconSimpleLineIcons name={parseFloat(pair.percentage) < 0 ? "arrow-down" : (parseFloat(pair.percentage) > 0 ? "arrow-up" : "minus")} size={20} color={parseFloat(pair.percentage) < 0 ? "red" : (parseFloat(pair.percentage) > 0 ? "green" : "gray")} />
                        </View>

                        <View style={styles.pairValue}>
                            {/* Döviz değeri */}
                            <Text style={styles.valueText}>{(pair.value || 0).toFixed(2)}</Text>

                            {/* Yüzde değişim */}
                            <Text style={[styles.percentageText, { color: (parseFloat(pair.percentage) < 0) ? 'red' : 'green' }]}>
                                {pair.percentage || ''}
                            </Text>

                        </View>

                    </View>
                </View>

                {/* İşlem düğmeleri */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => handleChartPress(pair)}>
                        <IconFontAwesome5 name="chart-line" size={20} color="green" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={openAlarmPage}>
                        <IconFontAwesome5 name="bell" size={20} color="#ffd500" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CurrencyPurchase', { pair })}>
                        <IconFontAwesome5 name="shopping-cart" size={20} color="#1a759f" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleDeletePress}>
                        <IconFontAwesome5 name="trash" size={20} color="#e5383b" />
                    </TouchableOpacity>
                </View>
            </Animated.View>
        );

    };



    return (
        <SafeAreaView style={styles.container}>
            {/* Başlık Bölümü */}
            <View style={styles.header}>
                <View style={{ flex: 1 }}></View>
                <View style={styles.logoContainer}>
                    <Image source={Logo} style={styles.logo} resizeMode="contain" />
                </View>
                <TouchableOpacity style={styles.notificationButton} onPress={openNotifications}>
                    <IconFontAwesome5 name="bell" size={22} color="#034F84" />
                </TouchableOpacity>
            </View>
            {/* Döviz Çiftleri Bölümü */}
            <View style={styles.currencyPairsContainer}>
                {currencyPairs.map((pair, index) => renderCurrencyPair(pair, index))}
            </View>

            {/* Bildirimler Modalı */}
            <Modal visible={showNotifications} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Bildirimler</Text>
                        {notifications.map((item, index) => renderNotificationItem(item, index))}
                        <TouchableOpacity style={styles.closeButton} onPress={closeNotifications}>
                            <Text style={styles.closeButtonText}>Kapat</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );

};

export default MainScreen;