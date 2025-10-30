import { View, FlatList, Text } from "react-native";

const DATA = [
  { id: "1", name: "Apple" },
  { id: "2", name: "Banana" },
  { id: "3", name: "Cherry" }
];

export default function Flat() {
  return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>- {item.name}</Text>}
      />
    </View>
  );
}