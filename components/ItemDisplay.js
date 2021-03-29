import React from "react";
import { Linking, StyleSheet, FlatList } from "react-native";
import { Card, Title, IconButton } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    margin: 10,
    backgroundColor: "transparent",
    overflow: "hidden",
  },
  title: {
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: "Arial",
  },
  text: {
    paddingLeft: 15,
    paddingTop: 10,
    color: "white",
    fontFamily: "Arial",
  },
});

export const ItemDisplay = ({ picture, name, locations }) => {
  const renderItem = ({ item }) => (
    <IconButton
      size={70}
      style={{ height: 50 }}
      icon={{
        uri: item.icon,
      }}
      key={item.id}
      onPress={() => Linking.openURL(item.url)}
    />
  );

  return (
    <Card style={styles.card}>
      <BlurView tint="light" intensity={35}>
        <Card.Content>
          <Title style={styles.title}>{name}</Title>
        </Card.Content>
        <Card.Cover source={{ uri: picture }} />
        {/* <Text style={styles.text}>Currently streaming on:</Text> */}
        <Card.Actions style={{ height: 60, padding: 0 }}>
          <FlatList
            style={{ height: "100%" }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={locations.forEach((location) =>
              location.id.toString()
            )}
            data={locations}
            renderItem={renderItem}
          />
        </Card.Actions>
      </BlurView>
    </Card>
  );
};
