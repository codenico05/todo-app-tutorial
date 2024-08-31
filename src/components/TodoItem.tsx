import React, {useState} from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import {Todo} from '../../App';

interface TodoItemProps {
  todo: Todo;
  handleDeleteTodo: (id: number) => void;
  handleEditTodo: (id: number, newText: string) => void;
  handleToggleComplete: (id: number) => void;
}

const TodoItem = ({
  todo,
  handleDeleteTodo,
  handleEditTodo,
  handleToggleComplete,
}: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newText, setNewText] = useState<string>(todo.text);

  const handleSaveEdit = () => {
    handleEditTodo(todo.id, newText);
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      {isEditing ? (
        <TextInput
          value={newText}
          onChangeText={setNewText}
          blurOnSubmit={true}
          autoFocus={true}
          onSubmitEditing={handleSaveEdit}
          style={styles.input}
        />
      ) : (
        <TouchableOpacity onPress={() => handleToggleComplete(todo.id)}>
          <Text
            style={todo.isCompleted ? styles.completedText : styles.todoText}>
            {todo.text}
          </Text>
        </TouchableOpacity>
      )}
      <View style={styles.buttonContainer}>
        {isEditing ? (
          <TouchableOpacity onPress={handleSaveEdit} style={styles.saveButton}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => setIsEditing(true)}
            style={styles.editButton}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => handleDeleteTodo(todo.id)}
          style={styles.deleteButton}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodoItem;

const btnStyle: StyleProp<TextStyle> = {
  paddingVertical: 5,
  paddingHorizontal: 10,
  borderRadius: 20,
  marginLeft: 10,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#FEECB3',
    ...btnStyle,
  },
  deleteButton: {
    backgroundColor: '#ED3EF7',
    ...btnStyle,
  },
  saveButton: {
    ...btnStyle,
    backgroundColor: '#4CA728',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingHorizontal: 4,
    fontSize: 16,
  },
  todoText: {
    fontSize: 16,
    color: '#212121',
  },
  completedText: {
    fontSize: 16,
    color: '#888',
    textDecorationLine: 'line-through',
  },
});
