import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';


const client = new QueryClient()

const TodosList = () => {

  const {data: services, error, isError, isLoading} = useQuery({
    queryKey: ['todos'],
    queryFn: () => axios.get('https://share-api-ic9f.vercel.app/api/services/'),
  })

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
      {services && services.data.map( service => <Text key={service.id}>{service.platform}</Text>)}
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
});
