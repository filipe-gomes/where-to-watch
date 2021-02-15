import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
} from "react-native";
import axios from "axios";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { ResultsScreen } from "./ResultsScreen";
import CountryContext from "../contexts/country/country.context";

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
  },
  header: {
    fontSize: 24,
    paddingTop: 40,
    alignSelf: "center",
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12,
  },
});

const Main = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState(null);
  const getResults = async (country, term) => {
    try {
      const response = await axios.get(
      `http://127.0.0.1:3030/search?country=${country}&term=${term}`
    );
    return response.data;
    } catch(error) {
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
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
              <Text style={styles.header}>
                Search for a movie or show to find out where it's streaming!
              </Text>
              <TextInput
                placeholder="Ex.: The Terminator"
                style={styles.textInput}
                onChangeText={(text) => setSearchQuery(text)}
                value={searchQuery}
              />
              <View style={styles.btnContainer}>
                <Button
                  title="Find"
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
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen options={{headerShown: false}} name="Main" component={Main} />
      <Stack.Screen name="Results" component={ResultsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
