import { useState } from "react";
import { Text } from "react-native";
import { TextInput } from "react-native";
import { View } from "react-native";

export default function Input() {
    const [name, setName] = useState("");
  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Type your name"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, padding: 8 }}
      />
      <Text>Hello {name || "…"}</Text>
    </View>
  );
}