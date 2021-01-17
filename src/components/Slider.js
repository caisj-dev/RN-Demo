import React from "react";
import {
  TextInput,
  Animated,
  Dimensions,
  StyleSheet,
  View,
  Text,
} from "react-native";
const { width } = Dimensions.get("window");

const minAge = 18;
const yearRange = 100;
const segmentWidth = 2;
const segmentSpacing = 10;
const snapSegment = segmentWidth + segmentSpacing;
const spacerWidth = (width - segmentWidth) / 2;
const rulerWidth = spacerWidth * 2 + (yearRange - 1) * snapSegment;
const indicatorWidth = 130;
const ageRange = new Array(yearRange)
  .fill(null)
  .map((item, idx) => idx + minAge);

const Ruler = () => {
  return (
    <View style={styles.ruler}>
      <View style={styles.spacer} />
      <View
        style={{
          flex: 1,
          flexDirection: "row",
        }}
      >
        {ageRange.map((i) => {
          const isEightEnd = (i + 2) % 10 === 0;
          return (
            <View
              key={i}
              style={{
                flex: 1,
                flexDirection: "column",
              }}
            >
              <View
                style={[
                  styles.segment,
                  {
                    backgroundColor: "#999",
                    height: isEightEnd ? 10 : 7,
                    marginRight: i === ageRange.length - 1 ? 0 : segmentSpacing,
                    marginBottom: isEightEnd ? 0 : 3,
                  },
                ]}
              />
              <View
                style={{
                  borderBottomWidth: 2,
                  borderBottomColor: "#999",
                }}
              />
              <Text
                style={{
                  position: "relative",
                  left: -6,
                  width: 30,
                }}
              >
                {isEightEnd && i}
              </Text>
            </View>
          );
        })}
      </View>
      <View style={styles.spacer} />
    </View>
  );
};

const Slider = () => {
  const scrollViewRef = React.useRef();
  const textInputRef = React.useRef();

  const [scrollX] = React.useState(new Animated.Value(0));
  const [initialAge] = React.useState(34);

  React.useEffect(() => {
    if (scrollViewRef && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: (initialAge - minAge) * snapSegment,
        y: 0,
        animated: true,
      });
    }
  }, []);

  React.useEffect(() => {
    scrollX.addListener(({ value }) => {
      if (textInputRef.current) {
        textInputRef.current.setNativeProps({
          text: `${Math.round(value / snapSegment) + minAge}`,
        });
      }
    });
    return () => {
      scrollX.removeListener();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.indicatorWrapper}>
        <View style={styles.arrow}></View>
        <TextInput
          ref={textInputRef}
          style={styles.ageTextStyle}
          defaultValue={minAge.toString()}
        />
        <View style={[styles.segment, styles.indicator]} />
      </View>
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        bounces={false}
        contentContainerStyle={styles.scrollViewContainerStyle}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={40}
        snapToInterval={snapSegment}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { x: scrollX },
              },
            },
          ],
          { useNativeDriver: true }
        )}
      >
        <Ruler />
      </Animated.ScrollView>
    </View>
  );
};
export default Slider;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 300,
  },
  indicatorWrapper: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    height: indicatorWidth,
    width: indicatorWidth,
    backgroundColor: "#e8f6fc",
    borderRadius: 100,
  },
  arrow: {
    position: "absolute",
    top: 85,
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderTopWidth: 60,
    borderRightWidth: 40,
    borderBottomWidth: 0,
    borderLeftWidth: 40,
    borderTopColor: "#e8f6fc",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "transparent",
  },
  indicator: {
    position: "absolute",
    top: 150,
    height: 50,
    width: 5,
    backgroundColor: "#27d2db",
  },
  scrollViewContainerStyle: {
    height: 100,
  },
  ruler: {
    width: rulerWidth,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  segment: {
    width: segmentWidth,
  },
  ageTextStyle: {
    fontSize: 42,
    fontWeight: "600",
    color: "#4d4f4e",
    // fontFamily: "Menlo",
  },
  spacer: {
    width: spacerWidth,
  },
});
