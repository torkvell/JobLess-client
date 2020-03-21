import React, { memo, useState } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Alert,
  Linking,
  ScrollView,
  TouchableHighlight,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import Background from '../../components/Background';
import Container from '../../components/Container';
import Button from '../../components/Button';
import { connect } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import TextInput from '../../components/TextInput';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useMutation } from '@apollo/react-hooks';
import { validate } from '../../core/utils';
import { Navigation } from '../../types';
import { theme } from '../../core/theme';
import { ADD_JOB_MUTATION } from '../../core/mutations';

type Props = {
  navigation: Navigation;
  user: { country: String; id: String; jobs: []; token: String };
  jobToGlobalState: (job: Object) => void;
  dispatch: (type: any, data?: any) => void;
};

const MyJobScreen = ({ navigation, user, dispatch }: Props) => {
  const [uploadJob, { data }] = useMutation(ADD_JOB_MUTATION);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState({ name: 'title', value: null, error: '' });
  const [description, setDescription] = useState({
    name: 'description',
    value: null,
    error: '',
  });
  const [price, setPrice] = useState({ name: 'price', value: null, error: '' });
  const [images, setImage] = useState({ uri: [], error: '' });
  const [city, setCity] = useState({ name: 'city', value: null, error: '' });
  const [postalCode, setPostalCode] = useState({
    name: 'postalCode',
    value: null,
    error: '',
  });
  const [address, setAddress] = useState({
    name: 'address',
    value: null,
    error: '',
  });

  const validateInput = () => {
    let errorState = false;
    const formData = [
      [title, setTitle],
      [description, setDescription],
      [price, setPrice],
      [city, setCity],
      [postalCode, setPostalCode],
      [address, setAddress],
    ];
    formData.forEach(field => {
      console.log(`field`, field);
      const error = validate[field[0].name](field[0].value);
      // if error we call the second element of the array "field" that is the state setter
      if (error) {
        field[1]({ ...field[0], error });
        errorState = true;
      }
    });
    return errorState;
  };

  const showAlert = () => {
    Alert.alert(
      'Please Allow Access',
      [
        'This applicaton needs access to your photo library to upload images.',
        '\n\n',
        'Please go to Settings of your device and grant permissions to Photos.',
      ].join(''),
      [
        { text: 'Not Now', style: 'cancel' },
        { text: 'Settings', onPress: () => Linking.openURL('app-settings:') },
      ]
    );
  };

  const getImagePermission = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        return showAlert();
      }
    }
    return pickImage();
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage({ ...images, uri: [...images.uri, result.uri] });
    }
  };

  const removePicture = imageURI => {
    const newImages = images.uri.filter(uri => uri !== imageURI);
    setImage({ uri: newImages, error: '' });
  };

  const userJobs =
    user.jobs.length > 0 ? (
      user.jobs.map(
        (job: {
          id: String;
          title: String;
          description: String;
          price: Number;
        }) => {
          return (
            <Card key={job.id} style={styles.jobCard}>
              <Card.Content>
                <Title>{job.title}</Title>
                <Paragraph>{job.description}</Paragraph>
                <Paragraph>{job.price} EUR</Paragraph>
              </Card.Content>
              <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
              <View style={styles.actionButtonContainer}>
                <Card.Actions>
                  <Button style={{ width: 100 }}>Edit</Button>
                </Card.Actions>
                <Card.Actions>
                  <Button>Delete</Button>
                </Card.Actions>
              </View>
            </Card>
          );
        }
      )
    ) : (
      <View></View>
    );

  return (
    <Background>
      <Modal visible={modalOpen}>
        <ScrollView>
          <Container>
            <MaterialIcons
              name="close"
              size={24}
              style={{ ...styles.modalToggle, ...styles.modalClose }}
              onPress={() => setModalOpen(false)}
            />
            <TextInput
              label="Title"
              returnKeyType="next"
              value={title.value}
              onChangeText={text =>
                setTitle({ name: 'title', value: text, error: '' })
              }
              error={!!title.error}
              errorText={title.error}
            />
            <TextInput
              style={styles.desription}
              label="Description"
              returnKeyType="next"
              value={description.value}
              onChangeText={text =>
                setDescription({ name: 'description', value: text, error: '' })
              }
              error={!!description.error}
              errorText={description.error}
              multiline={true}
            />
            <TextInput
              label="Price"
              returnKeyType="next"
              value={price.value}
              onChangeText={text =>
                setPrice({ name: 'price', value: text, error: '' })
              }
              error={!!price.error}
              errorText={price.error}
              keyboardType={'numeric'}
            />
            <Button icon="camera" mode="contained" onPress={getImagePermission}>
              ADD IMAGE
            </Button>
            <View style={styles.imageContainer}>
              {images.uri.length >= 1 &&
                images.uri.map(imageURI => {
                  return (
                    <TouchableHighlight
                      key={imageURI}
                      onPress={() => removePicture(imageURI)}
                    >
                      <Image
                        style={styles.image}
                        source={{ uri: imageURI }}
                      ></Image>
                    </TouchableHighlight>
                  );
                })}
            </View>
            {images.uri.length >= 1 && (
              <Paragraph style={styles.text}>
                Press image to remove it
              </Paragraph>
            )}
            <TextInput
              label="City"
              returnKeyType="next"
              value={city.value}
              onChangeText={text =>
                setCity({ name: 'city', value: text, error: '' })
              }
              error={!!city.error}
              errorText={city.error}
            />
            <TextInput
              label="PostalCode"
              returnKeyType="next"
              value={postalCode.value}
              onChangeText={text =>
                setPostalCode({ name: 'postalCode', value: text, error: '' })
              }
              error={!!postalCode.error}
              errorText={postalCode.error}
            />
            <TextInput
              label="Address"
              returnKeyType="next"
              value={address.value}
              onChangeText={text =>
                setAddress({ name: 'address', value: text, error: '' })
              }
              error={!!address.error}
              errorText={address.error}
            />
            <Button
              mode="contained"
              onPress={() => {
                if (!validateInput()) {
                  //TODO: Add functionality to upload images for job
                  uploadJob({
                    variables: {
                      title: title.value,
                      description: description.value,
                      price: parseInt(price.value),
                      // images: images.uri,
                      country: user.country,
                      city: city.value,
                      postalCode: postalCode.value,
                      address: address.value,
                      userId: user.id,
                      jobCategoryId: 'jobCatTestingID_32f24f4f4f4',
                      token: user.token,
                    },
                  }).then(res => {
                    if (res.data.addJob)
                      dispatch({
                        type: 'JOB_PUBLISHED',
                        payload: res.data.addJob,
                      });
                  });
                }
              }}
            >
              PUBLISH JOB
            </Button>
            <Paragraph>{data && 'Job is now published'}</Paragraph>
          </Container>
        </ScrollView>
      </Modal>
      <Button icon="plus" mode="contained" onPress={() => setModalOpen(true)}>
        POST JOB
      </Button>
      <ScrollView showsVerticalScrollIndicator={false}>{userJobs}</ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  jobCard: { height: 380, maxWidth: 340, marginBottom: 50 },
  modalToggle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
    color: theme.colors.primary,
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
  },
  imageContainer: {
    flexDirection: 'row',
  },
  image: {
    marginRight: 5,
    marginBottom: 5,
    width: 50,
    height: 50,
  },
  text: {
    color: theme.colors.secondary,
  },
  desription: {
    height: 100,
    backgroundColor: '#ffffff',
  },
  actionButtonContainer: {
    flexDirection: 'row',
  },
});

const mapStateToProps = state => ({
  user: state.user,
});

export default memo(connect(mapStateToProps)(MyJobScreen));
