import { StyleSheet } from "react-native";
import { Button } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import Press from "./press";
import Input from "./Input";
import ImageOb from "./ImageOb";
import Scroll from "./Scroll";
import Flat from "./Flat";
import MyModal from "./MyModal";


export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World</Text>
      <Text>Good</Text>
      <Button title="Click me"/>
      <Press />
      <Input />
      <ImageOb />
      <Scroll />
      <Flat />
      <MyModal />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    padding: 24,
    color: "#aaa",
    flex: 1
  },
  title:{
    fontSize: 24,
    fontWeight: "bold",
    color: "#999"
  }
})

