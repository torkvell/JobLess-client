import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import MapView from 'react-native-maps';

const Map = () => (
  <MapView
    style={styles.mapStyle}
    initialRegion={{
      latitude: 52.379189,
      longitude: 4.899431,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  />
);

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get('window').width,
    height: 720,
  },
});

export default memo(Map);
