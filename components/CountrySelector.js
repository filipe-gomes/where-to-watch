import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import CountryContext from "../contexts/country/country.context";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
  },
});

export const CountrySelector = () => {
  const [selectedValue, setSelectedValue] = useState("us");
  return (
    <CountryContext.Provider value={selectedValue}>
      <View style={styles.container}>
        <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="United States" value="us" />
          <Picker.Item label="Canada" value="ca" />
          <Picker.Item label="Mexico" value="mx" />
        </Picker>
      </View>
    </CountryContext.Provider>
  );
};
