import { ScrollView, Text } from "react-native";

export default function Scroll() {
  return (
    <ScrollView style={{ padding: 20 }}>
      {[...Array(200)].map((_, i) => (
        <Text key={i}>Item {i + 1}</Text>
      ))}
    </ScrollView>
  );
}
