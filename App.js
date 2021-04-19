import "react-native-gesture-handler";
import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import { MainScreen } from "./screens/MainScreen";

const queryClient = new QueryClient();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: "white",
  },
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PaperProvider theme={theme}>
      <MainScreen />
    </PaperProvider>
  </QueryClientProvider>
);

export default App;
