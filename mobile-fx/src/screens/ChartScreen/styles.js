import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#001f3f",
    },
    titleText: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 20,
        color: "#FFFFFF",
    },
    pairText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginBottom: 10,
    },
    backButton: {
        position: "absolute",
        top: 20,
        left: 20,
        color: "#FFFFFF",
    },
    chartContainer: {
        alignItems: "center",
    },
    percentageText: {
        fontSize: 20,
        marginBottom: 20,
    },
    bottomContainer: {
        marginTop: 30,
        paddingHorizontal: 20,
        backgroundColor: "#0074D9",
        borderRadius: 10,
        paddingVertical: 20,
    },
    bottomTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        color: '#FFFFFF',
    },
    bottomText: {
        fontSize: 16,
        color: '#FFFFFF',
    },
});