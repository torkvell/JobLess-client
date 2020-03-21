import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = () => (
  <Image
    source={require('../assets/jobLess-logo-trans.png')}
    style={styles.image}
  />
);

const styles = StyleSheet.create({
  image: {
    width: 258,
    height: 168,
    marginBottom: 12,
  },
});

export default memo(Logo);
