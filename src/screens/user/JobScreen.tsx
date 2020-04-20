import React, { memo, useState } from 'react';
import MapView from 'react-native-maps';
import Marker from 'react-native-maps';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { SliderBox } from 'react-native-image-slider-box';
import { useQuery } from '@apollo/react-hooks';
import BackgroundJobBoard from '../../components/BackgroundJobBoard';
import Background from '../../components/Background';
import Button from '../../components/Button';
import { Navigation } from '../../types';
import { Appbar } from 'react-native-paper';

type Props = {
  navigation: Navigation;
  user: { country: String; id: String; jobs: []; token: String };
};

const GET_JOBS = gql`
  query jobs($country: String!) {
    jobs(country: $country) {
      title
      description
      price
      imagePaths
      userId
      country
      city
      postalCode
      address
      jobCategoryId
    }
  }
`;

const JobScreen = ({ navigation, user }: Props) => {
  var markers = [
    {
      latitude: 52.379189,
      longitude: 4.899431,
      title: 'Foo Place',
      subtitle: '1234 Foo Drive',
    },
  ];
  const [mapVisible, setMapVisibility] = useState(false);
  const { loading, error, data } = useQuery(GET_JOBS, {
    variables: { country: user.country },
  });

  if (loading)
    return (
      <Background>
        <Text>Loading...</Text>
      </Background>
    );
  if (error)
    return (
      <Background>
        <Text>Error! ${error.message}`</Text>
      </Background>
    );
  const userJobs = data ? (
    data.jobs.map((job, index) => {
      const imagePaths = job.imagePaths.split(',');
      return (
        <Card key={index} style={styles.jobCard}>
          <Card.Content>
            <Title>{job.title}</Title>
            <Paragraph>{job.description}</Paragraph>
            <Paragraph>{job.price} EUR</Paragraph>
          </Card.Content>
          <SliderBox images={imagePaths} />
          <View style={styles.actionButtonContainer}>
            <Card.Actions>
              <Button style={{ width: 100 }}>Contact</Button>
            </Card.Actions>
          </View>
        </Card>
      );
    })
  ) : (
    <View>
      <Text>No jobs available</Text>
    </View>
  );
  const renderMap = () => {
    setMapVisibility(true);
  };
  const renderList = () => {
    setMapVisibility(false);
  };
  return (
    <View style={{ flex: 1, width: '100%' }}>
      <Appbar
        style={{
          height: '10%',
          paddingTop: '13.5%',
          justifyContent: 'space-between',
        }}
      >
        <Appbar.Action icon="format-line-spacing" onPress={renderList} />
        <Appbar.Action icon="filter-outline" onPress={this._handleSearch} />
        <Appbar.Action icon="map" onPress={renderMap} />
      </Appbar>
      <BackgroundJobBoard style={{ marginTop: 0 }}>
        <ScrollView showsVerticalScrollIndicator={false}>{userJobs}</ScrollView>
      </BackgroundJobBoard>
      {mapVisible ? (
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: 52.379189,
            longitude: 4.899431,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {data.jobs.map((job, index) => {
            //Just for demonstration purposes - this component is still work in progress
            return (
              <MapView.Marker
                key={index}
                coordinate={{
                  latitude: 52.367012 + (index * Math.random()) / 100,
                  longitude: 4.883395 + (index * Math.random()) / 100,
                }}
                title={job.title}
                description={job.description}
              />
            );
          })}
        </MapView>
      ) : (
        <View></View>
      )}
      {/* <Marker
        coordinate={{ latitude: 52.379189, longitude: 4.899431 }}
        title={'title'}
        description={'Description'}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  jobCard: { height: 400, maxWidth: 340, marginBottom: 50 },
  actionButtonContainer: {
    flexDirection: 'row',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: 725,
  },
});

const mapStateToProps = state => ({
  user: state.user,
});

export default memo(connect(mapStateToProps)(JobScreen));
