import {
    ADD_USER
  } from '../actions/actionTypes';
  
  const initialState = {
    user: {}
  }
  
  export const newUser = (state = initialState, action)=> {
      switch(action.type){
          case ADD_USER:
              return Object.assign({}, state, {
                    user: action.payload
              })
              default:
                  return state;
      }
  }