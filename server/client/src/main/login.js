import React from 'react';
// import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from 'constants';
// import axios from 'axios';
// import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Div, DivHeader, DivContent, DivFooter, DivText, DivRegistration, Content} from '../components/index';

const axios = require('axios');

const useStyles = makeStyles(theme => ({
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

function Autorization(props) {
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [value1, setValue1] = React.useState(false);
  const [value2, setValue2] = React.useState(false);
  const [value3, setValue3] = React.useState(false);

  const classes = useStyles();
  const rootRef = React.useRef(null);

  function inquiry(e) {
    e.preventDefault();

    setValue3(true);
    
    axios.post('http://localhost:4000/login', {email: email, password: pass})
      .then(res => {
        console.log(res);

        if (res.data === 'Wrong password') {
          setValue2(true);
          setValue1(false);
          setValue3(false);
        } else if (res.data === 'User not defined') {
          setValue1(true);
          setValue3(false);
        } else {
          setValue1(false);
          setValue2(false);
          setValue3(false);
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
              <span className='red'>{value1 ? 'User not defined' : ''}</span>

              <TextField
                id="outlined-email-input"
                label="Email"
                error={value1}
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
                error={value2}
                className={classes.textField}
                type="password"
                autoComplete="current-password"
                margin="normal"
                variant="outlined"
                onChange={(e) => setPass(e.currentTarget.value)}
              />

              <span className='red'>{value2 ? 'Wrong password' : ''}</span>

              <Button variant="outlined" className={classes.button} id='btn' onClick={inquiry}>
                Submit
              </Button>
            </form>

            <Modal
              disablePortal
              disableEnforceFocus
              disableAutoFocus
              open={value3}
              aria-labelledby="server-modal-title"
              aria-describedby="server-modal-description"
              className={classes.modal}
              container={() => rootRef.current}
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
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