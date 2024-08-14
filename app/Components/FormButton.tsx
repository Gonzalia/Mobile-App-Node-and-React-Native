import { StyleSheet, Text, TouchableOpacity } from "react-native"

interface FormButtonInterface {
  text: string,
  onPress: () => void
}
const FormButton = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#6193e5",
    padding: 8,
    borderRadius: 12
  },
  buttonText: {
    color: "#fff",
    alignSelf: "center",
    paddingVertical: 8
  },
})

export default FormButton;