import { View, Text, Pressable, StyleSheet, Button } from "react-native"

function PrimaryButton({ children, onPress, style }) {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.ripple}>
            <View style={[styles.container, style]}>
                <Text style={styles.buttontext}>{children}</Text>
            </View>
        </Pressable>
    )
}

export default PrimaryButton

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#c86ce4',
        borderRadius: 28,
        paddingHorizontal: 16,
        paddingVertical: 8,
        margin: 4,
    },
    buttontext: {
        color: 'white',
        textAlign: 'center'
    },
    ripple: {
        opacity: 0.75
    }
})