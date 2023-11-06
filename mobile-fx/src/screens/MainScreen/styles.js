import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#e7ecef',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: 10,
  },
  notificationButton: {
    marginRight: 20,
    marginBottom: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  notificationItem: {
    marginBottom: 10,
  },
  notificationText: {
    fontSize: 16,
    marginBottom: 5,
  },
  notificationDate: {
    fontSize: 12,
    color: 'gray',
  },
  closeButton: {
    backgroundColor: '#034F84',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#034F84',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginRight: 100,
  },

  valueText: {
    marginRight: 10,
  },
  logo: {
    width: 80,
    height: 80,
  },
  currencyPairsContainer: {
    flex: 1,
  },
  currencyPairContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    height: 55,
    paddingLeft: 15,
  },


  dragIconContainer: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  currencyPairContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderRightWidth: 1,
    borderColor: 'gray',
    paddingRight: 25,
  },
  pairText: {
    marginRight: 10,
    marginLeft: 10,
  },
  percentageText: {
    fontSize: 12,
    color: 'green',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingLeft: 15,
  },
  button: {
    marginLeft: 8,
  },
  pairIconContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 10,
  },
  pairNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pairValue: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
  arrow: {
    marginVertical: 2,
  },
});
