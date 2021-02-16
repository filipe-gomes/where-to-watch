import React from "react";
import { Linking } from "react-native";
import { Card, Title, IconButton } from "react-native-paper";

export const ItemDisplay = ({ picture, name, locations }) => {
  return (
    <Card>
      <Card.Content>
        <Title>{name}</Title>
      </Card.Content>
      <Card.Cover source={{ uri: picture }} />
      <Card.Actions>
        {locations.map((location) => (
          <IconButton
            size={40}
            style={{ height: 22 }}
            icon={{
              uri: location.icon,
            }}
            key={location.id}
            onPress={() => Linking.openURL(location.url)}
          />
        ))}
      </Card.Actions>
    </Card>
  );
};
