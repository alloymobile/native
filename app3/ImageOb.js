import { Text } from "react-native";
import { View, Image } from "react-native";

export default function ImageOb() {
  return (
    <View style={{ padding: 20 }}>
      <Image
        source={{ uri: "https://picsum.photos/200" }}
        style={{ width: 120, height: 120, borderRadius: 8 }}
      />
      <Text>Mountain</Text>
    </View>
  );
}