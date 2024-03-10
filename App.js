import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { QueryClient, QueryClientProvider, useQuery, useMutation } from '@tanstack/react-query';


const client = new QueryClient()

const TodosList = () => {

  const [title, setTitle] = useState('')

  const {data: todos, error, isError, isLoading} = useQuery({
    queryKey: ['todos'],
    queryFn: () => axios.get('http://127.0.0.1:8000/api/todos/'),
  })

  const {mutate: addTodoMutation} = useMutation({
    mutationFn: (todo) => axios.post('http://127.0.0.1:8000/api/todos/', todo),
    onSuccess: client.invalidateQueries(['todos'])
  })

  const handleAddTodo = () => {
    addTodoMutation({ title })
    setTitle('')
  }

  if (isLoading) return (
    <View style={styles.container}>
      <Text>Loading ...</Text>
    </View>
  )

  if (isError) return (
    <View style={styles.container}>
      <Text>{error.message}</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.label}>New Todo</Text>
      <TextInput 
        style={styles.input}
        value={title}
        onChangeText={value => setTitle(value)}
      />
      <Button onPress={handleAddTodo} title='Add'/>
      {todos && todos.data.map( todo => <Text key={todo.id}>{todo.title}</Text>)}
    </View>
  )
}

export default function App() {


  return (
    <QueryClientProvider client={client}>
      <StatusBar style="dark" />
      <TodosList />
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 20,

  },
  input: {
    backgroundColor: '#ecf0f1',
    width: '40%',
    marginVertical: 15,
    padding: 5,
    borderRadius: 20,
    textAlign: 'center'
  },
  button: {
    marginVertical: 30
  }
});
