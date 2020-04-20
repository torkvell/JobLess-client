import React, { memo } from 'react';
import Background from '../../components/Background';
import Button from '../../components/Button';
import { Navigation } from '../../types';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { SliderBox } from 'react-native-image-slider-box';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

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
  console.log('user', user);
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
  return (
    <Background>
      <ScrollView showsVerticalScrollIndicator={false}>{userJobs}</ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  jobCard: { height: 400, maxWidth: 340, marginBottom: 50 },
  actionButtonContainer: {
    flexDirection: 'row',
  },
});

const mapStateToProps = state => ({
  user: state.user,
});

export default memo(connect(mapStateToProps)(JobScreen));
