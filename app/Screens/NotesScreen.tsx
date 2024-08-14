import { ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import NavBar from "../Components/NavBar"
import { useEffect, useState } from "react"
import { addNote, getNotes } from "../Services/NotesServices"
import RenderNote from "../Components/RenderNote"

interface NoteType {
  title: string,
  description: string,
  _id: string
}

const NotesScreen = ({ navigation, route }) => {
  const { id, name } = route.params
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(false)
  const [showError, setShowError] = useState(false)

  const [values, setValues] = useState({
    title: "",
    description: ""
  })

  useEffect(() => {
    fetchNotes()
  }, [loading])

  const fetchNotes = async () => {
    try {
      const response = await getNotes()

      const notes = response.map(((note: NoteType) => (
        {
          title: note.title,
          description: note.description,
          id: note._id
        }
      )))
      setNotes(notes)

    } catch (error) {
      console.error("Error getting notes: ", error);
    }
  }


  const handleSaveNote = async () => {
    setLoading(true)
    try {
      let body = {
        title: `${name} says: ${values.title}`,
        description: values.description,
        date: new Date(),
        id: id
      }

      if (values.title === "" || values.description === "") {
        setShowError(true)
      } else {
        setShowError(false)
        await addNote(body)
        setValues({ title: "", description: "" })

      }

    } catch (error) {
      console.error("Error sending notes: ", error);

    } finally {
      setLoading(false)
      fetchNotes()
    }
  }


  return (
    <View style={{ flex: 1, marginTop: StatusBar.currentHeight, backgroundColor: "#181818" }}>
      <NavBar text="Add your Notes!" />
      <TouchableOpacity style={styles.logout} onPress={() => navigation.navigate("Welcome")}>
        <Text style={styles.logoutButton}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.notesForm}>
        <Text style={styles.notesFormTitle}>Add a note</Text>
        {showError && (
          <Text style={styles.messageError}>The note cannot be empty</Text>
        )}
        <View style={styles.formSection}>
          <Text style={styles.inputTitle}>Title</Text>
          <TextInput
            style={styles.input}
            value={values.title}
            onChangeText={(e) => setValues((prevValues) => ({
              ...prevValues,
              title: e
            }))}
          />
        </View>

        <View style={styles.formSection}>
          <Text style={styles.inputTitle}>Description</Text>
          <TextInput
            style={styles.input}
            value={values.description}
            onChangeText={(e) => setValues((prevValues) => ({
              ...prevValues,
              description: e
            }))}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveNote}>
          <Text style={styles.saveButtonText}>Save Note</Text>
        </TouchableOpacity>
      </View>

      {notes.length > 0 ? (
        <ScrollView style={{ marginTop: 24 }}>
          {notes.map((note, index) => {
            return (
              <RenderNote title={note.title} description={note.description} id={note.id} key={index} setLoading={setLoading} />
            )
          })}
        </ScrollView>
      ) : (
        <Text style={styles.emptyNotesText}>No notes yet</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  logout: {
    backgroundColor: "#f74a4a",
    marginHorizontal: 24,
    marginTop: 26,
    padding: 12,
    borderRadius: 8
  },
  logoutButton: {
    alignSelf: "center",
    color: "#fff",
    fontSize: 26
  },
  notesForm: {
    backgroundColor: "#404040",
    marginTop: 16,
    marginHorizontal: 24,
    borderRadius: 12,
    padding: 24
  },
  notesFormTitle: {
    color: "#fff",
    alignSelf: "center",
    fontSize: 26,
    marginTop: 8
  },
  formSection: {
    marginBottom: 16
  },
  inputTitle: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 16

  },
  input: {
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    marginHorizontal: 8,
    fontSize: 12,
    color: "#fff"
  },
  saveButton: {
    backgroundColor: "#6193e5",
    padding: 16,
    borderRadius: 12,
    width: "50%"
  },
  saveButtonText: {
    alignSelf: "center",
    color: "#fff",
    fontWeight: "700"
  },
  emptyNotesText: {
    color: "#fff",
    alignSelf: "center",
    marginTop: 16,
    fontSize: 24
  },
  messageError: {
    color: "#ff0000",
    alignSelf: "center"
  },

})


export default NotesScreen