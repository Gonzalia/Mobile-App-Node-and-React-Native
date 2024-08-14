import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { deleteNote } from "../Services/NotesServices";

interface RenderNoteProps {
  title: string,
  description: string,
  id: any,
  setLoading: any
}

const RenderNote = ({ title, id, description, setLoading }: RenderNoteProps) => {

  const handleDeleteNote = async () => {
    setLoading(true)
    try {
      await deleteNote(id)
    } catch (error) {
      console.error("Error deleting note: ", error);
    } finally {
      setLoading(false)
    }
  }
  return (
    <View style={styles.noteBox}>
      <Text style={styles.titleNote}>
        {title}
      </Text>
      <Text style={styles.descriptionNote}>
        {description}
      </Text>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteNote}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  noteBox: {
    backgroundColor: "#dfe295",
    marginBottom: 12,
    borderRadius: 8,
    width: "90%",
    alignSelf: "center"
  },
  titleNote: {
    fontSize: 26,
    alignSelf: "center",
    marginHorizontal: 12
  },
  descriptionNote: {
    fontSize: 18,
    marginLeft: 4,
    marginTop: 12
  },
  deleteButton: {
    backgroundColor: "#cb4747",
    padding: 4,
    borderRadius: 4,
    width: "100%",
    marginTop: 12
  },
  deleteButtonText: {
    color: "#fff",
    alignSelf: "center",
    paddingVertical: 8
  }
})

export default RenderNote;