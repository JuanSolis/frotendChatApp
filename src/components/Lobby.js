import React, {useState, useEffect }from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Hidden from "@material-ui/core/Hidden";
import Box from '@material-ui/core/Box';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { flexbox } from '@material-ui/system';
import { HubConnectionBuilder} from '@aspnet/signalr' 
import { useLocation } from "react-router-dom";
import Chat from "./Chat";
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';


import OnlineFriends from './OnlineFriends';
import { setConnection } from '../store/actions/roomActions';

const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    customBadge: {
        backgroundColor:"#B0FC38",
        border: `3px solid white`,
      },
      large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
      },
    box: {
        margin: theme.spacing(2, 4),
        display: 'flex',
        flexDirection: 'row',
   
      },
      verticalBox: {
       
        display: 'flex',
        flexDirection: 'column',
        
        justifyContent:'flex-start'
      },

      chatWindow: {
       
        display: 'flex',
        flexDirection: 'column',
        
        justifyContent:'flex-start',
      },
    OnLine: {
        margin: theme.spacing(0, 4),
        padding: theme.spacing(2, 0),
        display: 'flex',
        flexDirection: 'row',
    
      },
      headerNav: {
        height: '10%',
        width: '100%',
        margin: theme.spacing(0,0,2,0),
      },
      username: {
        margin: theme.spacing(0, 1),
      },
      rootInput: {
        display: 'flex',
        alignItems: 'center',
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


function Lobby(props){
    const classes = useStyles();
    const location = useLocation();
    const [user, setUser] = useState({});
    var [usersOnline, setUsersOnline] = useState([]);
    const userEntry = location.state.data.user;

    const  [currentRoom, setCurrentRoom]  = useState({idRoom:''});
    const  [receivingUser, setReceivingUser]  = useState({id:'', username: '', password: ''});
   
    const connection = new HubConnectionBuilder().withUrl('https://localhost:44364/chathub')
    .build();

    useEffect(() => {
        setUser(location.state.data.user);
       
        connection.on("onlineFriends", (list) => {
            setUsersOnline(list);
        })
        
        connection.start().then(() => {
            console.log("Conection started!") 
            connection.invoke("insertConnectionToUser",userEntry).catch((error) => console.log(error));
        }).catch(e => console.log('Connection failed: ', e));

        props.onSetConnection(connection)
        
        

    }, [])


    return(
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Hidden xsDown>
                <Grid item  xs={false} sm={3} md={3} component={Paper} elevation={5}>
                
                    <Box className={classes.box}>
                        <Badge classes={{badge: classes.customBadge}} overlap="circle" badgeContent=" " anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}>
                            <Avatar alt="Remy Sharp" src={`https://ui-avatars.com/api/?name=${user.username}&background=0D8ABC&color=fff`} className={classes.large} />
                        </Badge>
                        <Box className={classes.verticalBox}>
                            <Typography variant="h5"  color="primary" className={classes.username}>
                                {user.username}
                            </Typography>
                            <Typography variant="caption"  color="primary" className={classes.username} >
                                    <Box fontStyle="oblique">
                                        Online 
                                    </Box>
                            </Typography>
                        </Box>
                    </Box>

                    <Paper elevation={2} styles={{width: '100%', heigh: '100%', marginBotton:'2px'}}>
                      <Paper component="form" className={classes.rootInput}>
                        <InputBase placeholder="search message" className={classes.input}/>
                          <Divider className={classes.divider} orientation="vertical"/>
                          <IconButton className={classes.iconButton}>
                            <SearchIcon/>
                          </IconButton>
                      </Paper>
                </Paper>
                    <Divider/>
                    <OnlineFriends actualUser={user} onlineFrnds={usersOnline} />
                    
                </Grid>
            </Hidden>
            <Grid container item xs={12} sm={9} md={9} className={classes.chatWindow}>
                {currentRoom ? (
                 <Chat/>
                ): <p>No messages</p>}

            </Grid>
            
        </Grid>
    );
}

const mapStateToProps = state => {
    return {
      currentRoom: state.requestRoom.currentRoom,
      receivingUser: state.requestRoom.receivingUser,
      connection: state.requestRoom.connection
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      onSetConnection: (connection) => dispatch(setConnection(connection))
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(Lobby);