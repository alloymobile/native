import * as React from "react";
import { View } from "react-native";
import {
  PaperProvider,
  Appbar,
  TextInput,
  Button,
  Chip,
  DataTable,
  Banner,
} from "react-native-paper";

export default function Expense() {
  const [rows, setRows] = React.useState([]);
  const [amount, setAmount] = React.useState("");
  const [note, setNote] = React.useState("");
  const [category, setCategory] = React.useState("Food");
  const cats = ["Food", "Travel", "Bills"];

  const add = () => {
    const val = parseFloat(amount);
    if (!isNaN(val) && val > 0) {
      setRows((r) => [
        { id: Date.now().toString(), note, category, amount: val },
        ...r,
      ]);
      setAmount("");
      setNote("");
    }
  };

  const total = rows.reduce((s, r) => s + r.amount, 0);

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Content title="Expense Mini" />
      </Appbar.Header>
      <Banner visible={true} actions={[{ label: "OK", onPress: () => {} }]}>
        Tap a chip to set category, enter amount, press Add.
      </Banner>
      <View style={{ padding: 12 }}>
        <View style={{ flexDirection: "row", gap: 8, marginBottom: 8 }}>
          {cats.map((c) => (
            <Chip
              key={c}
              selected={category === c}
              onPress={() => setCategory(c)}
            >
              {c}
            </Chip>
          ))}
        </View>
        <TextInput
          label="Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="decimal-pad"
          style={{ marginBottom: 8 }}
        />
        <TextInput
          label="Note"
          value={note}
          onChangeText={setNote}
          style={{ marginBottom: 8 }}
        />
        <Button mode="contained" onPress={add}>
          Add
        </Button>
      </View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Note</DataTable.Title>
          <DataTable.Title>Cat</DataTable.Title>
          <DataTable.Title numeric>Amt</DataTable.Title>
        </DataTable.Header>
        {rows.map((r) => (
          <DataTable.Row key={r.id}>
            <DataTable.Cell>{r.note || "-"}</DataTable.Cell>
            <DataTable.Cell>{r.category}</DataTable.Cell>
            <DataTable.Cell numeric>{r.amount.toFixed(2)}</DataTable.Cell>
          </DataTable.Row>
        ))}
        <DataTable.Row>
          <DataTable.Cell>Total</DataTable.Cell>
          <DataTable.Cell />
          <DataTable.Cell numeric>{total.toFixed(2)}</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </PaperProvider>
  );
}
