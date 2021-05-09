import React from "react";
import axios from "axios";
import { StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { AdMobBanner } from "expo-ads-admob";
import { useQuery, useIsFetching } from "react-query";

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

export const ResultsScreen = ({ route, navigation }) => {
  const { searchQuery, country } = route.params;
  const getResults = async (location, term) => {
    try {
      const response = await axios.get(
        `http://157.245.128.74:3030/search?country=${location}&term=${term}`
      );
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  };

  const isFetching = useIsFetching();

  const { data, status } = useQuery("results", async () =>
    getResults(country, searchQuery)
  );

  // TODO: Add error handling
  //      <>
  //         <LinearGradient
  //           // Background Linear Gradient
  //           colors={["#ff5f6d", "#ffc371"]}
  //           style={styles.background}
  //         />
  //         <Text style={styles.text}>
  //           Something went wrong. We apologize for the inconvenience. Please
  //           <Text
  //             onPress={() => Linking.openURL("mailto:filipegomes404@gmail.com")}
  //           >
  //             {" "}
  //             contact support.
  //           </Text>
  //         </Text>
  //       </>

  return (
    <>
      {isFetching ? (
        <>
          <LinearGradient
            // Background Linear Gradient
            colors={["#ff5f6d", "#FF8126"]}
            style={styles.background}
          />
          <Text style={styles.text}>Searching...</Text>
        </>
      ) : (
        <>
          <LinearGradient
            // Background Linear Gradient
            colors={["#ff5f6d", "#FF8126"]}
            style={styles.background}
          />
          <ScrollView style={styles.container}>
            {data?.results.length > 0 ? (
              data?.results.map((item) => (
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
          {/* <AdMobBanner
              bannerSize="fullBanner"
              adUnitID="ca-app-pub-9099008543344486/9912292038"
              servePersonalizedAds={true}
              onDidFailToReceiveAdWithError={(error) => console.log(error)}
            /> */}
        </>
      )}
    </>
  );
};
