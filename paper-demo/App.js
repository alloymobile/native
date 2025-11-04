// App.js — React Native Paper quick-start (Expo-ready)
// ---------------------------------------------------
// Demonstrates:
// - MD3 theming with Provider
// - Appbar/Header
// - TextInput (outlined), Password field with visibility toggle
// - Helper text, validation
// - Switch, Checkbox, RadioButton.Group
// - Button (contained/outlined), IconButton
// - Menu, Snackbar, Dialog
// - Card + List for layout patterns
//
// How to run (Expo):
//   1) npx create-expo-app paper-demo
//   2) cd paper-demo
//   3) npm i react-native-paper
//      (Expo already includes react-native-safe-area-context & vector icons)
//   4) Replace App.js with this file
//   5) npx expo start

import * as React from "react";
import { SafeAreaView, View, ScrollView } from "react-native";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
  Appbar,
  Text,
  TextInput,
  HelperText,
  Button,
  IconButton,
  Switch,
  Checkbox,
  RadioButton,
  Menu,
  Snackbar,
  Dialog,
  Portal,
  Card,
  List,
} from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#2563EB", // Indigo-600
    secondary: "#10B981", // Emerald-500
  },
  roundness: 10,
};

export default function App() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPw, setShowPw] = React.useState(false);
  const [wantsEmails, setWantsEmails] = React.useState(true);
  const [agree, setAgree] = React.useState(false);
  const [role, setRole] = React.useState("student");
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [snack, setSnack] = React.useState({ visible: false, msg: "" });
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const emailError = email.length > 0 && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);

  const onSubmit = () => {
    setSnack({ visible: true, msg: `Saved for ${name || "(no name)"}` });
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={{ flex: 1 }}>
        <Appbar.Header>
          <Appbar.Content title="React Native Paper" subtitle="Inputs & Layout" />
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={<Appbar.Action icon="dots-vertical" onPress={() => setMenuVisible(true)} />}
          >
            <Menu.Item onPress={() => setSnack({ visible: true, msg: "Menu → Refresh" })} title="Refresh" leadingIcon="refresh" />
            <Menu.Item onPress={() => setDialogOpen(true)} title="About" leadingIcon="information-outline" />
          </Menu>
        </Appbar.Header>

        <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
          {/* Card with form */}
          <Card>
            <Card.Title title="Profile" subtitle="MD3 outlined inputs" left={(props) => <List.Icon {...props} icon="account" />} />
            <Card.Content>
              <TextInput
                mode="outlined"
                label="Full name"
                placeholder="Jane Doe"
                value={name}
                onChangeText={setName}
                style={{ marginBottom: 12 }}
              />

              <TextInput
                mode="outlined"
                label="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                error={emailError}
              />
              <HelperText type={emailError ? "error" : "info"} visible>
                {emailError ? "Please enter a valid email" : "We’ll never share your email."}
              </HelperText>

              <TextInput
                mode="outlined"
                label="Password"
                placeholder="••••••••"
                secureTextEntry={!showPw}
                value={password}
                onChangeText={setPassword}
                right={<TextInput.Icon icon={showPw ? "eye-off" : "eye"} onPress={() => setShowPw((v) => !v)} />}
              />

              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
                <Text variant="labelLarge">Email me updates</Text>
                <Switch value={wantsEmails} onValueChange={setWantsEmails} />
              </View>

              <View style={{ marginTop: 16 }}>
                <Text variant="labelLarge" style={{ marginBottom: 6 }}>Role (Radio group)</Text>
                <RadioButton.Group onValueChange={setRole} value={role}>
                  <RadioRow label="Student" value="student" />
                  <RadioRow label="Instructor" value="instructor" />
                  <RadioRow label="Admin" value="admin" />
                </RadioButton.Group>
              </View>

              <Checkbox.Item
                status={agree ? "checked" : "unchecked"}
                onPress={() => setAgree((v) => !v)}
                label="I agree to the Terms of Service"
                position="leading"
                style={{ marginTop: 8 }}
              />

              <View style={{ flexDirection: "row", gap: 12, marginTop: 12 }}>
                <Button mode="contained" onPress={onSubmit} icon="content-save">
                  Save
                </Button>
                <Button mode="outlined" icon="close" onPress={() => {
                  setName("");
                  setEmail("");
                  setPassword("");
                  setWantsEmails(true);
                  setAgree(false);
                  setRole("student");
                }}>
                  Clear
                </Button>
                <IconButton mode="contained" icon="information" onPress={() => setDialogOpen(true)} />
              </View>
            </Card.Content>
          </Card>

          {/* Layout: List + Info card */}
          <Card>
            <Card.Title title="Shortcuts" subtitle="Common actions" left={(props) => <List.Icon {...props} icon="flash" />} />
            <Card.Content>
              <List.Section>
                <List.Item title="Open menu" left={(props) => <List.Icon {...props} icon="dots-vertical" />} onPress={() => setMenuVisible(true)} />
                <List.Item title="Show snackbar" left={(props) => <List.Icon {...props} icon="message-text" />} onPress={() => setSnack({ visible: true, msg: "Hello from Snackbar!" })} />
                <List.Item title="Show dialog" left={(props) => <List.Icon {...props} icon="forum" />} onPress={() => setDialogOpen(true)} />
              </List.Section>
            </Card.Content>
          </Card>
        </ScrollView>

        {/* Snackbar + Dialog live at root via Portal */}
        <Portal>
          <Snackbar
            visible={snack.visible}
            onDismiss={() => setSnack({ visible: false, msg: "" })}
            duration={2000}
            action={{ label: "OK", onPress: () => {} }}
          >
            {snack.msg}
          </Snackbar>

          <Dialog visible={dialogOpen} onDismiss={() => setDialogOpen(false)}>
            <Dialog.Icon icon="react" />
            <Dialog.Title>React Native Paper</Dialog.Title>
            <Dialog.Content>
              <Text>
                This screen shows MD3 components (TextInput, Button, Switch, Checkbox, Radio, Menu, Snackbar, Dialog) and basic layout with Card & List.
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setDialogOpen(false)}>Close</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </SafeAreaView>
    </PaperProvider>
  );
}

function RadioRow({ label, value }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 4 }}>
      <RadioButton value={value} />
      <Text>{label}</Text>
    </View>
  );
}
