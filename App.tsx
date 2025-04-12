
import React, { useState } from 'react';
import { FlatList, Image, ImageStyle, Pressable, Text, TextInput, TextStyle, View, ViewStyle } from 'react-native';


//{id: "1", title: 'Todo', completed: false}

type TodoItem = {
  title: string;
  id: number;
  completed: boolean;
}

function App(): React.JSX.Element {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState<Array<TodoItem> | undefined>();             //<string[]>([]) -- stringli arrayda saqlash

  const handleAddTodo = () => {
    if (!inputValue) {  //inputValue === ' '
      return;
    }
    const newTodo = {
      completed: false,
      id: Math.floor(Math.random() * 100),
      title: inputValue,
    } as TodoItem;
    if (!todos) {
      setTodos([newTodo]);
    } else {
      setTodos([...todos, newTodo]);
    }
    // setTodos([...todos, inputValue]);
    setInputValue('');
  };

  const handleToogleTodo = (id: number) => {
    if (!todos) { return; }
    const allTodos = [...todos];
    allTodos?.forEach(item => {
      if (item.id === id) {
        item.completed = !item.completed;
      }
    });
    setTodos(allTodos);
  };

  // console.log(JSON.stringify(todos, null, 2));
  const handleDeleteTodo = (id: number) => {
    const filteredTodos = todos?.filter(item => item.id !== id);
    setTodos(filteredTodos);
  };
  return (
    <View style={$container}>
      <Image source={{ uri: 'https://i.pinimg.com/736x/1f/3f/4c/1f3f4ce973d946578567f190e2773709.jpg' }} style={$imageStyle} />  {/*require('./assets/download.png')       resizeMode="cover"*/}
      <Text style={$title}>Todo App</Text>
      <View style={$inputContainer}>
        <TextInput onChangeText={setInputValue} value={inputValue} style={$input} placeholder="Add todo" placeholderTextColor={'#817b7b'} />
        <Pressable style={$button} onPress={handleAddTodo}>
          <Text style={$buttonText}>Add</Text>
        </Pressable>
      </View>
      <FlatList
        data={todos || []}
        ListEmptyComponent={Empty}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Pressable style={$todoItem} onPress={() => handleToogleTodo(item.id)}>
            <Text style={[item.completed && $completedTTodo, $todoItemName]}>{index + 1}.{item.title}</Text>     {/*style={item.completed ? $completedTTodo : {}} */}
            <Pressable onPress={() => { handleDeleteTodo(item.id); }}>
              <Text>🗑️</Text>
            </Pressable>
          </Pressable>
        )} />
    </View>
  );
}
const Empty = () => (<Text style={$empty}>Ma'lumotlar yo`q</Text>);

{/*Platform      const isAndroid = PLatform.OS === 'android' */}
{/* const {height, width, fontscale, scale} = Dimensions.get('window') */}
const $title: TextStyle = {
  fontSize: 32,
  fontWeight: 'bold',
  marginBottom: 16,
  textAlign: 'center',
};
const $empty: TextStyle = {
  fontSize: 16,
  color: '#515050',
  textAlign: 'center',
  marginTop: 16,
};
const $imageStyle: ImageStyle = {
  width: 150,
  height: 150,
  alignSelf: 'center',
};

const $container: ViewStyle = {
  backgroundColor: 'white',
  paddingHorizontal: 16,
  paddingTop: 50,
  paddingBottom: 16,
};
const $button: ViewStyle = {
  backgroundColor: 'blue',
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'center',
  padding: 16,
};
const $buttonText: TextStyle = {
  color: 'white',
};
const $inputContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 16,
  gap: 8,
};
const $input: TextStyle = {
  color: 'black',
  fontSize: 16,
  borderWidth: 3,
  borderColor: '#c1c1c1',
  borderRadius: 8,
  flex: 1,
  paddingHorizontal: 12,
};
const $todoItem: ViewStyle = {
  backgroundColor: '#c1c1c1',
  padding: 8,
  borderRadius: 8,
  marginBottom: 8,
  flexDirection: 'row',
};
const $todoItemName: TextStyle = {
  flex: 1,
};
const $completedTTodo: TextStyle = {
  textDecorationLine: 'line-through',
};

export default App;
