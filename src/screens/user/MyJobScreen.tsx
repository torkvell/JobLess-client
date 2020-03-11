import React, { memo, useState } from 'react';
import Background from '../../components/Background';
import Button from '../../components/Button';
import { Navigation } from '../../types';
import { connect } from 'react-redux';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
  navigation: Navigation;
};

const MyJobScreen = ({ navigation }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <Background>
      <Modal visible={modalOpen}>
        <MaterialIcons
          name="close"
          size={24}
          style={{ ...styles.modalToggle, ...styles.modalClose }}
          onPress={() => setModalOpen(false)}
        />
        <Background>
          <Text>Hello modal</Text>
          <Button
            mode="contained"
            onPress={() => console.log('post job via apollo hook')}
          >
            POST JOB
          </Button>
        </Background>
      </Modal>
      <Button icon="plus" mode="contained" onPress={() => setModalOpen(true)}>
        POST JOB
      </Button>
    </Background>
  );
};

const styles = StyleSheet.create({
  modalToggle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
  },
});

export default memo(connect(null)(MyJobScreen));
