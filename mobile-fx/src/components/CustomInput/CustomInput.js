import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

const CustomInput = ({ value, setValue, placeholder, secureTextEntry }) => {
  return (

    <View style ={styles.container}>
        <TextInput
         onChangeText={setValue}
         placeholder={placeholder}
         style= {styles.input}
         secureTextEntry={secureTextEntry}
         />
    </View>

   
   
  );
};

const styles = StyleSheet.create({
    container: {
        width: '60%',
        height: 38,
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 5,
        marginBottom: 16,
    },
    input: {
    },
});

export default CustomInput