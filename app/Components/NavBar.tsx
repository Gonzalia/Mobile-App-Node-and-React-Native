import { StyleSheet, Text, View } from "react-native"

interface NavBarProps {
  text: string,
}
const NavBar = ({ text }: NavBarProps) => {
  return (
    <View style={styles.navBar}>
      <View style={styles.titleContainer}>
        <Text style={styles.navBarText}>{text}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: "#343637",
    paddingVertical: 16,
    flexDirection: "row",
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    position: "relative",
  },
  navBarText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 22
  }
})

export default NavBar;