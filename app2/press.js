import { Text } from "react-native";
import { Pressable } from "react-native";
import { View } from "react-native";

export default function Press() {
  return (
    <View style={{ padding: 20 }}>
      <Pressable
        onPress={() => console.log("Pressed")}
        style={({ pressed }) => ({
          backgroundColor: pressed ? "#ddd" : "#ccc",
          padding: 12,
          borderRadius: 8
        })}
      >
        <Text>Tap Here</Text>
      </Pressable>
    </View>
  );
}