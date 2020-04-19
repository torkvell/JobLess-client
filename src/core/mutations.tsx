import gql from 'graphql-tag';
//TODO: ADD type for images $images: [Upload!]! || single file not required: Upload
export const ADD_JOB_MUTATION = gql`
  mutation AddJob(
    $title: String!
    $description: String!
    $price: Int!
    $images: [Upload]
    $country: String!
    $city: String!
    $postalCode: String!
    $address: String!
    $userId: String!
    $jobCategoryId: String!
    $token: String!
  ) {
    addJob(
      title: $title
      description: $description
      price: $price
      images: $images
      country: $country
      city: $city
      postalCode: $postalCode
      address: $address
      userId: $userId
      jobCategoryId: $jobCategoryId
      token: $token
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
      imagePaths
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      name
      email
      country
      jobless
      token
      jobs {
        id
        title
        description
        price
        imagePaths
        city
        postalCode
        address
        userId
        jobCategoryId
      }
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser(
    $name: String!
    $email: String!
    $password: String!
    $country: String!
    $jobless: Boolean!
  ) {
    addUser(
      name: $name
      email: $email
      password: $password
      country: $country
      jobless: $jobless
    ) {
      name
      email
      country
      jobless
    }
  }
`;
