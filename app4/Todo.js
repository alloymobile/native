import * as React from "react";
import { View, FlatList } from "react-native";
import {
  PaperProvider,
  Appbar,
  List,
  Checkbox,
  FAB,
  Portal,
  Dialog,
  Button,
  TextInput,
} from "react-native-paper";

export default function Todo() {
  const [items, setItems] = React.useState([
    { id: "1", title: "Learn Paper", done: false },
  ]);
  const [visible, setVisible] = React.useState(false);
  const [text, setText] = React.useState("");

  const toggle = (id) =>
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, done: !it.done } : it))
    );
  const add = () => {
    if (text.trim()) {
      setItems((prev) => [
        { id: String(Date.now()), title: text.trim(), done: false },
        ...prev,
      ]);
      setText("");
      setVisible(false);
    }
  };

  const renderItem = ({ item }) => (
    <List.Item
      title={item.title}
      left={() => (
        <Checkbox
          status={item.done ? "checked" : "unchecked"}
          onPress={() => toggle(item.id)}
        />
      )}
      right={() => (
        <List.Icon icon={item.done ? "check-circle" : "circle-outline"} />
      )}
      onPress={() => toggle(item.id)}
    />
  );

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Content title="Mini To‑Do" />
      </Appbar.Header>
      <View style={{ flex: 1 }}>
        <FlatList
          data={items}
          keyExtractor={(i) => i.id}
          renderItem={renderItem}
        />
        <Portal>
          <Dialog visible={visible} onDismiss={() => setVisible(false)}>
            <Dialog.Title>New Task</Dialog.Title>
            <Dialog.Content>
              <TextInput
                label="Task title"
                value={text}
                onChangeText={setText}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setVisible(false)}>Cancel</Button>
              <Button onPress={add}>Add</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <FAB
          icon="plus"
          style={{ position: "absolute", right: 16, bottom: 16 }}
          onPress={() => setVisible(true)}
        />
      </View>
    </PaperProvider>
  );
}
