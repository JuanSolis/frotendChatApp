import {
    ADD_USER
  } from './actionTypes';
  
import { postData } from "../../api/api";

const baseUrl = "https://localhost:44364/api/users";

// Action to add a new user in the database
  export const addNewUser = (user) => dispatch => {
      const url = baseUrl + '/add';
      postData(url).then(data => dispatch({ type: ADD_USER, payload: data })).catch(
          error => console.log(error)
      ); 
  };