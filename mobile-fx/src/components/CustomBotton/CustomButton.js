import { View, Text, StyleSheet, Pressable} from 'react-native'
import React from 'react'

const CustomButton = ({onPress, text}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',

        width: '39%',
        height: 45,
        padding: 15,
        marginVertical: 5,

        alignItems: 'center',
        borderRadius: 50,
    },
    text: {
        fontWeight:'bold',
        color:'black',
        fontFamily: 'PangMenZhengDao',
        fontStyle: 'normal',
        fontSize:12,
    }
});

export default CustomButton