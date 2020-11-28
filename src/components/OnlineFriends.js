import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { setRoom, setSenderUser, setLastRoom } from '../store/actions/roomActions';
import { setReceivingUser } from '../store/actions/roomActions';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles((theme) => ({
    customBadge: {
        backgroundColor:"#B0FC38",
        border: `3px solid white`,
      },

      verticalBox: {
       
        display: 'flex',
        flexDirection: 'column',
        
        justifyContent:'flex-start'
      },
    OnLine: {
        margin: theme.spacing(0, 4),
        padding: theme.spacing(2, 0),
        display: 'flex',
        flexDirection: 'row',
    
      },
      hover: {
        "&:hover": {
          backgroundColor: 'rgb(7, 177, 77, 0.42)'
        }
    },
      username: {
        margin: theme.spacing(0, 1),
      }
  }));


function OnlineFriends(props) {
    var {onlineFrnds} = props;
    var {actualUser} = props;
    var {lastRoom} = props;
    var {connection} = props;
    
    useEffect(() => {
        connection.on("getCurrentRoom", (room, user, userSender) => {
            props.onSetRoom(room);
            props.onSetReceivingUser(user);
            props.onSetSenderUser(userSender)

            connection.invoke("JoinRoom",props.lastRoom,room).catch(error => console.log(error));
            connection.invoke("GetRoomMessages", room.idRoom).catch(error => console.log(error));
        })

        connection.on("getLastRoom", (lastRoom) => {
            props.onSetLasRoom(lastRoom);
        })

        
        
    },[]);
    const chatClick = (actualUser,chatUser) => {
    connection.invoke("CreateRoom", actualUser, chatUser).catch((error) => console.log(error));
    } 


    const classes = useStyles();

    const chatsOnline = onlineFrnds ? (
        onlineFrnds.map( f => (
            <Paper elevation={0} className={classes.hover} key={f.id}>
                <Box className={classes.OnLine}  onClick={() => chatClick(actualUser, f)}>
                    <Badge classes={{badge: classes.customBadge}} overlap="circle" badgeContent=" " anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}>
                            <Avatar alt="Remy Sharp" src={`https://ui-avatars.com/api/?name=${f.username}&background=0D8ABC&color=fff`}  />
                    </Badge>
                    
                        <Box className={classes.verticalBox}>
                            <Typography variant="caption"  color="primary" className={classes.username}>
                                <Box fontWeight="fontWeightBold">
                                    {f.username}
                                </Box>
                            </Typography>
                        
                        <Typography variant="caption"  color="primary" className={classes.username} >
                            <Box fontStyle="oblique">
                                Chating with {f.username} 
                            </Box>
                        </Typography>
                        
                    </Box>
                    
                </Box>
            </Paper>
        ))
    ): (
        
        <Box className={classes.OnLine}>
            
            <Typography variant="caption"  color="primary" className={classes.username} >
                    <Box fontStyle="oblique">
                        No Online Friends 
                    </Box>
            </Typography>
        
        </Box>
        
    )
    return (
        <React.Fragment>
            {chatsOnline}
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        lastRoom: state.requestRoom.lastRoom,
        connection: state.requestRoom.connection
      };
};

const mapDispatchToProps = (dispatch) => {
    return {
      onSetRoom: (room) => dispatch(setRoom(room)),
      onSetReceivingUser: (user) => dispatch(setReceivingUser(user)),
      onSetSenderUser: (user) => dispatch(setSenderUser(user)),
      onSetLasRoom: (room) => dispatch(setLastRoom(room))
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(OnlineFriends);