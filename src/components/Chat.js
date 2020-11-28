import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Messages from './Messages';
import MessageInput from './MessageInput';
import {setConnection} from '../store/actions/roomActions';

const useStyles = makeStyles((theme) => ({
    customBadge: {
        backgroundColor:"#B0FC38",
        border: `3px solid white`,
      },
      headerNav: {
        height: '10%',
        width: '100%',
        backgroundColor: "#2196F3"
      },
      verticalBox: {
       
        display: 'flex',
        flexDirection: 'column',
        margin: theme.spacing(0, 2),
        justifyContent:'flex-start'
      }
  }));



function Chat(props){
    const classes = useStyles();
    const {receivingUser} = props;
    const {connection} = props;


    return(
        <React.Fragment>

            {receivingUser ? (
              <React.Fragment>
                <AppBar position="static" className={classes.headerNav}>
                    <Toolbar>
                      <Badge classes={{badge: classes.customBadge}} overlap="circle" badgeContent=" " anchorOrigin={{
                                      vertical: 'bottom',
                                      horizontal: 'right',
                                  }}>
                                  <Avatar alt="Remy Sharp" src={`https://ui-avatars.com/api/?name=${receivingUser.username}&background=0D8ABC&color=fff`} />
                      </Badge>
                      <Box className={classes.verticalBox}>
                          <Typography variant="subtitle1" >
                              {receivingUser.username}
                          </Typography>
                      </Box>
                    </Toolbar>
                </AppBar>   
                  <Messages />
                  <MessageInput/>
           </React.Fragment>
            ): (
              <Box className={classes.verticalBox}>
                <Typography variant="subtitle1" >
                    Start 
                </Typography>
              </Box>
            )}
            
            
            
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
      currentRoom: state.requestRoom.currentRoom,
      receivingUser: state.requestRoom.receivingUser,
      senderUser: state.requestRoom.senderUser,
      connection: state.requestRoom.connection
    };
  };

  

export default connect(mapStateToProps)(Chat);