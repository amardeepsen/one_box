import { View, TextInput, StyleSheet } from "react-native";
import React from "react";

const CustomInput = ({
  value,
  onChangeText,
  placeholder,
  secure = false,
  keyboardType = "default",
  style,
  ...rest
}) => {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secure}
      keyboardType={keyboardType}
      style={[styles.input, style]}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#d9ea67ff",
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    fontSize: 16,
  },
});

export default CustomInput;
