import { Text, View } from 'react-native';

export default function IndexScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Estás en la página: Home</Text>
    </View>
  );
}