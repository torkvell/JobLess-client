import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

// const REGISTER_USER = gql`
//   mutation AddUser(
//     $name: String!
//     $email: String!
//     $password: String!
//     $country: String!
//     $jobless: Boolean!
//   ) {
//     addUser(
//       $name: String!
//       $email: String!
//       $password: String!
//       $country: String!
//       $jobless: Boolean!) {
//       name
//       email
//       password
//       country
//       jobless
//     }
//   }
// `;
/*--------------------SIGN UP--------------------*/

export function registerHandler(name, email, password, country, jobless) {
  return function(dispatch, getState) {
    console.log(
      `name: ${name}, email: ${email}, password: ${password}, country: ${country}, jobless: ${jobless}`
    );
    client
      .query({
        query: gql`
          {
            user(id: ${userId}) {
              name
            }
          }
        `,
      })
      .then(result => console.log(result));
    // try {
    //   const response = await axios.post("http://localhost:4000/user/signup", {
    //     firstName,
    //     lastName,
    //     email,
    //     password
    //   });
    //   // Success 🎉
    //   dispatch(signUpSuccess(response.data));
    //   dispatch(errorHandler(null));
    // } catch (error) {
    //   //https://github.com/axios/axios#handling-errors
    //   // Error 😨
    //   if (error.response) {
    //     dispatch(errorHandler(error.response.data));
    //   } else if (error.request) {
    //     dispatch(
    //       errorHandler(
    //         "Something went wrong. The request was made but no response from server was received"
    //       )
    //     );
    //   } else {
    //     dispatch(errorHandler(`Something went wrong: ${error.message}`));
    //   }
    //   // console.log(error);
    // }
  };
}

function signUpSuccess(data) {
  return { type: 'USER_CREATED', payload: data };
}

/*--------------------LOGIN--------------------*/

export function logIn(email, password) {
  return async function(dispatch, getState) {
    // try {
    //   const response = await axios.post("http://localhost:4000/user/login", {
    //     email,
    //     password
    //   });
    //   // Success 🎉
    //   dispatch(loginSuccess(response.data));
    //   dispatch(errorHandler(null));
    // } catch (error) {
    //   // Error 😨
    //   if (error.response) {
    //     dispatch(errorHandler(error.response.data));
    //   } else if (error.request) {
    //     dispatch(
    //       errorHandler(
    //         "Something went wrong. The request was made but no response from server was received"
    //       )
    //     );
    //   } else {
    //     dispatch(errorHandler(`Something went wrong: ${error.message}`));
    //   }
    // }
  };
}

function loginSuccess(data) {
  return {
    type: 'LOGIN_SUCCESS',
    payload: data,
  };
}

/*--------------------LOGOUT--------------------*/

export function logOut() {
  return async function(dispatch) {
    dispatch(logOutSuccess());
  };
}

function logOutSuccess() {
  return { type: 'USER_LOGOUT' };
}
