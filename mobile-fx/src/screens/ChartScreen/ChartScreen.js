import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import {styles} from './styles';
import { LineChart } from "react-native-chart-kit";
import Icon from 'react-native-vector-icons/Ionicons';

const ChartScreen = ({ route, navigation }) => {
    const [currencyPair, setCurrencyPair] = useState({
        pair: '',
        value: [],
        percentage: '',
    });

    useEffect(() => {
        let newCurrencyPair = {
            pair: '',
            value: [],
            percentage: '',
        };

        // Önceki çiftlerin değerleri kontrol ediliyor
        if (route.params.prevPairs && Array.isArray(route.params.prevPairs)) {
            route.params.prevPairs.map(pair => {
                if (pair.pair === route.params.pair.pair) {
                    newCurrencyPair = {
                        pair: pair.pair,
                        value: [pair.value, pair.previousValue],
                        percentage: pair.percentage,
                    };
                }
            });
        }

        setCurrencyPair(newCurrencyPair);
    }, []);

    // Çizgi grafiğini render eden fonksiyon
    const renderLineChart = () => {
        if (currencyPair.value.length === 0) return null;

        return (
            <LineChart
                data={{
                    labels: currencyPair.value.map((_, index) => `T${index + 1}`),
                    datasets: [
                        {
                            data: currencyPair.value,
                        },
                    ],
                }}
                width={Dimensions.get("window").width - 20}
                height={220}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1}
                chartConfig={{
                    backgroundColor: "#001f3f",
                    backgroundGradientFrom: "#001f3f",
                    backgroundGradientTo: "#0074D9",
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#FFFFFF",
                    },
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
            />
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={24} color="#7FDBFF" />
            </TouchableOpacity>
            <Text style={styles.titleText}>Currency Chart</Text>
            <View style={styles.chartContainer}>
                <Text style={styles.pairText}>{currencyPair.pair}</Text>
                <Text
                    style={[
                        styles.percentageText,
                        { color: parseFloat(currencyPair.percentage) < 0 ? "red" : "green" },
                    ]}
                >
                    {currencyPair.percentage || ''}
                </Text>
                {renderLineChart()}
            </View>
            <View style={styles.bottomContainer}>
                <Text style={styles.bottomTitle}>Instructions:</Text>
                <Text style={styles.bottomText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus feugiat sem, non semper est ullamcorper
                    vitae. Curabitur accumsan justo in ex gravida, sit amet tempor purus accumsan. In hac habitasse platea dictumst.
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default ChartScreen;
