import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const normalise = (value, min, max) =>
  ((value - min) * 100) / (max - min) + "%";

const State = ({ value, max }) => <Text>{value + "/" + max}</Text>;

function ProgressBar({ value, min, max }) {
  return (
    <View
      style={{
        height: 10,
        width: width * 0.5,
        borderRadius: 40,
        backgroundColor: "#f2f2f2",
      }}
    >
      <View
        style={{
          backgroundColor: "#27d2db",
          height: "100%",
          width: `${normalise(value, min, max)}`,
          borderRadius: 40,
        }}
      />
    </View>
  );
}
ProgressBar.State = State;
export default ProgressBar;
