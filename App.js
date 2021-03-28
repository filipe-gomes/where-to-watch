import "react-native-gesture-handler";
import * as React from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import { MainScreen } from "./screens/MainScreen";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: "white",
  },
};

const App = () => (
  <PaperProvider theme={theme}>
    <MainScreen />
  </PaperProvider>
);

export default App;
