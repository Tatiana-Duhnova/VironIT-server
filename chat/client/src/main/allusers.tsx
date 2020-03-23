import React from 'react';
import {DivHeader, DivContent, DivFooter, DivText, Content, DivUsers} from '../components/index';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import User from './user';

interface IUser {
    name: string,
    email: string,
    number: number,
    gender: string,
    password: string,
    _id: string,
    img?: string,
}

function AllUsers(props: any) {
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
