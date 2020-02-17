import React from 'react';
import {DivHeader, DivContent, DivFooter, DivText, Content, Div, DivInfo, DivUsers, UserInfo} from '../components/index';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
// import axios from 'axios';

interface IUser {
    name: string,
    email: string,
    number: number,
    gender: string,
    password: string,
    _id: string,
    img?: string,
}

const useStyles = ((theme: Theme) => makeStyles({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));

class AllUsers extends React.Component<{history: any}, {imagePreviewUrl: any, file: any}> {
    getUser: any;
    user: IUser;
    classes: any;

    constructor(props: any) {
        super(props);

        this.getUser = localStorage.getItem('user');
        this.user = JSON.parse(this.getUser);
        this.classes = useStyles;
        this.state = {
            file: '',
            imagePreviewUrl: `http://localhost:4000/images/?name=${this.user.img}`,
        };
    }

    _handleImageChange = (e: any) => {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result,
          });
        }
    
        reader.readAsDataURL(file)
    }

    logout = () => {
        this.props.history.push('/');
        localStorage.clear();
    }

    deleteUser = () => {

    }

    render() {
        return (
            <React.Fragment>
                <Content>
                    <DivHeader>
                        <Button variant="contained" color="secondary" id='btnExit' onClick={this.logout}>
                            Exit
                        </Button>
                    </DivHeader>

                    <DivContent>
                        <DivText>
                            <h1 id='margin'>Welcome!</h1>
                            <h4>Here you can view all users</h4>
                        </DivText>

                        <DivUsers>
                            <UserInfo>
                                <Div>
                                    <Avatar 
                                        alt='' 
                                        src={this.state.imagePreviewUrl}
                                        className='avatar' 
                                    />

                                    <input
                                        accept="image/*"
                                        id="outlined-button-file"
                                        multiple
                                        type="file"
                                        onChange={this._handleImageChange}
                                    />

                                    <IconButton 
                                        aria-label="delete" 
                                        className={this.classes.margin} 
                                        onClick={this.deleteUser}
                                        id='MuiIconButton-root'
                                    >
                                        <DeleteIcon fontSize="inherit" />
                                    </IconButton>

                                    <DivInfo>
                                        <div>
                                            <p className='info'>Name:</p>
                                            <p className='info'>Email:</p>
                                            <p className='info'>Phone:</p>
                                            <p className='info'>Gender:</p>
                                        </div>

                                        <div>
                                            <p className='infoUser'>{this.user.name}</p>
                                            <p className='infoUser'>{this.user.email}</p>
                                            <p className='infoUser'>{this.user.number}</p>
                                            <p className='infoUser' id='last'>{this.user.gender}</p>
                                        </div>
                                    </DivInfo>
                                </Div>
                            </UserInfo>
                        </DivUsers>
                    </DivContent>

                    <DivFooter></DivFooter>
                </Content>
            </React.Fragment>
        );
    }
}

export default AllUsers;