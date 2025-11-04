import { View, Text, Button, Modal } from "react-native";
import { useState } from "react";

export default function MyModal() {
  const [open, setOpen] = useState(false);
  return (
    <View style={{ padding: 20 }}>
      <Button title="Open Modal" onPress={() => setOpen(true)} />
      <Modal visible={open} transparent animationType="slide">
        <View style={{ flex:1, backgroundColor:"rgba(0,0,0,0.3)", justifyContent:"center", alignItems:"center" }}>
          <View style={{ backgroundColor:"#fff", padding:20, borderRadius:8, width:250 }}>
            <Text>Hi from Modal!</Text>
            <Button title="Close" onPress={() => setOpen(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}
