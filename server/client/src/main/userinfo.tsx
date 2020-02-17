import React from 'react';
import {DivHeader, DivContent, DivFooter, DivText, Content, Div, DivInfo} from '../components/index';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';

interface IUser {
    name: string,
    email: string,
    number: number,
    gender: string,
    password: string,
    _id: string,
    img?: string,
}

class UserInfo extends React.Component<{history: any}, {imagePreviewUrl: any, file: any, isFileUpload: boolean}> {
    getUser: any;
    user: IUser;

    constructor(props: any) {
        super(props);

        this.getUser = localStorage.getItem('user');
        this.user = JSON.parse(this.getUser);
        this.state = {
            file: '',
            imagePreviewUrl: `http://localhost:4000/images/?name=${this.user.img || ''}`,
            isFileUpload: false,
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
            isFileUpload: true,
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

    saveImage = async () => {
        if (this.state.isFileUpload) {
            try {
                const { data } = await axios.post('http://localhost:4000/saveImage', { img: this.state.imagePreviewUrl, id: this.user._id });

                localStorage.setItem('user', JSON.stringify(data));
                this.setState({ isFileUpload: false });
            } catch(err) {
                console.log(err);
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                <Content>
                    <DivHeader>
                        <Button variant="contained" color="secondary" id='btnAllUsers' onClick={() => this.props.history.push('/allUsers')}>
                            Show all users
                        </Button>

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
                            <label htmlFor="outlined-button-file" id='upload'>
                                <Button variant="outlined" component="span" id='btnUpload' style={{display: `${this.state.isFileUpload ? 'none' : 'block'}`}}>
                                    Upload
                                </Button>
                            </label>

                            <Button
                                variant="outlined"
                                onClick={this.saveImage}
                                component="span"
                                style={{
                                    display: `${this.state.isFileUpload ? 'block' : 'none'}`
                                }}
                                id='saveImg'
                            >
                                Save
                            </Button>

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