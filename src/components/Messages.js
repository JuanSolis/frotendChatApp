import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Chip from '@material-ui/core/Chip';
import DoneAll from '@material-ui/icons/DoneAll';
import { FixedSizeList } from 'react-window';
import { setCypherMessageList, setServerMessages } from '../store/actions/roomActions';


const useStyles = makeStyles((theme) => ({
    paper: {
      width: '100%',
      height: '70%',
    },
    root: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto',
      maxHeight: '100%'
    },
    messageSneder: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'flex-end'
      },
      avatarSender: {
        margin: theme.spacing(0, 0,0,2),
      },
      messageReceiver: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'flex-start',
      },
      boxMessage:{
          backgroundColor: '#6593F5',
          color: 'white'
      },
      content: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'flex-end',
        padding: theme.spacing(0),
        margin: theme.spacing(0)
      },
      box: {
          padding: theme.spacing(1)
      },
      deletePaddingAndMargin: {
        padding: theme.spacing(0),
        margin: theme.spacing(0)
      }

  }));

  function Messages(props){
    var {connection} = props;
      useEffect(()=> {

        connection.on("Messages", (listMessages) => {
          props.onSetServerMessages(listMessages);

          connection.invoke("DechyperMessage",listMessages).then((dechyperMessages)=> {
            props.onSetCypherMessageList(dechyperMessages) ;
          });
        });
    
        connection.on("GetDechyperMessage", (cypherMessage) => {
          console.log(cypherMessage)
          props.onSetCypherMessageList(cypherMessage);
        })

      },[]);
    const classes = useStyles();
      return(
        <Paper className={classes.paper} elevation={0} style={{ backgroundColor: 'transparent',}}>
          <List className={classes.root}>
            {props.cypherListMessages ? (
                  props.cypherListMessages.map( f => 
                    f.senderUser === props.senderUser.username ? (
                      <ListItem className={classes.messageSneder} key={f.id}> 
                          <Box borderRadius={12} className={classes.boxMessage }  >
                              <div className={classes.box}>
                                <p className={classes.deletePaddingAndMargin}>{f.content}</p>
                                <p className={classes.content}>
                                    <DoneAll style={{ color: "B0FC38" }} />
                                </p>
                              </div>
                          </Box>
                    
                          <ListItemAvatar className={classes.avatarSender}>
                              <Avatar alt="Remy Sharp" src={`https://ui-avatars.com/api/?name=${f.senderUser}&background=0D8ABC&color=fff`} />
                          </ListItemAvatar>

                      </ListItem> )
                  : (
                      <ListItem className={classes.messageReceiver}>
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src={`https://ui-avatars.com/api/?name=${f.senderUser}&background=0D8ABC&color=fff`} />
                        </ListItemAvatar>

                        <Box borderRadius={12} className={classes.boxMessage }  >
                            <div className={classes.box}>
                              <p className={classes.deletePaddingAndMargin}>{f.content}</p>   
                            </div>
                        </Box>

                    </ListItem>
                    )
                    
                  )
                ): (
                  <Box borderRadius={12} className={classes.boxMessage }  >
                            <div className={classes.box}>
                              <p className={classes.deletePaddingAndMargin}>No Messages</p>   
                            </div>
                        </Box>
                )}

            </List>
        </Paper>
            
      );
  }

  const mapStateToProps = (state) => {
    return {
        cypherListMessages: state.requestRoom.cypherListMessages,
        currentRoom: state.requestRoom.currentRoom,
        senderUser: state.requestRoom.senderUser,
        connection: state.requestRoom.connection,
        serverMessages: state.requestRoom.serverMessages
      };
};




const mapDispatchToProps = (dispatch) => {
  return {
    onSetCypherMessageList: (message) => dispatch(setCypherMessageList(message)),
    onSetServerMessages: (listMessages) => dispatch(setServerMessages(listMessages))
  }
}
  export default connect(mapStateToProps, mapDispatchToProps)(Messages);

  