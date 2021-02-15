import React from "react";
import { Linking } from 'react-native';
import { Button, Card, Title } from "react-native-paper";

export const ItemDisplay = ({ picture, name, locations }) => {
  return (
    <Card>
      <Card.Content>
        <Title>{name}</Title>
      </Card.Content>
      <Card.Cover source={{ uri: picture }} />
      <Card.Actions>
        {locations.map((location) => (
          <Button key={location.id} onPress={() => Linking.openURL(location.url)}>{location.display_name}</Button>
        ))}
      </Card.Actions>
    </Card>
  );
};
