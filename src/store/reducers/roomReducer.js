import {
    SET_RECEIVING_USER,
    SET_ROOM,
    SET_SENDER_USER,
    SET_SOCKET_CONNECTION,
    SET_LAST_ROOM,
    SET_CYPHER_MESSAGES_LIST,
    SET_SERVER_MESSAGES
  } from '../actions/actionTypes';

  const initialState = {
    currentRoom:null,
    receivingUser: null,
    senderUser: null,
    connection:null,
    lastRoom: null,
    cypherListMessages: [],
    serverMessages: [],
  }

  export const requestRoom =  (state = initialState, action={}) => {
    switch (action.type) {
      case SET_ROOM:
        return {
          ...state,
          currentRoom: action.payload
        }
        case SET_RECEIVING_USER:
        return {
          ...state,
          receivingUser: action.payload
        }
        case SET_SENDER_USER:
        return {
          ...state,
          senderUser: action.payload
        }
        case SET_SOCKET_CONNECTION:
        return {
          ...state,
          connection: action.payload
        }
        case SET_LAST_ROOM:
        return {
          ...state,
          lastRoom: action.payload
        }
        case SET_CYPHER_MESSAGES_LIST:
        return {
          ...state,
          cypherListMessages:  action.payload
        }

        case SET_SERVER_MESSAGES:
        return {
          ...state,
          serverMessages: action.payload
        }
      default:
        return state;
    }
  }