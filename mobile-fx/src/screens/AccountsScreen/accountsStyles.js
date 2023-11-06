import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0',
      },
      header: {
        alignItems: 'center',
        paddingTop: 20,
      },
      title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#034F84',
      },
      separator: {
        height: 2,
        backgroundColor: '#034F84',
        width: '80%',
        alignSelf: 'center',
        marginVertical: 10,
      },
      content: {
        flex: 1,
        justifyContent: 'space-between', 
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingTop: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
      },
      accountContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        paddingHorizontal: 20,
        height: 100,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#034F84',
        backgroundColor: 'white',
      },
      accountContainerGray: {
        backgroundColor: '#F0F0F0',
      },
      accountContainerWhite: {
        backgroundColor: 'white',
      },
      accountInfo: {
        flex: 1,
      },
      currencyText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#034F84',
      },
      infoText: {
        fontSize: 16,
        color: '#333',
      },
      assetsContainer: {
        alignItems: 'flex-end',
      },
      assetsTitle: {
        fontSize: 16,
        color: '#034F84',
      },
      assetsText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#034F84',
      },
      footer: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        padding: 10,
        paddingLeft: 50,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
      },
      createButton: {
        backgroundColor: '#0373b3',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
      },
      createButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
    });