import React from "react";
import { StyleSheet, Text, Linking } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { AdMobBanner } from "expo-ads-admob";

import { ItemDisplay } from "../components/ItemDisplay";

const styles = StyleSheet.create({
  container: {
    height: "90%",
    paddingLeft: 10,
    paddingRight: 10,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  text: {
    padding: 20,
    color: "white",
    alignSelf: "center",
    fontFamily: "Arial",
  },
});

export const ResultsScreen = (data) => {
  if (data.route.params.data.status_code !== 200) {
    return (
      <>
        <LinearGradient
          // Background Linear Gradient
          colors={["#ff5f6d", "#ffc371"]}
          style={styles.background}
        />
        <Text style={styles.text}>
          Something went wrong. We apologize for the inconvenience. Please
          <Text
            onPress={() => Linking.openURL("mailto:filipegomes404@gmail.com")}
          >
            {" "}
            contact support.
          </Text>
        </Text>
      </>
    );
  }
  return (
    <>
      <LinearGradient
        // Background Linear Gradient
        colors={["#ff5f6d", "#ffc371"]}
        style={styles.background}
      />
      <ScrollView style={styles.container}>
        {data.route.params.data.results.length > 0 ? (
          data.route.params.data.results.map((item) => (
            <ItemDisplay
              key={item.id}
              picture={item.picture}
              name={item.name}
              locations={item.locations}
            />
          ))
        ) : (
          <Text style={styles.text}>No results found.</Text>
        )}
      </ScrollView>
      <AdMobBanner
        bannerSize="fullBanner"
        adUnitID="ca-app-pub-9099008543344486/9912292038"
        servePersonalizedAds={true}
        onDidFailToReceiveAdWithError={(error) => console.log(error)}
      />
    </>
  );
};
