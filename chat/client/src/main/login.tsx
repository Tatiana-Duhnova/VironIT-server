import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Div, DivHeader, DivContent, DivFooter, DivText, DivRegistration, Content} from '../components/index';
import axios from 'axios';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    dense: {
    marginTop: theme.spacing(2),
    },
    menu: {
    width: 200,
    },
    button: {
    margin: theme.spacing(1),
    },
    input: {
    display: 'none',
    },
    root: {
    transform: 'translateZ(0)',
    height: 300,
    flexGrow: 1,
    },
    modal: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
    },
    paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    },
    progress: {
    margin: theme.spacing(2),
    },
    list: {
    width: 250,
    },
    fullList: {
    width: 'auto',
    },
}));

function Autorization(props: any) {
    const [email, setEmail] = React.useState('');
    const [pass, setPass] = React.useState('');
    const [errMail, setErrMail] = React.useState(false);
    const [errPass, setErrPass] = React.useState(false);
    const [modal, setModal] = React.useState(false);
  
    const classes = useStyles();
    const rootRef = React.useRef(null);
  
    function inquiry(e: any) {
      e.preventDefault();
  
      setModal(true);
      
      axios.post('http://localhost:4000/login', {email: email, password: pass})
        .then(res => {
          console.log(res);
  
          if (res.data === 'Wrong password') {
            setErrPass(true);
            setErrMail(false);
            setModal(false);
          } else if (res.data === 'User not defined') {
            setErrMail(true);
            setModal(false);
          } else {
            setErrMail(false);
            setErrPass(false);
            setModal(false);
            localStorage.setItem('user', JSON.stringify(res.data));
            props.history.push('/userInfo');
          }
      })
    }
  
    return (
      <React.Fragment>
        <Content>
          <DivHeader>
            <DivRegistration>
              <Button className={classes.button} id='btnReg' onClick={() => props.history.push('/registration')}>
                Registration
              </Button>
            </DivRegistration>
          </DivHeader>
  
          <DivContent id='div_content'>
            <DivText>
              <h1>Welcome!</h1>
            </DivText>
  
            <Div>
              <form className={classes.container} noValidate autoComplete="off">
                <span className='red'>{errMail ? 'User not defined' : ''}</span>
  
                <TextField
                  id="outlined-email-input"
                  label="Email"
                  error={errMail}
                  className={classes.textField}
                  type="email"
                  name="email"
                  autoComplete="email"
                  margin="normal"
                  variant="outlined"
                  onChange={(e) => setEmail(e.currentTarget.value)}
                />
  
                <TextField
                  id="outlined-password-input"
                  label="Password"
                  error={errPass}
                  className={classes.textField}
                  type="password"
                  autoComplete="current-password"
                  margin="normal"
                  variant="outlined"
                  onChange={(e) => setPass(e.currentTarget.value)}
                />
  
                <span className='red'>{errPass ? 'Wrong password' : ''}</span>
  
                <Button variant="outlined" className={classes.button} id='btn' onClick={inquiry}>
                  Submit
                </Button>
              </form>
  
              <Modal
                disablePortal
                disableEnforceFocus
                disableAutoFocus
                open={modal}
                aria-labelledby="server-modal-title"
                aria-describedby="server-modal-description"
                className={classes.modal}
                container={() => rootRef.current}
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 200,
                }}
              >
  
                <div>
                  <CircularProgress className={classes.progress} color="secondary" />
                </div>
              </Modal>
            </Div>
          </DivContent>
        </Content>
        
        <DivFooter></DivFooter>
      </React.Fragment>
    );
  }
  
export default Autorization;