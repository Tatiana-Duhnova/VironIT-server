import React from 'react';
import {DivHeader, DivContent, DivFooter, DivText, Content, DivUsers} from '../components/index';
// import { makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import Avatar from '@material-ui/core/Avatar';
// import IconButton from '@material-ui/core/IconButton';
// import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import UsersInfo from './showuser';

interface IUser {
    name: string,
    email: string,
    number: number,
    gender: string,
    password: string,
    _id: string,
    img?: string,
}

// const useStyles = ((theme: Theme) => makeStyles({
//     margin: {
//       margin: theme.spacing(1),
//     },
//     extendedIcon: {
//       marginRight: theme.spacing(1),
//     },
//   }));

function AllUsers(props: any) {
    // const getUser: any = localStorage.getItem('user');
    // const user: IUser = JSON.parse(getUser);
    // const classes: any = useStyles;
    // const [file] = React.useState({
    //     file: '',
    //     imagePreviewUrl: `http://localhost:4000/images/?name=${person.img}`,
    // });
    const [allUsers, setAllUsers] = React.useState([]);

    React.useEffect (() => {
        (async () => {
            const getUsers: any = await axios.get('http://localhost:4000/users');
            setAllUsers(getUsers);
        })();
    }, []);

    const showUsers = allUsers.map((person, index) => {
        return (
          <User key={index} person={person} />
        );
    });

    const logout = () => {
        props.history.push('/');
        localStorage.clear();
    };

    return (
        <React.Fragment>
            <Content>
                <DivHeader>
                    <Button variant="contained" color="secondary" id='btnExit' onClick={logout}>
                        Exit
                    </Button>
                </DivHeader>

                <DivContent>
                    <DivText>
                        <h1 id='margin'>Welcome!</h1>
                        <h4>Here you can view all users</h4>
                    </DivText>

                    <DivUsers>
                        {showUsers}
                    </DivUsers>
                </DivContent>

                <DivFooter></DivFooter>
            </Content>
        </React.Fragment>
    );
}

export default AllUsers;
