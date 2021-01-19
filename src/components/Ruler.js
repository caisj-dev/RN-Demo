import React from "react";
import { StyleSheet, View, Text } from "react-native";

function Ruler({
  segmentNum,
  rulerWidth,
  segmentWidth,
  segmentSpacing,
  spacerWidth,
  minAge,
}) {
  const ageRange = new Array(segmentNum)
    .fill(null)
    .map((item, idx) => idx + minAge);

  return (
    <View style={[{ width: rulerWidth }, styles.ruler]}>
      <View style={{ width: spacerWidth }} />
      <View style={styles.row}>
        {ageRange.map((i) => {
          const isEightEnd = (i + 2) % 10 === 0;
          return (
            <View key={i} style={styles.col}>
              <View
                style={{
                  width: segmentWidth,
                  backgroundColor: "#999",
                  height: isEightEnd ? 10 : 7,
                  marginRight: i === ageRange.length - 1 ? 0 : segmentSpacing,
                  marginBottom: isEightEnd ? 0 : 3,
                }}
              />
              <View style={styles.borderLine} />
              {isEightEnd ? <Text style={styles.num}>{i}</Text> : null}
            </View>
          );
        })}
      </View>
      <View style={{ width: spacerWidth }} />
    </View>
  );
}

const styles = StyleSheet.create({
  ruler: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  col: {
    position: "relative",
  },
  borderLine: {
    borderBottomWidth: 2,
    borderBottomColor: "#999",
  },
  num: {
    position: "absolute",
    width: 30,
    top: 20,
    left: -8,
  },
});

export default Ruler;
