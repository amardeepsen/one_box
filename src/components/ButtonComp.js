import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";

const ButtonComp = ({ title, onPress, style, textStyle, loading }) => {
  return (
    <TouchableOpacity
      style={[styles.button, style, disabled = { loading }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {loading ? <ActivityIndicator size={'large'} color={'#fff'} /> :
        <Text style={[styles.text, textStyle]}>{title}</Text>
      }
    </TouchableOpacity>
  );
};

export default ButtonComp;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4A90E2",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    alignSelf: 'center',
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  }
});
