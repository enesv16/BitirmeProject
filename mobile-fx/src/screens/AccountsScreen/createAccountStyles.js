import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0',
        padding: 20,
      },
      content: {
        flex: 1,
        marginTop: 40,
      },
      backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 1,
      },
      backButtonText: {
        fontSize: 16,
        color: '#034F84',
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#034F84',
      },
      form: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
      },
      input: {
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
      },
      createButton: {
        backgroundColor: '#034F84',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
      },
      createButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
    });