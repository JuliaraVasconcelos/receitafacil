import { View, Text, StyleSheet } from "react-native";
export function Instructions({data, index}) {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>{index+1}- {data.text}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        marginBottom: 4,
        flexDirection: 'row',
        justifyContent: "space-between",
        padding: 12,
        borderRadius: 6
    },
    name: {
        fontSize: 16,
        lineHeight: 20
    }
})