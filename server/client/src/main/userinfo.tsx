import React from 'react';
import {DivHeader, DivContent, DivFooter, DivText, Content, Div, DivInfo} from '../components/index';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

interface IUser {
    name: string,
    email: string,
    number: number,
    gender: string,
    password: string,
}

class UserInfo extends React.Component<{history: any}, {imagePreviewUrl: any, file: any}> {
    getUser: any;
    user: IUser;

    constructor(props: any) {
        super(props);

        this.getUser = localStorage.getItem('user');
        this.user = JSON.parse(this.getUser);
        this.state = {
            file: '',
            imagePreviewUrl: ''
        };
    }

    _handleImageChange = (e: any) => {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        }
    
        reader.readAsDataURL(file)
      }

    logout = () => {
        this.props.history.push('/');
        localStorage.clear();
    }

    redaction = () => {
        this.props.history.push('/redactionInfo');
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
                            <h4>Here you can check your information</h4>
                        </DivText>

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
                            <label htmlFor="outlined-button-file" className='upload'>
                                <Button variant="outlined" component="span">
                                    Upload
                                </Button>
                            </label>

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

                            <Button id='redaction' variant="contained" color="secondary" onClick={this.redaction}>
                                Redaction
                            </Button>
                        </Div>
                    </DivContent>

                    <DivFooter></DivFooter>
                </Content>
            </React.Fragment>
        );
    }
}

export default UserInfo;