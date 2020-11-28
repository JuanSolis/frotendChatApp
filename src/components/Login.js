import React, {useState }from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Hidden from "@material-ui/core/Hidden";
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Favorite from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import { useHistory } from "react-router-dom";

/*https://getreceet.com/images/backgroundsShape1.svg 
https://unitedideas.co/app/themes/unitedideas/dist/images/hero-blob-simple-01_c0331c11.svg
*/
const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    wrapIcon: {
      verticalAlign: 'middle',
      display: 'inline-flex'
     }
    ,
    image: {
      backgroundImage: 'url(https://rxlive.co.uk/wp-content/themes/rxlive/img/hiw-hero.svg)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    Video: {
        width:'100%',
        height:'100%',
        objectFit:'cover',
      
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

export default function Login(){
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(false);

    const [haveAccount, setHaveAccount] = useState(false);
   
    const { register, handleSubmit, control} = useForm();

    const onSubmit = (data, event) => {
        
        event.preventDefault();
        const userData = {
            UserName: username,
            Password: password
        };
        
        if(!haveAccount){
            axios.post(`https://localhost:44364/api/users/add`, userData)
            .then(response => {   
                userRegistered(response.data)
            })
            .catch(error => onError());
        }else {
            axios.post(`https://localhost:44364/api/users/verifyAccount`, userData)
            .then(response => {
                userRegistered(response.data)
            })
            .catch(onError());
        }
        

        
    };

    const userRegistered = (entryUser) => {
        setError(false);
        if(entryUser.id !== ""){
            history.push({
                pathname: '/lobby',
                state: {
                    data: {user: entryUser}
                }
            });
        }
    }

    const onError = () => {
        setError(true);
    }

    
        const classes = useStyles();
        return (
            <Grid container component="main" className={classes.root}>
              <CssBaseline />
              <Hidden xsDown>
                <Grid item  sm={4} md={7}>
                    <video autoPlay="autoplay" loop="loop" muted className={classes.Video} >
                    <source src="https://storage.coverr.co/videos/2rXLWeuBl102g4szgw3X01ECKZt023Dze02D?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6Ijg3NjdFMzIzRjlGQzEzN0E4QTAyIiwiaWF0IjoxNjA2MjA4NDY3fQ.kIcSdu0ybXR0WmUcBFq-1Qltkk3Eib3cPPyLZWMFw6c" type="video/mp4" />
                    
                    </video>
                </Grid>
                </Hidden>
          
              <Grid item xs={12} sm={8} md={5} component={Paper} elevation={10}>
                
                  {haveAccount ? (
                      <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign In
                        </Typography>
                        <form className={classes.form} validate="true" onSubmit={ handleSubmit(onSubmit)}>
                            <Controller
                                name="username"
                                control= {control}
                                defaultValue=""
                                as = {
                                    <TextField
                                        value={username}
                                        onInput={ e=>setUsername(e.target.value)}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        autoComplete="username"
                                        autoFocus
                                        ref={register}
                                    />
                                }
                            />
                            <Controller
                            name="password"
                            control = {control}
                            defaultValue=""
                            as = {
                                <TextField
                                    value={password}
                                    onInput={ e=>setPassword(e.target.value)}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    id="password"
                                    ref={register}
                                    autoComplete="current-password"
                                />
                            }
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                            <Grid align="right">
                                <Grid item>
                                <Link href="#" variant="body2" onClick={() => setHaveAccount(!haveAccount)}>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                                </Grid>
                            </Grid>
                            <Box mt={5} align="center">
                                <Typography variant="body2" color="textSecondary"   className={classes.wrapIcon}>
                                    {'with ' } <Favorite color="secondary" /> {' from GT!'}
                                </Typography> 
                            </Box>
                        </form>
                    </div>
                  ): (
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign Up
                        </Typography>
                        <form className={classes.form} validate="true"  onSubmit={ handleSubmit(onSubmit)}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                onInput={ e=>setUsername(e.target.value)}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onInput={ e=>setPassword(e.target.value)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign Up
                            </Button>
                            <Grid align="right">
                                <Grid item>
                                <Link href="#" variant="body2" onClick={() => setHaveAccount(!haveAccount)}>
                                    {"have an account? Sign In"}
                                </Link>
                                </Grid>
                            </Grid>
                            <Box mt={5} align="center">
                                <Typography variant="body2" color="textSecondary"   className={classes.wrapIcon}>
                                    {'with ' } <Favorite color="secondary" /> {' from GT!'}
                                </Typography> 
                            </Box>
                        </form>
                    </div>

                  )}
            
                {
                    error ? (
                        <Alert severity="error">Username or password are incorrect. Please try again.</Alert>
                        
                    ) : (
                        <div></div>
                    )
                }
              </Grid>
            </Grid>
          );
    }
