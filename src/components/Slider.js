import React from "react";
import {
  TextInput,
  Animated,
  Dimensions,
  StyleSheet,
  View,
} from "react-native";
import Ruler from "./Ruler";

const { width } = Dimensions.get("window");

const Slider = ({
  minAge = 18,
  segmentNum = 100,
  segmentWidth = 1,
  segmentSpacing = 10,
}) => {
  const spacerWidth = (width - segmentWidth) / 2;
  const snapSegment = segmentWidth + segmentSpacing;
  const rulerWidth = spacerWidth * 2 + (segmentNum - 1) * snapSegment;

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
        <View style={styles.indicator} />
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
        <Ruler
          segmentNum={segmentNum}
          rulerWidth={rulerWidth}
          segmentWidth={segmentWidth}
          segmentSpacing={segmentSpacing}
          spacerWidth={spacerWidth}
          minAge={minAge}
        />
      </Animated.ScrollView>
    </View>
  );
};

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
    height: 130,
    width: 130,
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
  ageTextStyle: {
    fontSize: 42,
    fontWeight: "600",
    color: "#4d4f4e",
  },
});

export default Slider;
