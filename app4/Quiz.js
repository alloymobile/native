import * as React from "react";
import { View } from "react-native";
import {
  PaperProvider,
  Appbar,
  Card,
  Text,
  RadioButton,
  Button,
  ProgressBar,
  Avatar,
} from "react-native-paper";

const QUESTIONS = [
  {
    q: "React Native Paper is built on which design language?",
    a: "MD",
    choices: ["Cupertino", "Bootstrap", "MD", "Fluent"],
  },
  {
    q: "Which component shows temporary messages?",
    a: "Snackbar",
    choices: ["Dialog", "Snackbar", "Banner", "HelperText"],
  },
  {
    q: "What does FAB stand for?",
    a: "Floating Action Button",
    choices: [
      "Fast Action Button",
      "Floating Action Button",
      "Form Action Button",
      "Fancy Action Button",
    ],
  },
];

export default function Quiz() {
  const [i, setI] = React.useState(0);
  const [sel, setSel] = React.useState("");
  const [score, setScore] = React.useState(0);

  const cur = QUESTIONS[i];
  const submit = () => {
    if (!sel) return;
    if (sel === cur.a) setScore((s) => s + 1);
    setSel("");
    setI((idx) => Math.min(idx + 1, QUESTIONS.length));
  };

  const done = i >= QUESTIONS.length;
  const progress = i / QUESTIONS.length;

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Content title="Quiz Mini" />
      </Appbar.Header>
      <ProgressBar progress={progress} style={{ height: 6 }} />
      <View style={{ padding: 16 }}>
        {1 ? (
          <Card>
            <Card.Title
              title="Done!"
              left={(p) => <Avatar.Icon {...p} icon="check" />}
            />
            <Card.Content>
              <Text variant="titleLarge">
                Score: {score} / {QUESTIONS.length}
              </Text>
            </Card.Content>
          </Card>
        ) : (
          <Card>
            <Card.Title
              title={`Q${i + 1}`}
              subtitle={cur.q}
              left={(p) => <Avatar.Icon {...p} icon="help-circle" />}
            />
            <Card.Content>
              <RadioButton.Group onValueChange={setSel} value={sel}>
                {cur.choices.map((c) => (
                  <RadioButton.Item key={c} label={c} value={c} />
                ))}
              </RadioButton.Group>
              <Button
                mode="contained"
                onPress={submit}
                style={{ marginTop: 8 }}
                disabled={!sel}
              >
                Next
              </Button>
            </Card.Content>
          </Card>
        )}
      </View>
    </PaperProvider>
  );
}
