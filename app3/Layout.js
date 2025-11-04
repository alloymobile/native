// App.js — React Native layouts & common inputs (Expo-ready)
// ---------------------------------------------------------
// This single screen demonstrates:
// - SafeAreaView + ScrollView + KeyboardAvoidingView
// - Flexbox (row/column, space-between, wrapping)
// - Common inputs: TextInput (single/multi), Switch, custom Radio, custom Checkbox
// - Buttons: Button and TouchableOpacity
// - Dismissing the keyboard by tapping outside
// - Live preview of form state
//
// How to run (Expo):
//   1) npx create-expo-app rn-layout-demo
//   2) Replace app entry (App.js) with this file
//   3) npx expo start

import React, { useMemo, useState } from "react";
import {
  Alert,
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Lay() {
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    age: "",
    password: "",
    about: "",
    wantsEmails: true,
    favoriteOS: "ios", // radio group
    agreeToTerms: false, // checkbox
  });

  const onChange = (patch) => setValues((v) => ({ ...v, ...patch }));

  const pretty = useMemo(() => JSON.stringify(values, null, 2), [values]);

  return (
    <SafeAreaView style={styles.safe}>
      <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}> 
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.select({ ios: "padding", android: undefined })}
        >
          <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>React Native Layouts + Inputs</Text>
            <Text style={styles.subtitle}>Flexbox • Forms • State preview</Text>

            {/* FLEXBOX BASICS */}
            <Section title="Flexbox: row / column / spacing">
              <Text style={styles.hint}>Row (justifyContent: "space-between")</Text>
              <View style={[styles.row, { justifyContent: "space-between" }] }>
                <Box label="A" />
                <Box label="B" />
                <Box label="C" />
              </View>

              <Text style={styles.hint}>Column (alignItems: "stretch")</Text>
              <View style={styles.column}>
                <Box label="1" stretch />
                <Box label="2" stretch />
              </View>

              <Text style={styles.hint}>Wrap (flexWrap: "wrap")</Text>
              <View style={[styles.row, { flexWrap: "wrap" }] }>
                {Array.from({ length: 8 }).map((_, i) => (
                  <Box key={i} label={String(i + 1)} small />
                ))}
              </View>
            </Section>

            {/* FORM EXAMPLE */}
            <Section title="Common Inputs (no extra libraries)">
              <Labeled label="Full name">
                <TextInput
                  style={styles.input}
                  placeholder="Jane Doe"
                  value={values.fullName}
                  onChangeText={(t) => onChange({ fullName: t })}
                  returnKeyType="next"
                />
              </Labeled>

              <Labeled label="Email">
                <TextInput
                  style={styles.input}
                  placeholder="name@example.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={values.email}
                  onChangeText={(t) => onChange({ email: t })}
                />
              </Labeled>

              <Labeled label="Age (numeric)">
                <TextInput
                  style={styles.input}
                  placeholder="e.g., 21"
                  keyboardType="number-pad"
                  value={values.age}
                  onChangeText={(t) => onChange({ age: t })}
                />
              </Labeled>

              <Labeled label="Password">
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  secureTextEntry
                  value={values.password}
                  onChangeText={(t) => onChange({ password: t })}
                />
              </Labeled>

              <Labeled label="About you (multiline)">
                <TextInput
                  style={[styles.input, styles.textarea]}
                  placeholder="Tell us something interesting…"
                  value={values.about}
                  onChangeText={(t) => onChange({ about: t })}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </Labeled>

              <Labeled label="Email me updates (Switch)">
                <View style={styles.rowBetween}>
                  <Text style={styles.valueText}>{values.wantsEmails ? "On" : "Off"}</Text>
                  <Switch
                    value={values.wantsEmails}
                    onValueChange={(v) => onChange({ wantsEmails: v })}
                  />
                </View>
              </Labeled>

              <Labeled label="Favorite OS (custom RadioGroup)">
                <RadioGroup
                  value={values.favoriteOS}
                  onChange={(v) => onChange({ favoriteOS: v })}
                  options={[
                    { label: "iOS", value: "ios" },
                    { label: "Android", value: "android" },
                    { label: "Web", value: "web" },
                  ]}
                />
              </Labeled>

              <Labeled label="Agree to Terms (custom Checkbox)">
                <Checkbox
                  checked={values.agreeToTerms}
                  onChange={(c) => onChange({ agreeToTerms: c })}
                  label="I agree to the Terms of Service"
                />
              </Labeled>

              <View style={styles.rowBetween}>
                <Button title="Submit" onPress={() => Alert.alert("Submitted", pretty)} />
                <TouchableOpacity
                  style={styles.ghostBtn}
                  onPress={() => setValues({
                    fullName: "",
                    email: "",
                    age: "",
                    password: "",
                    about: "",
                    wantsEmails: true,
                    favoriteOS: "ios",
                    agreeToTerms: false,
                  })}
                >
                  <Text style={styles.ghostBtnText}>Clear</Text>
                </TouchableOpacity>
              </View>
            </Section>

            {/* STATE PREVIEW */}
            <Section title="Live State Preview">
              <View style={styles.previewBox}>
                <Text style={styles.previewText}>{pretty}</Text>
              </View>
            </Section>

            {/* FOOTER TIP */}
            <Text style={styles.footer}>Tip: Tap anywhere outside inputs to dismiss the keyboard.</Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </Pressable>
    </SafeAreaView>
  );
}

// ————————————————————————————————————————————————
// Small presentational helpers
function Section({ title, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function Box({ label, small, stretch }) {
  return (
    <View
      style={[
        styles.box,
        small && { width: 70, height: 40 },
        stretch && { alignSelf: "stretch" },
      ]}
    >
      <Text style={styles.boxText}>{label}</Text>
    </View>
  );
}

function Labeled({ label, children }) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  );
}

function RadioGroup({ value, onChange, options }) {
  return (
    <View style={{ gap: 8 }}>
      {options.map((opt) => (
        <Pressable
          key={opt.value}
          onPress={() => onChange(opt.value)}
          style={[styles.radioRow, value === opt.value && styles.radioRowActive]}
        >
          <View style={[styles.radioOuter, value === opt.value && styles.radioOuterActive]}>
            {value === opt.value && <View style={styles.radioInner} />}
          </View>
          <Text style={styles.radioLabel}>{opt.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

function Checkbox({ checked, onChange, label }) {
  return (
    <Pressable onPress={() => onChange(!checked)} style={styles.checkboxRow}>
      <View style={[styles.checkboxBox, checked && styles.checkboxBoxChecked]}>
        {checked && <Text style={styles.checkboxTick}>✓</Text>}
      </View>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </Pressable>
  );
}

// ————————————————————————————————————————————————
// Styles
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0b1220" },
  container: {
    padding: 16,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#e5e7eb",
  },
  subtitle: {
    color: "#93c5fd",
    marginTop: 2,
    marginBottom: 8,
  },
  section: {
    backgroundColor: "#111827",
    borderRadius: 12,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  sectionTitle: {
    color: "#f3f4f6",
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 4,
  },
  hint: { color: "#9ca3af", marginBottom: 6 },
  row: { flexDirection: "row", gap: 8 },
  rowBetween: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  column: { flexDirection: "column", gap: 8 },
  box: {
    width: 90,
    height: 60,
    backgroundColor: "#1f2937",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#374151",
  },
  boxText: { color: "#d1d5db", fontWeight: "700" },
  label: { color: "#cbd5e1", marginBottom: 6 },
  input: {
    backgroundColor: "#0f172a",
    color: "#e5e7eb",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#334155",
  },
  textarea: { minHeight: 100 },
  valueText: { color: "#e5e7eb" },
  ghostBtn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#334155",
  },
  ghostBtnText: { color: "#bfdbfe", fontWeight: "600" },
  previewBox: {
    backgroundColor: "#0f172a",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#334155",
  },
  previewText: { color: "#86efac", fontFamily: Platform.select({ ios: "Menlo", android: "monospace" }) },
  footer: { textAlign: "center", color: "#9ca3af", marginBottom: 24 },

  // Radio styles
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#334155",
    backgroundColor: "#0b1220",
    gap: 10,
  },
  radioRowActive: { borderColor: "#60a5fa" },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#64748b",
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterActive: { borderColor: "#60a5fa" },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#60a5fa",
  },
  radioLabel: { color: "#e5e7eb" },

  // Checkbox styles
  checkboxRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  checkboxBox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#64748b",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0b1220",
  },
  checkboxBoxChecked: {
    borderColor: "#86efac",
    backgroundColor: "#064e3b",
  },
  checkboxTick: { color: "#86efac", fontWeight: "800" },
  checkboxLabel: { color: "#e5e7eb" },
});
