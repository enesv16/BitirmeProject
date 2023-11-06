import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  header: {
    flex: 4,
    alignItems: 'center',
    padding: 20,
  },
  container: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logo: {
    width: '90%',
    maxWidth: 250,
    maxHeight: 250,
  },
  notificationIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  buttonContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'PangMenZhengDao',
    color: 'black',
    marginBottom: 30,
  },
  inputIcon: {
    marginRight: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'PangMenZhengDao',
    color: '#FFFFFF',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    height: 40,
    width: 150,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'PangMenZhengDao',
    textAlign: 'center',
    color: '#000',
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 1,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  textCopyright: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  containerClickRegister: {
    flexDirection: 'row',
    alignItems: 'center',
    fontWeight: 'bold',
    justifyContent: 'center',
    marginTop: 20,
  },
  textClikcRegister: {
    fontFamily: 'PangMenZhengDao',
    color: 'white',
  },
  linkClickRegister: {
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'PangMenZhengDao',
    marginLeft: 5,
  },
});
