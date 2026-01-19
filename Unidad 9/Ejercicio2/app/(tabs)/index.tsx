import * as signalR from '@microsoft/signalr';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Message {
  user: string;
  message: string;
}

export default function ChatScreen() {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    // 1. Configurar la conexión
    // ⚠️ CAMBIA ESTA URL por la de tu App Service en Azure
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://chatjuanluis-cufffvb7e6c4fsbg.spaincentral-01.azurewebsites.net")
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      // 2. Iniciar la conexión
      connection.start()
        .then(() => {
          console.log('✅ Conectado a SignalR en Azure');

          // 3. Escuchar el evento 'ReceiveMessage'
          connection.on("ReceiveMessage", (user: string, message: string) => {
            setMessages(prevMessages => [...prevMessages, { user, message }]);
          });
        })
        .catch(e => console.log('❌ Error de conexión: ', e));
    }

    // Cleanup al desmontar el componente
    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, [connection]);

  const sendMessage = async () => {
    if (connection && connection.state === signalR.HubConnectionState.Connected) {
      try {
        // 4. Llamar al método del Hub 'SendMessage'
        await connection.invoke("SendMessage", userInput, messageInput);
        setMessageInput('');
      } catch (e) {
        console.error(e);
      }
    } else {
      alert("No hay conexión con el servidor.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>💬 Chat SignalR</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Usuario"
          value={userInput}
          onChangeText={setUserInput}
          style={styles.input}
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="Mensaje"
          value={messageInput}
          onChangeText={setMessageInput}
          style={styles.input}
          placeholderTextColor="#999"
          onSubmitEditing={sendMessage}
          returnKeyType="send"
        />
        <Button title="Enviar" onPress={sendMessage} />
      </View>

      <Text style={styles.messagesHeader}>Mensajes:</Text>
      
      <FlatList
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageItem}>
            <Text style={styles.userText}>{item.user}:</Text>
            <Text style={styles.messageText}>{item.message}</Text>
          </View>
        )}
        contentContainerStyle={styles.messagesList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333'
  },
  inputContainer: { 
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  input: { 
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
    padding: 8,
    fontSize: 16,
    color: '#333'
  },
  messagesHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333'
  },
  messagesList: {
    paddingBottom: 20
  },
  messageItem: { 
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  userText: { 
    fontWeight: 'bold',
    marginRight: 5,
    color: '#007bff'
  },
  messageText: {
    flex: 1,
    color: '#333'
  }
});