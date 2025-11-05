import * as React from "react";
import { View } from "react-native";
import {
  PaperProvider,
  MD3LightTheme as lightTheme,
  MD3DarkTheme as darkTheme,
  Appbar,
  Card,
  TextInput,
  Button,
  HelperText,
  Snackbar,
  Switch,
} from "react-native-paper";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [snack, setSnack] = React.useState("");
  const [dark, setDark] = React.useState(false);

  const theme = dark ? darkTheme : lightTheme;
  const emailError = !!email && !/^[^@]+@[^@]+\.[^@]+$/.test(email);
  const pwdError = !!password && password.length < 6;

  return (
    <PaperProvider theme={theme}>
      <Appbar.Header>
        <Appbar.Content title="Paper Login" />
        <Switch value={dark} onValueChange={setDark} />
      </Appbar.Header>
      <View style={{ padding: 16 }}>
        <Card mode="elevated">
          <Card.Title title="Welcome" subtitle="Sign in to continue" />
          <Card.Content>
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              style={{ marginBottom: 8 }}
            />
            <HelperText type="error" visible={emailError}>
              Invalid email format
            </HelperText>
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={{ marginBottom: 8 }}
            />
            <HelperText type="error" visible={pwdError}>
              Minimum 6 characters
            </HelperText>
            <Button
              mode="contained"
              onPress={() => setSnack("Logged in!")}
              disabled={emailError || pwdError || !email || !password}
            >
              Login
            </Button>
          </Card.Content>
        </Card>
      </View>
      <Snackbar
        visible={!!snack}
        onDismiss={() => setSnack("")}
        duration={1500}
      >
        {snack}
      </Snackbar>
    </PaperProvider>
  );
}
