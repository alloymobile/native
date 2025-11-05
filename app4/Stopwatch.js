import * as React from "react";
import { View } from "react-native";
import {
  PaperProvider,
  Appbar,
  FAB,
  ProgressBar,
  Portal,
  Modal,
  Text,
} from "react-native-paper";

export default function Stopwatch() {
  const [ms, setMs] = React.useState(0);
  const [running, setRunning] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setMs((t) => t + 100), 100);
    return () => clearInterval(id);
  }, [running]);

  const seconds = (ms / 1000).toFixed(1);
  const pct = Math.min((ms % 10000) / 10000, 1);

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Content title="Stopwatch Mini" />
      </Appbar.Header>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Text variant="displaySmall">{seconds}s</Text>
        <ProgressBar progress={pct} style={{ width: "80%" }} />
      </View>
      <Portal>
        <Modal
          visible={open}
          onDismiss={() => setOpen(false)}
          contentContainerStyle={{
            backgroundColor: "white",
            padding: 16,
            margin: 16,
            borderRadius: 12,
          }}
        >
          <Text variant="titleMedium">Lap / Reset</Text>
          <Text>
            Use primary FAB to start/stop; secondary to open this sheet.
          </Text>
        </Modal>
      </Portal>
      <FAB
        icon={running ? "pause" : "play"}
        style={{ position: "absolute", bottom: 16, right: 16 }}
        onPress={() => setRunning((v) => !v)}
      />
      <FAB
        small
        icon="dots-horizontal"
        style={{ position: "absolute", bottom: 16, right: 90 }}
        onPress={() => setOpen(true)}
      />
    </PaperProvider>
  );
}
