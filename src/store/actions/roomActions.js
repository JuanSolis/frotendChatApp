import {
    SET_ROOM,
    SET_RECEIVING_USER,
    SET_SENDER_USER,
    SET_SOCKET_CONNECTION,
    SET_LAST_ROOM,
    SET_CYPHER_MESSAGES_LIST,
    SET_SERVER_MESSAGES
  } from './actionTypes';

  export const setRoom = (room) => ({ type: SET_ROOM, payload: room })
  export const setReceivingUser = (user) => ({ type: SET_RECEIVING_USER, payload: user })
  export const setSenderUser = (user) => ({ type: SET_SENDER_USER, payload: user })
  export const setConnection = (connection) => ({ type: SET_SOCKET_CONNECTION, payload: connection })
  export const setLastRoom = (room) => ({ type: SET_LAST_ROOM, payload: room })
  export const setCypherMessageList = (message) => ({ type: SET_CYPHER_MESSAGES_LIST, payload: message })

  export const setServerMessages = (listMessage) => ({ type: SET_SERVER_MESSAGES, payload: listMessage })