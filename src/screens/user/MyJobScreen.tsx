import React, { memo, useState } from 'react';
import Background from '../../components/Background';
import Container from '../../components/Container';
import Button from '../../components/Button';
import { Navigation } from '../../types';
import { connect } from 'react-redux';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Alert,
  Linking,
  Image,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import TextInput from '../../components/TextInput';
import {
  titleValidator,
  descriptionValidator,
  priceValidator,
  cityValidator,
  postalCodeValidator,
  addressValidator,
} from '../../core/utils';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { theme } from '../../core/theme';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { jobToGlobalState } from '../../store/user/actions';

type Props = {
  navigation: Navigation;
  user: { country: String; id: String };
  jobToGlobalState: (job: Object) => void;
};

//TODO: ADD type for images $images: [Upload!]! || single file not required: Upload
const ADD_JOB_MUTATION = gql`
  mutation AddJob(
    $title: String!
    $description: String!
    $price: Int!
    $country: String!
    $city: String!
    $postalCode: String!
    $address: String!
    $userId: String!
    $jobCategoryId: String!
  ) {
    addJob(
      title: $title
      description: $description
      price: $price
      country: $country
      city: $city
      postalCode: $postalCode
      address: $address
      userId: $userId
      jobCategoryId: $jobCategoryId
    ) {
      id
      title
      description
      price
      city
      postalCode
      address
      userId
      jobCategoryId
    }
  }
`;

// const GET_USER_JOBS = gql`
//   query UserJobs($userId: String) {
//     userJobs(userId: $userId) {
//       id
//       title
//       description
//       price
//       city
//       postalCode
//       address
//       jobCategoryId
//     }
//   }
// `;

const MyJobScreen = ({ navigation, user, jobToGlobalState }: Props) => {
  // const { loading, error, data } = useQuery(GET_USER_JOBS, {
  //   variables: user.id,
  // });
  const [uploadJob] = useMutation(ADD_JOB_MUTATION);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState({ value: '', error: '' });
  const [description, setDescription] = useState({ value: '', error: '' });
  const [price, setPrice] = useState({ value: null, error: '' });
  const [images, setImage] = useState({ uri: null, error: '' });
  const [city, setCity] = useState({ value: null, error: '' });
  const [postalCode, setPostalCode] = useState({ value: null, error: '' });
  const [address, setAddress] = useState({ value: null, error: '' });
  const [hasCameraPermission, setCameraPermission] = useState({
    value: null,
    error: '',
  });

  const validateInput = () => {
    const titleError = titleValidator(title.value);
    const descriptionError = descriptionValidator(description.value);
    const priceError = priceValidator(price.value);
    const cityError = cityValidator(city.value);
    const postalCodeError = postalCodeValidator(postalCode.value);
    const addressError = addressValidator(address.value);
    if (titleError) {
      setTitle({ ...title, error: titleError });
    }
    if (descriptionError) {
      setDescription({ ...description, error: descriptionError });
    }
    if (priceError) {
      setPrice({ ...price, error: priceError });
    }
    if (cityError) {
      setCity({ ...city, error: cityError });
    }
    if (postalCodeError) {
      setPostalCode({ ...postalCode, error: postalCodeError });
    }
    if (addressError) {
      setAddress({ ...address, error: addressError });
    }
    if (
      !addressError &&
      !postalCodeError &&
      !cityError &&
      !priceError &&
      !descriptionError &&
      !titleError
    ) {
      console.log(
        `Request to graphQL API---------> 
        \n Title: ${title.value} 
        \n Description: ${description.value} 
        \n Price: ${price.value} 
        \n Country: ${user.country} 
        \n City: ${city.value} 
        \n PostalCode: ${postalCode.value} 
        \n Address: ${address.value} 
        \n userId: ${'uID1wwc2324fcr2'} 
        \n jobCategoryId: ${'jobCatwdfwfd32f24f4f4f4'}`
      );
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
          jobCategoryId: 'jobCatwdfwfd32f24f4f4f4',
        },
      }).then(res => {
        const job = res.data.addJob;
        jobToGlobalState(job);
      });
    }
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
    //Only neccessary for ios
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
      setImage({ ...images, uri: result.uri });
      //setImage({ ...images, uri: [...images.uri, result.uri] });
    }
  };

  const removePicture = imageURI => {
    const newImages = images.uri.filter(uri => uri !== imageURI);
    setImage({ uri: newImages, error: '' });
  };

  // if (loading)
  //   return (
  //     <Container>
  //       <Text>Loading...</Text>
  //     </Container>
  //   );
  // if (error)
  //   return (
  //     <Container>
  //       <Text>Error! ${error.message}</Text>
  //     </Container>
  //   );

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
              onChangeText={text => setTitle({ value: text, error: '' })}
              error={!!title.error}
              errorText={title.error}
            />
            <TextInput
              style={styles.desription}
              label="Description"
              returnKeyType="next"
              value={description.value}
              onChangeText={text => setDescription({ value: text, error: '' })}
              error={!!description.error}
              errorText={description.error}
              multiline={true}
            />
            <TextInput
              //TODO: Render currency code for the country the user belongs to
              label="Price"
              returnKeyType="next"
              value={price.value}
              onChangeText={text => setPrice({ value: text, error: '' })}
              error={!!price.error}
              errorText={price.error}
              keyboardType={'numeric'}
            />
            <Button icon="camera" mode="contained" onPress={getImagePermission}>
              ADD IMAGE
            </Button>
            {/* <View style={styles.imageContainer}>
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
              <Text style={styles.text}>Press image to remove it </Text>
            )} */}
            <TextInput
              //TODO: Render list of predefined cities based on country user belongs to
              label="City"
              returnKeyType="next"
              value={city.value}
              onChangeText={text => setCity({ value: text, error: '' })}
              error={!!city.error}
              errorText={city.error}
            />
            <TextInput
              //TODO: Render list of predefined postalcodes based on city user belongs to
              label="PostalCode"
              returnKeyType="next"
              value={postalCode.value}
              onChangeText={text => setPostalCode({ value: text, error: '' })}
              error={!!postalCode.error}
              errorText={postalCode.error}
            />
            <TextInput
              label="Address"
              returnKeyType="next"
              value={address.value}
              onChangeText={text => setAddress({ value: text, error: '' })}
              error={!!address.error}
              errorText={address.error}
            />
            <Button mode="contained" onPress={validateInput}>
              PUBLISH JOB
            </Button>
          </Container>
        </ScrollView>
      </Modal>
      <Button icon="plus" mode="contained" onPress={() => setModalOpen(true)}>
        POST JOB
      </Button>
      {/* {data && console.log('get user jobs: ', data)} */}
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
});

const mapStateToProps = state => ({
  user: state.user,
});

export default memo(
  connect(mapStateToProps, { jobToGlobalState })(MyJobScreen)
);
