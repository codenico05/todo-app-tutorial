import React, {useState} from 'react';
import {
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import TodoItem from './src/components/TodoItem';

export type Todo = {
  id: number;
  text: string;
  isCompleted: boolean;
};

const App = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddTodo = () => {
    // adding a new todo
    if (inputValue.trim()) {
      setTodos(prevTodos => [
        ...prevTodos,
        {id: Math.random() * 1000, text: inputValue.trim(), isCompleted: false},
      ]);
      setInputValue('');
    }
  };

  const handleDeleteTodo = (id: number) => {
    // delete Todo
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const handleEditTodo = (id: number, newText: string) => {
    // edit Todo
    setTodos(prevTodos =>
      prevTodos.map(todo => (todo.id === id ? {...todo, text: newText} : todo)),
    );
  };

  const handleToggleComplete = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo,
      ),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Todo App</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter todo..."
          value={inputValue}
          onChangeText={setInputValue}
        />
        <TouchableOpacity onPress={handleAddTodo} style={styles.addButton}>
          <Text style={styles.addButtonText}>Create</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        keyExtractor={todo => todo.id.toString()}
        renderItem={({item}) => (
          <TodoItem
            todo={item}
            handleDeleteTodo={handleDeleteTodo}
            handleEditTodo={handleEditTodo}
            handleToggleComplete={handleToggleComplete}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#414141',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    fontSize: 16,
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
  addButton: {
    backgroundColor: '#BF2EF0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
});
