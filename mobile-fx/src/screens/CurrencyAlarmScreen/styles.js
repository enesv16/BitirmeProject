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
        justifyContent: 'center',
        height: 60,
        paddingHorizontal: 10,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#034F84',
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
    contentContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    currencyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    pickerContainer: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#034F84',
        borderRadius: 5,
        marginHorizontal: 10,
        backgroundColor: '#FFFFFF',
    },
    currencyPicker: {
        height: 40,
        paddingHorizontal: 10,
    },
    reverseButton: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
        backgroundColor: '#034F84',
        elevation: 3,
    },
    alarmContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    alarmLabel: {
        fontSize: 16,
        color: '#034F84',
    },
    alarmInput: {
        width: '60%',
        height: 40,
        borderWidth: 1,
        borderColor: '#034F84',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginTop: 10,
        backgroundColor: '#FFFFFF',
    },
    setAlarmButton: {
        width: '60%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#034F84',
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    disabledButton: {
        backgroundColor: '#B0B0B0',
    },
    setAlarmButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footer: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footerText: {
        fontSize: 12,
        color: '#034F84',
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
    modalText: {
        fontSize: 16,
        color: '#000000',
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: '#034F84',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    modalButtonText: {
        fontSize: 16,
        color: '#FFFFFF',
    },
});