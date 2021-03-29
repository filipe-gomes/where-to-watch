import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
} from "react-native";
import axios from "axios";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";

import { ResultsScreen } from "./ResultsScreen";
import CountryContext from "../contexts/country/country.context";
import Logo from "../assets/logo/color.svg";

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: "#535ed6",
    marginTop: 12,
    alignItems: "center",
    borderRadius: 5,
    width: "50%",
    alignSelf: "center",
  },
});

const Main = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState(null);
  const getResults = async (country, term) => {
    try {
      const response = await axios.get(
        `http://157.245.128.74:3030/search?country=${country}&term=${term}`
      );
      return response.data;
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <CountryContext.Consumer>
      {(country) => (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <LinearGradient
            // Background Linear Gradient
            colors={["#ff5f6d", "#ffc371"]}
            style={styles.background}
          />
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
              <Logo
                style={{
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                fill="black"
                height={200}
                width={200}
              />
              <TextInput
                placeholder="Ex.: The Terminator"
                style={styles.textInput}
                onChangeText={(text) => setSearchQuery(text)}
                value={searchQuery}
              />
              <View style={styles.btnContainer}>
                <Button
                  title="Find"
                  color="white"
                  onPress={() =>
                    getResults(country, searchQuery).then((response) => {
                      navigation.navigate("Results", {
                        data: response,
                      });
                    })
                  }
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )}
    </CountryContext.Consumer>
  );
};

export const MainScreen = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="Main"
        component={Main}
      />
      <Stack.Screen
        name="Results"
        component={ResultsScreen}
        options={{
          headerStyle: {
            backgroundColor: "#ff5f6d",
            borderColor: "#ff5f6d",
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
            },
          },
          headerTitleStyle: {
            color: "white",
          },
          headerTintColor: 'white',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
