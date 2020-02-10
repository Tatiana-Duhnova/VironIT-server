import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
    formControl: {
      margin: theme.spacing(1),
    },
  }));

function Redaction(props: any) {
    const getUser: any = localStorage.getItem('user');
    const user = JSON.parse(getUser);
    const {name, email, number, gender, password} = user;

    const classes: any = useStyles();
    const [userName, setName] = React.useState(name);
    const [userEmail, setMail] = React.useState(email);
    const [userNumber,setNumber] = React.useState(number);
    const [userGender, setGender] = React.useState(gender);
    
    const [userPassword, setPassword] = React.useState({
      password: password,
      showPassword: false,
    });

    const showGender = (event: any) => {
      setGender(event.target.value);
    };

    const handleChange = (prop: any) => (event: any) => {
      setPassword({ ...userPassword, [prop]: event.target.value });
    };

    const handleMouseDownPassword = (event: any) => {
      event.preventDefault();
    };

    const handleClickShowPassword = () => {
      setPassword({ ...userPassword, showPassword: !userPassword.showPassword });
    };

    const updateInfo = async () => {
      if (userName && userEmail && userNumber && userPassword.password && userGender) {
        const res = await axios.put('http://localhost:4000/redaction', 
        { name: userName,
          email: userEmail,
          number: userNumber,
          password: userPassword.password,
          gender: userGender,
          lastEmail: email,
        });
        
        console.log(res.data);
        localStorage.setItem('user', JSON.stringify(res.data));
        props.history.push('/userInfo');
      } 
    }

    return (
      <React.Fragment>
        <Content>
          <DivHeader>
            <DivRegistration>
              <Button variant="contained" color="secondary" id='btnExit' onClick={() => props.history.push('/')}>
                Exit
              </Button>
            </DivRegistration>
          </DivHeader>

          <DivContent>
            <DivText>
              <h2>Redaction your info</h2>
            </DivText>

            <DivReg>
              <TextField
                id="outlined-name"
                label="Name"
                placeholder="Enter name"
                className={classes.textField}
                value={userName}
                margin="normal"
                variant="outlined"
                onChange={(e) => setName(e.currentTarget.value)}
              />

              <TextField
                id="outlined-email-input"
                label="Email"
                placeholder="Enter email"
                className={classes.textField}
                value={userEmail}
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
                value={userNumber}
                margin="normal"
                variant="outlined"
                onChange={(e) => setNumber(e.currentTarget.value)}
              />

              <TextField
                id="outlined-adornment-password"
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
                type={userPassword.showPassword ? 'text' : 'password'}
                label="Password"
                placeholder="Enter password"
                value={userPassword.password}
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
                      {userPassword.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup aria-label="gender" name="gender1" value={userGender} onChange={showGender}>
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
                onClick={updateInfo}
              >
                Save
              </Button>
            </DivReg>
          </DivContent>
        </Content>

        <DivFooter></DivFooter>
      </React.Fragment>
    );
}

export default Redaction;