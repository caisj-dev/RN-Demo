import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import Button from "react-native-button";
import Center from "./components/Center";
import ProgressBar from "./components/ProgressBar";
import QuesParamList from "./QuesParamList";

const HOME = "Home";

const Stack = createStackNavigator();

const Home = ({ navigation }) => {
  return (
    <Center>
      <Button
        style={styles.btn}
        containerStyle={styles.btnContainer}
        onPress={() => navigation.navigate(QuesParamList[0].question)}
      >
        Start Testing.
      </Button>
    </Center>
  );
};

const QuestionLayout = ({ question, nextQues, component, navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.queston}>{question}</Text>
      <Center>{React.isValidElement(component) && component}</Center>
      <Button
        style={styles.btn}
        containerStyle={styles.btnContainer}
        onPress={() => navigation.navigate(nextQues || HOME)}
      >
        {nextQues ? "Continue" : "End Test & Go to Home"}
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 50,
  },
  queston: {
    alignSelf: "flex-start",
    fontSize: 30,
    padding: 10,
    fontWeight: "bold",
    color: "#333536",
  },
  btn: {
    fontSize: 20,
    color: "white",
  },
  btnContainer: {
    padding: 10,
    height: 50,
    width: 250,
    borderRadius: 100,
    backgroundColor: "#27d2db",
  },
});

const customeTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.color,
    background: "#FFF",
  },
};

export default function Routes() {
  return (
    <NavigationContainer theme={customeTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name={HOME}
          options={{
            title: () => null,
          }}
          component={Home}
        />
        {QuesParamList.map((item, idx) => {
          return (
            <Stack.Screen
              key={item.question}
              name={item.question}
              options={{
                title: () => null,
                headerTitle: () => (
                  <ProgressBar
                    value={idx + 1}
                    min={0}
                    max={QuesParamList.length}
                  />
                ),
                headerRight: () => (
                  <View style={{ marginRight: 10 }}>
                    <ProgressBar.State
                      value={idx + 1}
                      max={QuesParamList.length}
                    />
                  </View>
                ),
              }}
            >
              {({ navigation }) => (
                <QuestionLayout
                  question={item.question}
                  component={item.component}
                  navigation={navigation}
                  nextQues={
                    idx === QuesParamList.length - 1
                      ? null
                      : QuesParamList[idx + 1].question
                  }
                />
              )}
            </Stack.Screen>
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
