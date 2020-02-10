import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import SaveIcon from '@material-ui/icons/Save';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {DivReg, DivHeader, DivContent, DivFooter, DivText, Content, DivRegistration} from '../components/index';
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
    formControl: {
      margin: theme.spacing(1),
    },
  }));

function Registration(props: any) {
    const classes: any = useStyles();
    const [name, setName] = React.useState('');
    const [email, setMail] = React.useState('');
    const [number,setNumber] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [mailEx, setMailEx] = React.useState(false);
    const [fillForm, setFillForm] = React.useState(false);
    const [userReg, setUserReg] = React.useState(false);

    const [password, setPassword] = React.useState({
      password: '',
      showPassword: false,
    });

    const showGender = (event: any) => {
      setGender(event.target.value);
    };

    const handleChange = (prop: any) => (event: any) => {
      setPassword({ ...password, [prop]: event.target.value });
    };

    const handleMouseDownPassword = (event: any) => {
      event.preventDefault();
    };

    const handleClickShowPassword = () => {
      setPassword({ ...password, showPassword: !password.showPassword });
    };

    const registr = () => {
      if (name && email && number && password.password && gender) {
        axios.post('http://localhost:4000/registration', 
        { name: name,
          email: email,
          number: number,
          password: password.password,
          gender: gender
        })
        .then(res => {
          console.log(res);

          if (res.data === 'Error') {
            setMailEx(true);
          } 

          setUserReg(true);

          setName('');
          setMail('');
          setPassword({...password, password: ''});
          setNumber('');
          setGender('');

          localStorage.setItem('user', JSON.stringify(res.data));
          props.history.push('/userInfo');
        })
      } else {
        setFillForm(true);
      }
    }

    return (
      <React.Fragment>
        <Content>
          <DivHeader>
            <DivRegistration>
              <Button className={classes.button} id='btnReg' onClick={() => props.history.push('/')}>
                Log in
              </Button>
            </DivRegistration>
          </DivHeader>

          <DivContent>
            <DivText>
              <h2>Fill the form</h2>
            </DivText>

            <DivReg>
              <span className='red'>{mailEx ? 'Email already exists' : ''}</span>
              <span className='red'>{fillForm ? 'Please, fill the form!' : ''}</span>
              <span className='green'>{userReg ? 'User registered successfully' : ''}</span>

              <TextField
                id="outlined-name"
                label="Name"
                placeholder="Enter name"
                className={classes.textField}
                value={name}
                margin="normal"
                variant="outlined"
                onChange={(e) => setName(e.currentTarget.value)}
              />

              <TextField
                id="outlined-email-input"
                label="Email"
                placeholder="Enter email"
                className={classes.textField}
                value={email}
                type="email"
                name="email"
                autoComplete="email"
                margin="normal"
                variant="outlined"
                onChange={(e) => setMail(e.currentTarget.value)}
              />

              <TextField
                id="outlined-with-placeholder"
                label="Number"
                placeholder="Enter number"
                className={classes.textField}
                value={number}
                margin="normal"
                variant="outlined"
                onChange={(e) => setNumber(e.currentTarget.value)}
              />

              <TextField
                id="outlined-adornment-password"
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
                type={password.showPassword ? 'text' : 'password'}
                label="Password"
                placeholder="Enter password"
                value={password.password}
                margin="normal"
                onChange={handleChange('password')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {password.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup aria-label="gender" name="gender1" value={gender} onChange={showGender}>
                  <FormControlLabel
                    value="female"
                    control={<Radio color="secondary" />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio color="secondary" />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>

              <Button 
                id="save" 
                variant="contained" 
                color="secondary" 
                size="large" 
                // margin="normal" 
                className={classes.button} 
                startIcon={<SaveIcon />} 
                onClick={registr}>
                Save
              </Button>
            </DivReg>
          </DivContent>
        </Content>

        <DivFooter></DivFooter>
      </React.Fragment>
    );
}

export default Registration;