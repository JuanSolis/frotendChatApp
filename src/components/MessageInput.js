import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Send from '@material-ui/icons/Send';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'row',
      margin:'auto',
      width: '80%',
      padding: theme.spacing(1)
    },
    input: {
     
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }));

  function MessageInput(props) {
    const classes = useStyles();
    const [message, setMessage] = useState();
    

    const onSubmit = (event) => {
        
      event.preventDefault();
      const msg = {
        SenderUser: props.senderUser.username,
        ReceiverUser: props.receivingUser.username,
        Type: 'txt',
        room: props.currentRoom.idRoom,
        content: message,
      };
      props.connection.invoke("SendMessage", msg).catch(error => console.log(error));
      setMessage("");
  };
    

    return (
          <Paper component="form" className={classes.root} elevation={10}>
              <InputBase
              value={message}
              className={classes.input}
              placeholder="What do you think? ☺"
              onInput={ e=>setMessage(e.target.value)}
              />
              <Divider className={classes.divider} orientation="vertical" />
                  <IconButton type="submit" onClick={(e) => onSubmit(e)} color="primary" className={classes.iconButton}>
                  <Send />
              </IconButton>
          </Paper>
    );
  }


  const mapStateToProps = state => {
    return {
      receivingUser: state.requestRoom.receivingUser,
      senderUser: state.requestRoom.senderUser,
      currentRoom: state.requestRoom.currentRoom,
      connection: state.requestRoom.connection
    };
  };

  export default connect(mapStateToProps)(MessageInput);