import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import NavBar from "../Components/NavBar";
import { useState } from "react";
import { loginUser, registerUser } from "../Services/AuthServices";
import FormButton from "../Components/FormButton";

const WelcomeScreen = ({ navigation }) => {
  const [showForm, setShowForm] = useState("Register")
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [showError, setShowError] = useState(false)


  const changeFormInputs = () => {
    const newState = showForm === "Register" ? "Log In" : "Register"
    setShowError(false)
    setShowForm(newState)
  }

  const handleUserSession = async () => {
    try {
      let body: any
      let response: any

      if (showForm === "Register") {
        body = {
          email: values.email,
          username: values.name,
          password: values.password
        }

        response = await registerUser(body)
      } else {
        body = {
          email: values.email,
          password: values.password
        }
        response = await loginUser(body)
      }
      setValues({
        name: "",
        email: "",
        password: "",
      })
      setShowError(false)
      navigation.navigate("Notes", { name: response.data.username, id: response.data.id })
    } catch (error) {
      setShowError(true)
      console.error("Error on user session: ", error);
    }
  }


  return (
    <View style={{ flex: 1, backgroundColor: "#181818", marginTop: StatusBar.currentHeight }}>
      <NavBar text="Find motivational notes" />
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to global notes</Text>
        {showError && showForm === "Log In" ? (
          <Text style={styles.messageError}>Invalid Credentials!</Text>
        ) : showError && showForm === "Register" && (
          <Text style={styles.messageError}>Username already taken!</Text>

        )}

        <View style={styles.inputBox}>
          <Text style={styles.textInput}>Email</Text>
          <TextInput
            placeholder="JohnDoe@mail.com"
            style={styles.input}
            value={values.email}
            onChangeText={(e) => setValues((prevValues) => ({
              ...prevValues,
              email: e
            }))}

          />
        </View>

        {showForm === "Register" && (
          <View style={styles.inputBox}>
            <Text style={styles.textInput}>User</Text>
            <TextInput
              placeholder="John Doe"
              style={styles.input}
              value={values.name}
              onChangeText={(e) => setValues((prevValues) => ({
                ...prevValues,
                name: e
              }))}
            />
          </View>
        )}
        <View style={styles.inputBox}>
          <Text style={styles.textInput}>Password</Text>
          <TextInput
            placeholder="******"
            style={styles.input}
            value={values.password}
            secureTextEntry={true}
            onChangeText={(e) => setValues((prevValues) => ({
              ...prevValues,
              password: e
            }))}
          />
        </View>

        <FormButton text={showForm} onPress={handleUserSession} />
      </View>
      <View style={styles.bottomBox}>
        <Text style={{ color: "#fff" }}>{showForm === "Register" ? "Do you have an account?" : "Don't have an account?"}</Text>
        <TouchableOpacity onPress={changeFormInputs}>
          <Text style={{ color: "#00f9f5" }}>{showForm === "Register" ? "Log In" : "Register"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#505050",
    alignSelf: "center",
    marginTop: 64,
    paddingVertical: 32,
    paddingHorizontal: 64,
    borderRadius: 16
  },
  title: {
    marginBottom: 16,
    color: "#ebebeb",
    fontSize: 18
  },

  inputBox: {
    marginBottom: 16
  },
  input: {
    borderRadius: 8,
    padding: 2,
    width: "100%",
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    color: "#fff"
  },
  textInput: {
    width: 72,
    color: "#fff",
    marginBottom: 4
  },
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
  bottomBox: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 16,
    gap: 2
  },
  messageError: {
    color: "#ff0000",
    alignSelf: "center",
    marginBottom: 12
  }
})

export default WelcomeScreen;