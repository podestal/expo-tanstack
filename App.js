import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import TodosList from './components/TodosList';

const client = new QueryClient()


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
