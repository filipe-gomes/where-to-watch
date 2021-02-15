import React from "react";
import { ScrollView } from "react-native-gesture-handler";

import { ItemDisplay } from "../components/ItemDisplay";

export const ResultsScreen = (data) => {
  return (
    <ScrollView>
      {data.route.params.data.results.map((item) => (
        <ItemDisplay
          key={item.id}
          picture={item.picture}
          name={item.name}
          locations={item.locations}
        />
      ))}
    </ScrollView>
  );
};
